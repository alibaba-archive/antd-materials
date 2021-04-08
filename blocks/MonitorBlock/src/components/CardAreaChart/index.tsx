import React from 'react';
import { Card } from 'antd';
import { Chart, Geom } from 'bizcharts';
import mock from './mock.js';

import styles from './index.module.less';

interface ChartItem {
  date?: string | number;
  value?: number;
}

interface AntdCardAreaChartProps {
  title?: string | React.ReactDOM;
  subTitle?: string | React.ReactDOM;
  value?: string;
  chartData?: ChartItem[];
  cardFoot?: string | React.ReactDOM;
  chartHeight?: number;
}

const DEFAULT_DATA: AntdCardAreaChartProps = {
  title: '渲染时间',
  subTitle: '首次渲染时间',
  value: mock.value,
  chartData: mock.saleList,
  cardFoot: `日访问用户数  ${mock.dailySale}`,
  chartHeight: 300,
};

const FusionCardAreaChart: React.FunctionComponent<AntdCardAreaChartProps> = (
  props = DEFAULT_DATA,
): JSX.Element => {
  const { title, subTitle, value, chartData, chartHeight } = {
    ...DEFAULT_DATA,
    ...props,
  };

  return (
    <Card
      className={styles.areaChart}
      title={title ? <span className={styles.title}>{title}</span> : null}
    >
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.value}>{value}</div>
      <div>周同比: 10.1%↑</div>
      <Chart
        data={chartData}
        height={chartHeight || 0}
        scale={{
          date: {
            range: [0, 1],
          },
        }}
        width={10}
        forceFit
        padding={['auto', '0']}
      >
        <Geom
          type="area"
          position="date*value"
          color="#2B7FFB"
          shape="smooth"
          opacity={1}
        />
      </Chart>
    </Card>
  );
};

export default FusionCardAreaChart;
