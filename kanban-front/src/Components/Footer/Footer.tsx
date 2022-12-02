import React from 'react';
import { LangControl } from '../LangControl/LangControl';

import styles from './footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      Footer <LangControl />
    </div>
  );
}

export { Footer };
