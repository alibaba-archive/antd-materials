import React from 'react';
import { Card } from 'antd';

import styles from './index.module.less';

interface CardConfig {
  value?: string;
  name?: string;
  des?: string;
  rate?: number | string;
  isRise?: boolean;
}

export interface WebInfoProps {
  cardConfig?: CardConfig;
}

const WebInfoBlock: React.FunctionComponent<WebInfoProps> = (
  props: WebInfoProps
): JSX.Element => {
  const { cardConfig = {} }: WebInfoProps = props;
  const { value, name, des, rate, isRise } = cardConfig;

  return (
    <Card className={styles.box}>
      <div>
        <div className={styles.content}>
          <div className={styles.value}>{value}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.des}>
            {des}
            {isRise ? (
              <span className={styles.rise}>{rate}↑</span>
            ) : (
              <span className={styles.fall}>{rate}↓</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WebInfoBlock;
