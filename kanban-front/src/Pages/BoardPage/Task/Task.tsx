import { Divider, Paper } from '@mui/material';
import React from 'react';
import { ITask } from '../../../Rtk/Api/types';

import styles from './task.module.scss';

function Task(props: { task: ITask }): JSX.Element {
  const { task } = props;

  return (
    <Paper className={styles.task}>
      <div className={styles.task__title}>{task.title}</div>
      <Divider></Divider>
      <div className={styles.task__description}>{task.description}</div>
    </Paper>
  );
}
export { Task };
