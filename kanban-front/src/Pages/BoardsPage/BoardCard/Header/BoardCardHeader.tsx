import React, { useState } from 'react';

import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { IBoardFaceDTO, useDeleteBoardMutation } from '../../../../Rtk';

import styles from './board-card-header.module.scss';
import { ModalComponent } from '../../../../Components/ModalComponent/ModalComponent';
import { EditBoard } from '../../../../Components/Forms/EditBoard/EditBoard';

function BoardCardHeader(props: { board: IBoardFaceDTO }): JSX.Element {
  const { title, id: boardId } = props.board;

  const [deleteBoard] = useDeleteBoardMutation();
  const [open, setOpen] = useState(false);

  const deleteBoardHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBoard(boardId);
  };

  const editBoardHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const testElem = () => (
    <div style={{ width: '400px', height: '400px', backgroundColor: 'pink' }}>Fuckya!</div>
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__title}>{title}</div>
      <div className={styles.header__controls}>
        <div className={styles.edit}>
          <EditIcon color="success" onClick={(e) => editBoardHandler(e)} />
        </div>
        <div className={styles.delete}>
          <DeleteForever color="error" onClick={(e) => deleteBoardHandler(e)} />
        </div>
      </div>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        Elem={<EditBoard board={props.board} closeModal={() => setOpen(false)} />}
      />
    </div>
  );
}
export { BoardCardHeader };
