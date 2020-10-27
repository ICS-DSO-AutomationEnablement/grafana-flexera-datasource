import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  FieldType,
  MutableDataFrame,
} from '@grafana/data';
import { flatten } from 'lodash';
import { getBackendSrv } from '@grafana/runtime';

import { BillingCenter, Dimension, FlexeraDataSourceJsonData, FlexeraQuery } from './types';

interface DimensionValueMap {
  dimension: string;
  summedValue: number;
  values: [
    {
      timestamp: string;
      metric: number;
    }
  ];
}

export class FlexeraDataSource extends DataSourceApi<FlexeraQuery, FlexeraDataSourceJsonData> {
  organization: string;
  user_id: string;
  url: string;
  baseBillAnalysisUrl: string;
  baseAnalyticsUrl: string;

  constructor(instanceSettings: DataSourceInstanceSettings<FlexeraDataSourceJsonData>) {
    super(instanceSettings);

    this.organization = instanceSettings.jsonData.organization;
    this.user_id = instanceSettings.jsonData.user_id;
    this.url = instanceSettings.url!;
    this.baseBillAnalysisUrl = `/bill-analysis/orgs/${this.organization}/costs`;
    this.baseAnalyticsUrl = `/analytics/users/${this.user_id}/orgs/${this.organization}`;
  }

  async query(options: DataQueryRequest<FlexeraQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map(query => {
      let startTimestamp: string = this.getStartTimestamp(options, query.granularity);
      let endTimestamp: string = this.getEndTimestamp(options, query.granularity);
      this.validateQueryRequest(query, startTimestamp, endTimestamp);

      let requestBody: string = this.generateRequestPayload(options, query, startTimestamp, endTimestamp);

      const httpOptions: any = {
        method: 'POST',
        url: this.url + this.baseBillAnalysisUrl + '/aggregated',
        data: requestBody,
      };

      let finiteFilter: number = this.getFiniteNumber(query.valueFilter);
      let groupsToShow: number = this.getFiniteNumber(query.groupsToShow);
      if (groupsToShow <= 0) {
        //if no value was entered we'll just default it to a sufficiently big
        //enough number to show all groups
        groupsToShow = 1000;
      }

      return this.doFlexeraRequest(httpOptions).then(response => {
        let dimensionValues: DimensionValueMap[] = this.parseRequestResponse(
          response,
          finiteFilter,
          query.dimensionGroupBy
        );

        return this.aggregateResponseData(dimensionValues, groupsToShow, query.refId);
      });
    });

    return Promise.all(promises).then(promiseReturn => ({ data: flatten(promiseReturn) }));
  }

  async doFlexeraRequest(options: { method?: string; url: any; data?: any }) {
    return getBackendSrv().datasourceRequest(options);
  }

  generateRequestPayload(
    options: DataQueryRequest<FlexeraQuery>,
    query: FlexeraQuery,
    startTimestamp: string,
    endTimestamp: string
  ): string {
    let requestBody =
      '{"granularity":"' +
      query.granularity +
      '","start_at":"' +
      this.getStartTimestamp(options, query.granularity) +
      '","end_at":"' +
      this.getEndTimestamp(options, query.granularity) +
      '","dimensions":["' +
      query.dimensionGroupBy +
      '"],"billing_center_ids":["' +
      (query.billingCenterIDs !== undefined ? query.billingCenterIDs.join('","') : '') +
      '"],"metrics":["cost_amortized_unblended_adj"],"filter":';
    if (query.dimensionFilter !== undefined) {
      requestBody +=
        '{"dimension": "' +
        query.dimensionFilter +
        '", "type": "' +
        query.dimensionFilterOperator +
        '", "' +
        (query.dimensionFilterOperator === 'substring' ? 'substring' : 'value') +
        '": "' +
        query.dimensionFilterValue +
        '"}';
    } else {
      requestBody += 'null';
    }
    requestBody += '}';
    return requestBody;
  }

