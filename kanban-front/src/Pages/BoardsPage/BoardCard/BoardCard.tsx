import React from 'react';
import { IBoardFaceDTO } from '../../../Rtk/Api/types';
import { Paper } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useDeleteBoardMutation } from '../../../Rtk/Api/boardsApi';

import styles from './board-card.module.scss';
import { useNavigate } from 'react-router-dom';

function BoardCard(props: { board: IBoardFaceDTO }): JSX.Element {
  const { board } = props;
  const [deleteBoard] = useDeleteBoardMutation();
  const navigate = useNavigate();

  const deleteBoardHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBoard(board.id);
  };

  return (
    <Paper
      className={styles.card}
      elevation={3}
      onClick={() => {
        navigate(`/boards/${board.id}`);
      }}
    >
      <div className={styles.card__title}>{board.title}</div>
      <div className={styles.card__description}>{board.description}</div>
      <div className={styles.card__delete}>
        <DeleteForever color="error" onClick={(e) => deleteBoardHandler(e)} />
      </div>
    </Paper>
  );
}
export { BoardCard };
