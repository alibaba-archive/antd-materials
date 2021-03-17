import * as React from 'react';
import { Link } from 'ice';
import styles from './index.module.less';
import { SmileOutlined } from '@ant-design/icons';

const SolutionLink = () => (
  <div className={styles.link}>
    <Link to="/solution" title="官方推荐方案">
      <SmileOutlined style={{ fontSize: '20px', color: '#fff' }} />
    </Link>
  </div>
);

export default SolutionLink;