  parseRequestResponse(response: any, finiteFilter: number, dimensionGroup: string): DimensionValueMap[] {
    let dimensionValues: DimensionValueMap[] = [];
    response.data.rows.forEach((point: any) => {
      if (point.metrics.cost_amortized_unblended_adj >= finiteFilter) {
        var groupByValue = point.dimensions[dimensionGroup];
        if (groupByValue === '') {
          groupByValue = 'No Value';
        }
        let dimensionValue = dimensionValues.find(obj => {
          if (obj.dimension === groupByValue) {
            obj.summedValue += point.metrics.cost_amortized_unblended_adj;
            obj.values.push({ timestamp: point.timestamp, metric: point.metrics.cost_amortized_unblended_adj });
            return obj;
          }
          return undefined;
        });
        if (dimensionValue === undefined) {
          dimensionValues.push({
            dimension: groupByValue,
            summedValue: point.metrics.cost_amortized_unblended_adj,
            values: [{ timestamp: point.timestamp, metric: point.metrics.cost_amortized_unblended_adj }],
          });
        }
      }
    });
    return dimensionValues;
  }

  //This function will sort the results by the total summed value. For example, if a query is performed to find the
  //monthly cost by category for the last 6, we find the summed total for each category for all 6 months and perform
  //a descending sort for all categories. This will allow us to show the top X costs (based on the user-requested number
  //of groups to show), and then aggregate everything else into an "Other" category result
  aggregateResponseData(
    dimensionValues: DimensionValueMap[],
    groupsToShow: number,
    queryRefId: any
  ): MutableDataFrame[] {
    let frames: MutableDataFrame[] = [];
    dimensionValues = dimensionValues.sort((a, b) => b.summedValue - a.summedValue);

    var count = 0;
    var lastFrameValues = new Map<string, number>();
    for (let dimensionValue of dimensionValues) {
      if (++count < groupsToShow) {
        let frame = new MutableDataFrame({
          refId: queryRefId,
          name: dimensionValue.dimension,
          fields: [
            { name: 'Time', type: FieldType.time },
            { name: 'Value', type: FieldType.number },
          ],
        });
        for (let timeValue of dimensionValue.values) {
          frame.appendRow([new Date(timeValue.timestamp), timeValue.metric]);
        }
        frames.push(frame);
      } else {
        //once we reach our limit of groups to show just push everything else into the "other" bucket
        for (let timeValue of dimensionValue.values) {
          let currentValue = 0;
          if (lastFrameValues.has(timeValue.timestamp)) {
            currentValue = lastFrameValues.get(timeValue.timestamp)!;
          }
          currentValue += timeValue.metric;
          lastFrameValues.set(timeValue.timestamp, currentValue);
        }
      }
    }
    //if we had "other" data, we can create the frame and add it now that we have all the data
    if (lastFrameValues.size > 0) {
      let lastFrame = new MutableDataFrame({
        refId: queryRefId,
        name: 'Other',
        fields: [
          { name: 'Time', type: FieldType.time },
          { name: 'Value', type: FieldType.number },
        ],
      });
      lastFrameValues.forEach((value, key) => {
        lastFrame.appendRow([new Date(key), value]);
      });
      if (lastFrame.fields[0].values.length > 0) {
        frames.push(lastFrame);
      }
    }
    return frames;
  }

