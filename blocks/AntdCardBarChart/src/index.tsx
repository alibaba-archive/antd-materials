import React from 'react';
import { Card } from 'antd';
import { Chart, Geom } from 'bizcharts';
import mock from './mock.js';
import styles from './index.module.less';

interface ChartItem {
  date?: string;
  value?: number;
}

interface CardConfig {
  title?: string | React.ReactDOM;
  subTitle?: string | React.ReactDOM;
  value?: string;
  chartData?: ChartItem[];
  des?: string;
  rate?: number;
  chartHeight?: number;
}

const DEFAULT_DATA: CardConfig = {
  subTitle: '总销售额',
  value: mock.value,
  chartData: mock.saleList,
  des: '周同比:',
  rate: 10.1,
  chartHeight: 100,
};

export interface AntdCardBarChartProps {
  cardConfig?: CardConfig;
}

const AntdCardBarChart: React.FunctionComponent<AntdCardBarChartProps> = (
  props: AntdCardBarChartProps,
): JSX.Element => {
  const { cardConfig = DEFAULT_DATA } = props;

  const {
    title,
    subTitle,
    value,
    chartData,
    des,
    rate,
    chartHeight,
  } = cardConfig;

  return (
    <div>
      <Card title={title || ''} style={{ margin: '8px' }}>
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
              range: [0, 1],
            },
          }}
          forceFit
          padding={['auto', '16']}
        >
          <Geom type="interval" position="date*value" color="#29A5FF" />
        </Chart>
      </Card>
    </div>
  );
};

export default AntdCardBarChart;
