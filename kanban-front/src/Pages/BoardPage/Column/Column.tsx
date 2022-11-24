import React, { useState } from 'react';
import { Fab, Paper, Modal } from '@mui/material';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import DeleteForever from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import { useDeleteColumnMutation } from '../../../Rtk';

import { Task } from '../Task/Task';
import { CreateTask } from '../../../Components/Forms';

import { IColumn, ITask } from '../../../Rtk/Api/types';

import styles from './column.module.scss';

function Column(props: { boardId: string; column: IColumn }): JSX.Element {
  const { boardId, column } = props;
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
      <div className={styles.column__title}>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '32px' }}>
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

      <Modal className="modal" open={open} onClose={() => setOpen(false)}>
        <CreateTask boardId={boardId} columnId={column.id} modalClose={() => setOpen(false)} />
      </Modal>
    </Paper>
  );
}
export { Column };
