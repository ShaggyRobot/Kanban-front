import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Divider, Paper } from '@mui/material';

import { animateStyles } from '../utils/animateStyles';
import { TaskHeader } from './Header/TaskHeader';
import { TaskControls } from './Controls/TaskControls';

import { ITask } from '@Rtk';

import styles from './task.module.scss';

function Task(props: {
  task: ITask;
  boardId: string;
  columnId: string;
  index: number;
}): JSX.Element {
  const { task, boardId, columnId, index } = props;

  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snap) => {
        return (
          <div
            className={styles.task__wrapper}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={animateStyles(snap, provided.draggableProps.style)}
          >
            <Paper className={styles.task} {...provided.dragHandleProps}>
              <TaskHeader
                text={task.title}
                taskId={task.id}
                columnId={columnId}
                boardId={boardId}
              />

              <Divider></Divider>

              <div className={styles.task__description}>{task.description}</div>
            </Paper>
            <TaskControls task={task} columnId={columnId} boardId={boardId} />
          </div>
        );
      }}
    </Draggable>
  );
}
export { Task };
