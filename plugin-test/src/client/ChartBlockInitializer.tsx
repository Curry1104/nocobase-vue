
import { BarChartOutlined } from '@ant-design/icons';
import { FormDialog, FormLayout } from '@formily/antd';
import { ISchema, SchemaOptionsContext } from '@formily/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { uid } from '@formily/shared';
import { useCollection, useCollectionManager } from '@nocobase/client';
import { SchemaComponent, SchemaComponentOptions } from '@nocobase/client';
import { DataBlockInitializer } from '../../../core/client/src/schema-initializer/items'

const createChartBlockSchema = (options) => {
  const { collection, resource, fieldNames, ...others } = options;
  const schema: ISchema = {
    type: 'void',
    'x-acl-action': `${resource || collection}:list`,
    'x-decorator': 'ChartBlockProvider',
    'x-decorator-props': {
      collection: collection,
      resource: resource || collection,
      action: 'list',
      fieldNames: {
        id: 'id',
        ...fieldNames,
      },
      params: {
        paginate: false,
      },
      ...others,
    },
    'x-designer': 'ChartDesigner',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'Chart',
        'x-component-props': {
          useProps: '{{ useChartBlockProps }}',
        },
        properties: {},
      },
    },
  };
  console.log(JSON.stringify(schema, null, 2));
  return schema;
};

export const ChartBlockInitializer = (props) => {
  const { insert } = props;
  const { t } = useTranslation();
  const { getCollection } = useCollectionManager();
  const options = useContext(SchemaOptionsContext);
  return (
    <DataBlockInitializer
      {...props}
      componentType={'Chart'}
      icon={<BarChartOutlined />}
      onCreateBlockSchema={async ({ item }) => {
        const collection = getCollection(item.name);
        const stringFields = collection?.fields
          // ?.filter((field) => field.type === 'string')
          ?.map((field) => {
            return {
              label: field?.uiSchema?.title,
              value: field.name,
            };
          });
        const dateFields = collection?.fields
          ?.filter((field) => field.type === 'date')
          ?.map((field) => {
            return {
              label: field?.uiSchema?.title,
              value: field.name,
            };
          });
        const values = await FormDialog(t('Create chart block'), () => {
          return (
            <SchemaComponentOptions scope={options.scope} components={{ ...options.components }}>
              <FormLayout layout={'vertical'}>
                <SchemaComponent
                  schema={{
                    properties: {
                      yAxis: {
                        title: t('纵坐标'),
                        enum: stringFields,
                        required: true,
                        'x-component': 'Select',
                        'x-decorator': 'FormItem',
                      },
                      xAxis: {
                        title: t('横坐标'),
                        enum: stringFields,
                        required: true,
                        // default: 'createdAt',
                        'x-component': 'Select',
                        'x-decorator': 'FormItem',
                      }
                    },
                  }}
                />
              </FormLayout>
            </SchemaComponentOptions>
          );
        }).open({
          initialValues: {},
        });
        insert(
          createChartBlockSchema({
            collection: item.name,
            fieldNames: {
              ...values,
            },
          }),
        );
      }}
    />
  );
};