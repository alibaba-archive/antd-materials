import React from 'react';
import { Chart, Geom } from 'bizcharts';
import { Card } from 'antd';
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
  des?: string;
  rate?: string;
  chartHeight?: number;
}

const DEFAULT_DATA: AntdCardAreaChartProps = {
  title: '',
  subTitle: '访问量',
  value: mock.value,
  chartData: mock.saleList,
  des: '周同比:',
  rate: '12.0',
  chartHeight: 100
};

const AntdCardAreaChart: React.FunctionComponent<AntdCardAreaChartProps> = (
  props = DEFAULT_DATA
): JSX.Element => {
  const { title, subTitle, value, chartData, des, rate, chartHeight } = {
    ...DEFAULT_DATA,
    ...props
  };

  return (
    <Card
      className={styles.areaChart}
      title={title || ''}
      style={{ margin: '8px' }}
    >
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.des}>
        {des}
        <span>{rate}↑</span>
      </div>
      <Chart
        width={10}
        height={chartHeight || 0}
        data={chartData}
        scale={{
          date: {
            range: [0, 1]
          }
        }}
        forceFit
        padding={['auto', '0']}
      >
        <Geom
          type="line"
          position="date*value"
          color="#00D6CB"
          shape="smooth"
          opacity={1}
        />
        <Geom
          type="area"
          position="date*value"
          color="#00D6CB"
          shape="smooth"
          opacity={0.1}
        />
      </Chart>
    </Card>
  );
};

export default AntdCardAreaChart;
