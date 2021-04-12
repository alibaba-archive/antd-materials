import React from 'react';
import { Row, Col } from 'antd';
import FusionCardAreaChart from './components/CardAreaChart';
import FusionCardPieChart from './components/CardPieChart';

import WebInfoBlock from './components/WebInfoBlock';
import VisitBlock from './components/VisitBlock';
import TrendChart from './components/TrendChart';
import mock from './mock.js';

const MonitorBlock = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={6}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <WebInfoBlock cardConfig={mock.JSErrorRate} />
          <WebInfoBlock cardConfig={mock.APISuccessRate} />
        </div>
      </Col>
      <Col span={12}>
        <VisitBlock />
      </Col>
      <Col span={6}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <WebInfoBlock cardConfig={mock.FirstRenderTime} />
          <WebInfoBlock cardConfig={mock.ResourceError} />
        </div>
      </Col>
      <Col span={24}>
        <TrendChart />
      </Col>

      <Col span={16}>
        <FusionCardPieChart />
      </Col>

      <Col span={8}>
        <FusionCardAreaChart />
      </Col>
    </Row>
  );
};

export default MonitorBlock;
