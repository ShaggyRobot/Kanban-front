import React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserDashboard } from './UserDashboard';

import styles from './user-control.module.scss';

function UserControl(): JSX.Element {
  return (
    <div className={styles.control}>
      <AccountCircleIcon />
      <UserDashboard />
    </div>
  );
}
export { UserControl };
