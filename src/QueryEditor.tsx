import React, { PureComponent, ChangeEvent } from 'react';
import { InlineFormLabel, InlineFieldRow, Input, MultiSelect, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';

import { FlexeraDataSource } from './DataSource';
import { BillingCenter, Dimension, FlexeraDataSourceJsonData, FlexeraQuery } from './types';

type Props = QueryEditorProps<FlexeraDataSource, FlexeraQuery, FlexeraDataSourceJsonData>;

interface State {
  availableDimensions: Dimension[];
  availableBillingCenters: BillingCenter[];

  currentDimensionGroup: string;
  currentDimensionFilter: string;
  currentDimensionOperator: string;
  currentDimensionValue: string;
  currentBillingCenters: Array<SelectableValue<string>>;
  currentGranularity: string;
  currentFilter: string;
  currentGroupsToShow: string;
}

export class QueryEditor extends PureComponent<Props> {
  state: State = {
    availableDimensions: [],
    availableBillingCenters: [],

    currentDimensionGroup: this.props.query.dimensionGroupBy,
    currentDimensionFilter: this.props.query.dimensionFilter,
    currentDimensionOperator: this.props.query.dimensionFilterOperator,
    currentDimensionValue: this.props.query.dimensionFilterValue,
    currentGranularity: this.props.query.granularity,
    currentBillingCenters: [],
    currentFilter: this.props.query.valueFilter,
    currentGroupsToShow: this.props.query.groupsToShow,
  };

  async componentDidMount() {
    const { datasource } = this.props;

    const dimensionList = await datasource.getDimensions();
    const billingCenterList = await datasource.getBillingCenters();

    let billingCenters: Array<SelectableValue<string>> = [];
    if (this.props.query.billingCenterIDs !== undefined) {
      this.props.query.billingCenterIDs.forEach(billingCenter => {
        let newBillingCenter: SelectableValue<string> = {
          value: billingCenter,
        };
        billingCenters.push(newBillingCenter);
      });
    }

    this.setState({
      availableDimensions: dimensionList,
      availableBillingCenters: billingCenterList,
      currentBillingCenters: billingCenters,
    });
  }

  onDimensionGroupByChange = (item: SelectableValue<string>) => {
    this.state.currentDimensionGroup = item.value!;
    this.props.onChange({
      ...this.props.query,
      dimensionGroupBy: item.value!,
    });
  };

  onDimensionFilterChange = (item: SelectableValue<string>) => {
    this.state.currentDimensionFilter = item.value!;
    this.props.onChange({
      ...this.props.query,
      dimensionFilter: item.value!,
    });
  };

  onDimensionFilterOperatorChange = (item: SelectableValue<string>) => {
    this.state.currentDimensionOperator = item.value!;
    this.props.onChange({
      ...this.props.query,
      dimensionFilterOperator: item.value!,
    });
  };

  onDimensionFilterValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.state.currentDimensionValue = event.target.value;
    this.props.onChange({
      ...this.props.query,
      dimensionFilterValue: event.target.value,
    });
  };

  onGranularityChange = (item: SelectableValue<string>) => {
    this.state.currentGranularity = item.value!;
    this.props.onChange({
      ...this.props.query,
      granularity: item.value!,
    });
  };

  onBillingCenterChange = (selectedBillingCenters: Array<SelectableValue<string>>) => {
    this.state.currentBillingCenters = selectedBillingCenters;

    this.props.onChange({
      ...this.props.query,
      billingCenterIDs: selectedBillingCenters?.map(billingCenter => billingCenter.value!) ?? [],
    });
  };

  onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.state.currentFilter = event.target.value;
    this.props.onChange({
      ...this.props.query,
      valueFilter: event.target.value,
    });
  };

  onGroupsToShowChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.state.currentGroupsToShow = event.target.value;
    this.props.onChange({
      ...this.props.query,
      groupsToShow: event.target.value,
    });
  };

  render() {
    const dimensionOptions = this.state.availableDimensions.map(item => ({ label: item.name, value: item.id }));
    const billingCenterOptions = this.state.availableBillingCenters.map(item => ({ label: item.name, value: item.id }));
    const granularityOptions = [
      { label: '', value: '' },
      { label: 'Daily', value: 'day' },
      { label: 'Monthly', value: 'month' },
    ];
    const dimensionFilterOptions = [
      { label: '', value: '' },
      { label: 'Equal To', value: 'equal' },
      { label: 'Not Equal To', value: 'not' },
      { label: 'Contains', value: 'substring' },
    ];
    const {
      currentBillingCenters,
      currentDimensionGroup,
      currentDimensionFilter,
      currentDimensionOperator,
      currentDimensionValue,
      currentGranularity,
      currentFilter,
      currentGroupsToShow,
    } = this.state;

    return (
      <div>
        <InlineFieldRow>
          <InlineFormLabel className="width-12">Group By Dimension</InlineFormLabel>
          <Select
            className="width-15"
            placeholder="Choose Dimension"
            isSearchable={true}
            options={dimensionOptions}
            value={currentDimensionGroup}
            onChange={this.onDimensionGroupByChange}
          />
        </InlineFieldRow>

        <InlineFieldRow>
          <InlineFormLabel className="width-12">Billing Centers</InlineFormLabel>
          <MultiSelect
            className="width-15"
            placeholder="Choose Billing Centers"
            options={billingCenterOptions}
            value={currentBillingCenters}
            onChange={v => {
              this.onBillingCenterChange(v);
            }}
          />
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineFormLabel className="width-12">Granularity</InlineFormLabel>
          <Select
            className="width-15"
            placeholder="Choose Granularity"
            isSearchable={true}
            options={granularityOptions}
            value={currentGranularity}
            onChange={this.onGranularityChange}
          />
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineFormLabel className="width-12">Dimension Filter</InlineFormLabel>
          <Select
            className="width-15"
            placeholder="Choose Dimension"
            isSearchable={true}
            options={dimensionOptions}
            value={currentDimensionFilter}
            onChange={this.onDimensionFilterChange}
          />
          <Select
            className="width-15"
            placeholder="Choose Operator"
            isSearchable={true}
            options={dimensionFilterOptions}
            value={currentDimensionOperator}
            onChange={this.onDimensionFilterOperatorChange}
          />
          <Input
            className="width-15"
            placeholder="Dimension Value"
            onChange={this.onDimensionFilterValueChange}
            css="css"
            value={currentDimensionValue}
          />
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineFormLabel className="width-12">Minimum Cost</InlineFormLabel>
          <Input
            className="width-15"
            placeholder="Minimum Cost to Display"
            onChange={this.onFilterChange}
            css="css"
            value={currentFilter}
          />
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineFormLabel className="width-12">Number of Groups to Show</InlineFormLabel>
          <Input
            className="width-15"
            placeholder="10"
            onChange={this.onGroupsToShowChange}
            css="css"
            value={currentGroupsToShow}
          />
        </InlineFieldRow>
      </div>
    );
  }
}
