import { DataSourcePlugin } from '@grafana/data';
import { FlexeraDataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { FlexeraQuery, FlexeraDataSourceJsonData } from './types';

export const plugin = new DataSourcePlugin<FlexeraDataSource, FlexeraQuery, FlexeraDataSourceJsonData>(
  FlexeraDataSource
)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
