import React, { PureComponent } from 'react';
import { InlineFormLabel, LegacyForms } from '@grafana/ui';
import {
  DataSourcePluginOptionsEditorProps,
  onUpdateDatasourceJsonDataOption,
  onUpdateDatasourceSecureJsonDataOption,
} from '@grafana/data';
import { FlexeraDataSourceJsonData, FlexeraDataSourceSecureJsonData } from './types';

const { Input } = LegacyForms;

export interface FlexeraSecureJsonData {
  api_endpoint?: string;
  account?: string;
  refresh_token?: string;
}

export type Props = DataSourcePluginOptionsEditorProps<FlexeraDataSourceJsonData, FlexeraDataSourceSecureJsonData>;

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  render() {
    const { options } = this.props;

    return (
      <>
        <h3 className="page-heading">Flexera API Details</h3>

        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Account ID</InlineFormLabel>
              <div className="width-15">
                <Input
                  className="width-30"
                  placeholder="#####"
                  value={options.jsonData.account || ''}
                  onChange={onUpdateDatasourceJsonDataOption(this.props, 'account')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Organization ID</InlineFormLabel>
              <div className="width-15">
                <Input
                  className="width-30"
                  placeholder="#####"
                  value={options.jsonData.organization || ''}
                  onChange={onUpdateDatasourceJsonDataOption(this.props, 'organization')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">User ID</InlineFormLabel>
              <div className="width-15">
                <Input
                  className="width-30"
                  placeholder="#####"
                  value={options.jsonData.user_id || ''}
                  onChange={onUpdateDatasourceJsonDataOption(this.props, 'user_id')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">API Endpoint</InlineFormLabel>
              <div className="width-15">
                <Input
                  className="width-30"
                  placeholder="us-#.rightscale.com"
                  value={options.jsonData.api_endpoint || ''}
                  onChange={onUpdateDatasourceJsonDataOption(this.props, 'api_endpoint')}
                />
              </div>
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <InlineFormLabel className="width-12">Refresh Token</InlineFormLabel>
              <div className="width-15">
                <Input
                  className="width-30"
                  placeholder=""
                  value={options.secureJsonData?.refresh_token || ''}
                  onChange={onUpdateDatasourceSecureJsonDataOption(this.props, 'refresh_token')}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
