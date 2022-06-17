import React from 'react';
import { Chart as BarChart, Interval, Tooltip } from 'bizcharts';
import { merge } from '@formily/shared';
import { observer, RecursionField, Schema, useFieldSchema } from '@formily/react';
const useProps = (props: any, options?) => {
  const { useProps, ...props1 } = props;
  let props2 = useProps?.() || {};
  return merge(props1 || {}, props2, options);
};

export const Chart = observer((props) => {
	const { dataSource = [], fieldNames = {} } = useProps(props);
	const data = dataSource.map(item=>({
		xAxis: item[fieldNames.xAxis],
		yAxis: item[fieldNames.yAxis]
	}))
	return <BarChart height={300} autoFit data={data} >
			<Interval position="xAxis*yAxis" />
			<Tooltip shared />
		</BarChart>
})
