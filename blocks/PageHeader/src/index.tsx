import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default function PageHead({ value }) {
  return (
    <div className={styles.PageHead}>
      PageHead {value}
    </div>
  );
}

PageHead.propTypes = {
  value: PropTypes.string,
};

PageHead.defaultProps = {
  value: 'string data',
};
