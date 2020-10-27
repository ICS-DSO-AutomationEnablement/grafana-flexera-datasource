import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FlexeraQuery extends DataQuery {
  dimensionGroupBy: string;
  dimensionFilter: string;
  dimensionFilterOperator: string;
  dimensionFilterValue: string;
  valueFilter: string;
  granularity: string;
  billingCenterIDs: string[];
  groupsToShow: string;
}

export interface FlexeraDataSourceJsonData extends DataSourceJsonData {
  account: string;
  user_id: string;
  organization: string;
  api_endpoint: string;
}

export interface FlexeraDataSourceSecureJsonData {
  refresh_token?: string;
}

export interface Dimension {
  id: string;
  name: string;
  type: string;
}

export interface BillingCenter {
  id: string;
  name: string;
  kind: string;
}
