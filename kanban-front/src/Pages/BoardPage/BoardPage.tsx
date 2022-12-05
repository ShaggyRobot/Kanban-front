import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { CreateColumn } from '../../Components/Forms/CreateColumn/CreateColumn';
import {
  useGetBoardQuery,
  useUpdateColumnMutation,
  useUpdateTaskMutation,
} from '../../Rtk/Api/boardsApi';
import { Column } from './Column/Column';

import styles from './board.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { IColumn, ITaskUpdate } from '../../Rtk/Api/types';
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent';

function BoardPage(): JSX.Element {
  const { id: boardId } = useParams();
  const userId = localStorage.getItem('userId');
  const { data, isLoading } = useGetBoardQuery(boardId!);
  const [updateTask] = useUpdateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [columns, setColumns] = useState<Array<IColumn>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    data && setColumns(data.columns);
  }, [data]);

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    if (
      res.destination.droppableId === res.source.droppableId &&
      res.destination.index === res.source.index
    )
      return;

    if (res.type === 'task') {
      const startColumn = columns.find((column) => column.id === res.source.droppableId);
      const endColumn = columns.find((column) => column.id === res.destination!.droppableId);
      const draggedTask = startColumn?.tasks.find((task) => task.id === res.draggableId);

      // * Same column ----------------------------------------------------------------------------
      if (startColumn?.id === endColumn?.id) {
        const newTasks = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order); // !!!
        const [dt] = newTasks.splice(res.source.index, 1);
        newTasks.splice(res.destination.index, 0, dt);

        const newColumn = {
          ...startColumn,
          tasks: newTasks.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newColumns = Array.from(columns);
        newColumns.splice(
          columns.findIndex((column) => column.id === startColumn!.id),
          1,
          newColumn as IColumn
        );

        setColumns(newColumns);
      } else {
        // * Different columns -------------------------------------------------
        const newTasksStart = Array.from(startColumn!.tasks).sort((a, b) => a.order - b.order);
        const newTasksEnd = Array.from(endColumn!.tasks).sort((a, b) => a.order - b.order);

        const [dragged] = newTasksStart.splice(res.source.index, 1);
        newTasksEnd.splice(res.destination.index, 0, dragged);

        const newStartColumn = {
          ...startColumn,
          tasks: newTasksStart.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newEndColumn = {
          ...endColumn,
          tasks: newTasksEnd.map((task, idx) => ({ ...task, order: idx + 1 })),
        };

        const newColumns = Array.from(columns);
        newColumns.splice(
          columns.findIndex((column) => column.id === startColumn!.id),
          1,
          newStartColumn as IColumn
        );

        newColumns.splice(
          columns.findIndex((column) => column.id === endColumn!.id),
          1,
          newEndColumn as IColumn
        );

        setColumns(newColumns);
      }

      const taskId = res.draggableId;
      const body: ITaskUpdate = {
        title: draggedTask!.title,
        order: res.destination.index + 1,
        description: draggedTask!.description,
        columnId: res.destination.droppableId,
        boardId: boardId!,
        userId: userId!,
      };
      updateTask({ boardId: boardId!, columnId: startColumn!.id, taskId, body });
    } else {
      // * Dragging columns ----------------------------------------------------
      const newColumns = Array.from(columns).sort((a, b) => a.order - b.order);

      const [draggedColumn] = newColumns.splice(res.source.index, 1);
      newColumns.splice(res.destination.index, 0, draggedColumn);

      setColumns([...newColumns].map((column, idx) => ({ ...column, order: idx + 1 })));

      updateColumn({
        boardId: boardId!,
        columnId: draggedColumn.id,
        body: { title: draggedColumn.title, order: res.destination.index + 1 },
      });
    }
  };

  return (
    <div className={`${styles.board}`}>
      {isLoading ? (
        <h1 className="float" style={{ margin: 'auto' }}>
          Loading...
        </h1>
      ) : (
        <>
          <div className={styles.board__title}>{data?.title}</div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div
                  className={styles.board__columns_list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns &&
                    [...columns]
                      .sort((a, b) => a.order - b.order)
                      .map((column, idx) => (
                        <Column key={column.id} column={column} index={idx} boardId={boardId!} />
                      ))}

                  {provided.placeholder}

                  <div className={styles.create}>
                    <Fab onClick={() => setOpen(true)}>
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <ModalComponent open={open} setOpen={setOpen}>
            <CreateColumn boardId={boardId!} modalClose={() => setOpen(false)} />
          </ModalComponent>
        </>
      )}
    </div>
  );
}
export { BoardPage };