  async testDatasource() {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const result = await this.getDimensions();
        if (result && result.length > 0) {
          resolve({ message: `Successfully connected to Flexera API.`, status: 'success' });
        } else {
          reject({ message: `Failed to connect.`, status: 'error' });
        }
      } catch (error) {
        reject({ message: `Failed to Connect.`, status: 'error' });
      }
    });
  }

  async getDimensions(): Promise<Dimension[]> {
    const httpOptions: any = {
      method: 'GET',
      url: this.url + this.baseBillAnalysisUrl + '/dimensions',
    };
    const result = this.doFlexeraRequest(httpOptions).then(response => {
      let dimensions: Dimension[] = [{ id: '', name: '', type: '' }];

      response.data.dimensions.forEach((dimension: any) => {
        let dimensionObj = {
          id: dimension.id,
          name: dimension.name,
          type: dimension.type,
        } as Dimension;
        dimensions.push(dimensionObj);
      });
      dimensions.sort((a, b) => (a.name > b.name ? 1 : -1));
      return dimensions;
    });

    return result.then(dimensions => {
      return dimensions;
    });
  }

  async getBillingCenters(): Promise<BillingCenter[]> {
    const httpOptions: any = {
      method: 'GET',
      url: this.url + this.baseAnalyticsUrl + '/billing_centers',
    };
    const result = this.doFlexeraRequest(httpOptions).then(response => {
      let billingCenters: BillingCenter[] = [];

      response.data.forEach((billingCenter: any) => {
        let billingCenterObj = {
          id: billingCenter.id,
          name: billingCenter.name,
          kind: billingCenter.kind,
        } as BillingCenter;
        billingCenters.push(billingCenterObj);
      });
      billingCenters.sort((a, b) => (a.name > b.name ? 1 : -1));
      return billingCenters;
    });

    return result.then(billingCenters => {
      return billingCenters;
    });
  }

  getStartTimestamp(options: DataQueryRequest<FlexeraQuery>, granularity: string): string {
    var start = options.range.from.toDate();
    return this.getTimestampString(start, granularity);
  }

  getEndTimestamp(options: DataQueryRequest<FlexeraQuery>, granularity: string): string {
    var end = options.range.to.toDate();
    return this.getTimestampString(end, granularity);
  }

  //want to return the timestamp in a yyyy-mm format for "month" granularity. needs to be
  //yyyy-mm-dd for "day" granularity
  getTimestampString(date: Date, granularity: string): string {
    var ret = date.getFullYear() + '-';
    var month = date.getMonth() + 1;
    if (month < 10) {
      ret += '0';
    }
    ret += month.toString();
    if (granularity === 'day') {
      ret += '-';
      var day = date.getDate();
      if (day < 10) {
        ret += '0';
      }
      ret += day.toString();
    }
    return ret;
  }

  validateQueryRequest(query: FlexeraQuery, startTimestamp: string, endTimestamp: string) {
    if (query.dimensionGroupBy === undefined) {
      throw new Error('Group By Dimension must be selected.');
    }

    if (query.billingCenterIDs === undefined || query.billingCenterIDs.length === 0) {
      throw new Error('At least one Billing Center must be selected.');
    }

    if (query.granularity === undefined) {
      throw new Error('Granularity must be selected.');
    }

    if (startTimestamp === endTimestamp) {
      throw new Error(
        'Time range needs to be adjusted. For a granularity of ' +
          (query.granularity === 'month' ? 'Monthly ' : 'Daily ') +
          'the range must span at least one ' +
          query.granularity +
          '.'
      );
    }

    if (
      query.dimensionFilter !== undefined &&
      (query.dimensionFilterOperator === undefined || query.dimensionFilterValue === undefined)
    ) {
      throw new Error('If a Dimension Filter value is selected, an operator and value must also be selected.');
    } else if (
      query.dimensionFilterOperator !== undefined &&
      (query.dimensionFilter === undefined || query.dimensionFilterValue === undefined)
    ) {
      throw new Error('If a Dimension Filter operator value is selected, a dimension and value must also be selected.');
    } else if (
      query.dimensionFilterValue !== undefined &&
      (query.dimensionFilter === undefined || query.dimensionFilterOperator === undefined)
    ) {
      throw new Error('If a Dimension Filter value is selected, a dimension and operator must also be selected.');
    }

    if (query.valueFilter !== undefined && this.getFiniteNumber(query.valueFilter) === -1) {
      throw new Error('The Minimum Cost value must be a positive integer value.');
    }

    if (query.groupsToShow !== undefined && this.getFiniteNumber(query.groupsToShow) === -1) {
      throw new Error('The Number of Groups to Show value must be a positive integer value.');
    }
  }

  getFiniteNumber(value: string): number {
    let retValue = -1;
    var retValTemp = Number(value);
    if (isFinite(retValTemp) && retValTemp >= 0) {
      retValue = retValTemp;
    }
    return retValue;
  }
}
