import React, { useState } from 'react';

import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { IBoardFaceDTO, useDeleteBoardMutation } from '../../../../Rtk';

import styles from './board-card-header.module.scss';
import { ModalComponent } from '../../../../Components/ModalComponent/ModalComponent';
import { EditBoard } from '../../../../Components/Forms/EditBoard/EditBoard';
import { Confirm } from '../../../../Components/Confirm/Confirm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function BoardCardHeader(props: { board: IBoardFaceDTO }): JSX.Element {
  const { title, id: boardId } = props.board;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [deleteBoard] = useDeleteBoardMutation();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirm(true);
  };

  const deleteHandler = () => {
    deleteBoard(boardId);
    setConfirm(false);
  };

  const editBoardHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div className={styles.header}>
      <div
        className={styles.header__title}
        onClick={() => {
          navigate(`/boards/${boardId}`);
        }}
      >
        {title}
      </div>
      <div className={styles.header__controls}>
        <div className={styles.edit}>
          <EditIcon color="success" onClick={(e) => editBoardHandler(e)} />
        </div>

        <div className={styles.delete}>
          <DeleteForever color="error" onClick={(e) => openDeleteConfirm(e)} />
        </div>
      </div>

      <ModalComponent open={open} setOpen={setOpen}>
        <EditBoard board={props.board} closeModal={() => setOpen(false)} />
      </ModalComponent>

      <ModalComponent open={confirm} setOpen={setConfirm}>
        <Confirm
          message={`${t('boards.deleteBoard')}?`}
          action={deleteHandler}
          cancelAction={() => setConfirm(false)}
        />
      </ModalComponent>
    </div>
  );
}
export { BoardCardHeader };
