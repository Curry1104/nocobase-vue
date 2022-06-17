import { ArrayField } from '@formily/core';
import { useField } from '@formily/react';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect } from 'react';
import { BlockProvider, useBlockRequestContext } from '@nocobase/client';

export const ChartBlockContext = createContext<any>({});

const InternalChartBlockProvider = (props) => {
  const { fieldNames } = props;
  const field = useField();
  const { resource, service } = useBlockRequestContext();
  if (service.loading) {
    return <Spin />;
  }
  return (
    <ChartBlockContext.Provider
      value={{
        field,
        service,
        resource,
        fieldNames,
      }}
    >
      {props.children}
    </ChartBlockContext.Provider>
  );
};

export const ChartBlockProvider = (props) => {
  return (
    <BlockProvider {...props} params={{ ...props.params, paginate: false }}>
      <InternalChartBlockProvider {...props} />
    </BlockProvider>
  );
};

export const useChartBlockContext = () => {
  return useContext(ChartBlockContext);
};

export const useChartBlockProps = () => {
  const ctx = useChartBlockContext();
  const field = useField<ArrayField>();
  useEffect(() => {
    if (!ctx?.service?.loading) {
      field.componentProps.dataSource = ctx?.service?.data?.data;
    }
  }, [ctx?.service?.loading]);
  return {
    fieldNames: ctx.fieldNames,
  };
};
