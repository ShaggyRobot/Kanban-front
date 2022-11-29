import React, { useState } from 'react';
import { Fab, Paper, Modal } from '@mui/material';

import {
  Draggable,
  DraggableProvided,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';

import DeleteForever from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import { useDeleteColumnMutation } from '../../../Rtk';

import { Task } from '../Task/Task';
import { CreateTask } from '../../../Components/Forms';

import { IColumn, ITask } from '../../../Rtk/Api/types';

import styles from './column.module.scss';
import { ModalComponent } from '../../../Components/ModalComponent/ModalComponent';

function Column(props: {
  boardId: string;
  column: IColumn;
  dragProvided: DraggableProvided;
}): JSX.Element {
  const { boardId, column, dragProvided } = props;
  const [open, setOpen] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();

  const handleDelete = async () => {
    await deleteColumn({ boardId, columnId: column.id });
  };

  function DraggableTask(task: ITask, index: number) {
    return (
      <Draggable draggableId={task.id} key={task.id} index={index}>
        {(provided) => (
          <div
            className={styles.task}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task task={task} />
          </div>
        )}
      </Draggable>
    );
  }

  return (
    <Paper className={styles.column} elevation={3}>
      <div className={styles.column__header} {...dragProvided.dragHandleProps}>
        <div className={styles.column__title}>{column.title}</div>
      </div>

      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.column__tasklist}
          >
            {[...column.tasks]
              .sort((a, b) => a.order - b.order)
              .map((task, index) => DraggableTask(task, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className={styles.create}>
        <Fab color="primary" size="medium" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </div>

      <div className={styles.column__delete}>
        <DeleteForever color="error" onClick={() => handleDelete()} />
      </div>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        Elem={
          <CreateTask boardId={boardId} columnId={column.id} modalClose={() => setOpen(false)} />
        }
      />
    </Paper>
  );
}

export { Column };
