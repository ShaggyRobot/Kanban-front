import React from 'react';
import { ITask } from '../../../Rtk/Api/types';

import styles from './task.module.scss';

function Task(props: { task: ITask }): JSX.Element {
  const { task } = props;

  return (
    <div className={styles.task}>
      <div className={styles.task__title}>{task.title}</div>
      <div className={styles.task__description}>{task.description}</div>
      {/* <div className={styles.task__description}>{task.order}</div> */}
    </div>
  );
}
export { Task };
