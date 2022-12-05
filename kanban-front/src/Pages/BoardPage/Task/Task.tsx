import { Divider, Paper } from '@mui/material';
import React, { useState } from 'react';

import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { ITask } from '../../../Rtk/Api/types';

import styles from './task.module.scss';
import { TaskHeader } from './Header/TaskHeader';
import { Draggable } from 'react-beautiful-dnd';
import { animateStyles } from '../utils/animateStyles';
import { TaskControls } from './Controls/TaskControls';

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
