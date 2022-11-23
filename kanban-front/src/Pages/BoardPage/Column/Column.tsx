import React, { useEffect, useState } from 'react';
import { Fab, Paper, Modal } from '@mui/material';

import {
  DragDropContext,
  Draggable,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import DeleteForever from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import { useDeleteColumnMutation, useUpdateTaskMutation } from '../../../Rtk';

import { Task } from '../Task/Task';
import { CreateTask } from '../../../Components/Forms';

import { IColumn, ITask } from '../../../Rtk/Api/types';

import styles from './column.module.scss';

function Column(props: { boardId: string; column: IColumn }): JSX.Element {
  const { boardId, column } = props;
  const userId = localStorage.getItem('userId');
  const [open, setOpen] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [taskList, setTaskList] = useState<Array<ITask>>([]);

  useEffect(() => {
    setTaskList([...column.tasks].sort((a, b) => a.order - b.order));
    // setTaskList(column.tasks);
  }, [column]);

  const handleDelete = async () => {
    await deleteColumn({ boardId, columnId: column.id });
  };

  // const reorder = (list: ITask[], startIndex: number, endIndex: number) => {
  //   const result = Array.from(list);

  //   const [removed] = result.splice(startIndex, 1);

  //   result.splice(endIndex, 0, removed);

  //   return {
  //     results: result.map((task, idx) => ({ ...task, order: idx + 1 })),
  //     dropped: { ...removed, order: endIndex + 1 },
  //   };
  // };

  // const onDragEnd = (res: DropResult) => {
  //   console.log(res);
  //   if (!res.destination) {
  //     return;
  //   }

  // if (res.destination.index === res.source.index) {
  //   return;
  // }

  //   const reorderRes = reorder(taskList, res.source.index, res.destination.index);

  //   const newList = reorderRes.results;

  //   setTaskList([...newList]);

  //   const { title, description, order, id: taskId } = reorderRes.dropped;
  //   const { id: columnId } = column;
  //   const body = { title, order, description, columnId, boardId, userId: userId! };

  //   updateTask({ boardId, columnId, taskId, body });
  // };

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
      {/* <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}> */}
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '32px' }}>
            {taskList.map((task, index) => DraggableTask(task, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* </DragDropContext> */}
      <div className={styles.create}>
        <Fab color="primary" size="medium" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </div>

      <div className={styles.column__delete}>
        <DeleteForever color="error" onClick={(e) => handleDelete()} />
      </div>

      <Modal className="modal" open={open} onClose={() => setOpen(false)}>
        <CreateTask boardId={boardId} columnId={column.id} modalClose={() => setOpen(false)} />
      </Modal>
    </Paper>
  );
}
export { Column };
