import { ISchema, useField, useFieldSchema, Schema, SchemaExpressionScopeContext, SchemaOptionsContext } from '@formily/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralSchemaDesigner, SchemaSettings, useCollection, useCompile, useDesignable } from '@nocobase/client';
import { useChartBlockContext } from './ChartBlockProvider'

const useOptions = () => {
  const compile = useCompile();
  const { fields } = useCollection();
  const options = fields?.map((field) => {
    return {
      value: field.name,
      label: compile(field?.uiSchema?.title),
    };
  });
  return options;
}

export const ChartDesigner = () => {
  const field = useField();
  const { t } = useTranslation();
  const fieldSchema = useFieldSchema();
  const options = useOptions();
  const { service } = useChartBlockContext();
  const { dn } = useDesignable();
  const fieldNames = fieldSchema?.['x-decorator-props']?.['fieldNames'] || {};
  return (
    <GeneralSchemaDesigner>
      <SchemaSettings.SelectItem
        title={t('纵坐标参数')}
        value={fieldNames.title}
        options={options}
        onChange={(title) => {
          const fieldNames = field.decoratorProps.fieldNames || {};
          fieldNames['yAxis'] = title;
          field.decoratorProps.params = fieldNames;
          fieldSchema['x-decorator-props']['params'] = fieldNames;
          service.refresh();
          dn.emit('patch', {
            schema: {
              ['x-uid']: fieldSchema['x-uid'],
              'x-decorator-props': field.decoratorProps,
            },
          });
          dn.refresh();
        }}
      />
      <SchemaSettings.Divider />
      <SchemaSettings.Remove
        removeParentsIfNoChildren
        breakRemoveOn={{
          'x-component': 'Grid',
        }}
      />
    </GeneralSchemaDesigner>
  );
};