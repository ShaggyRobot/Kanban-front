import React from 'react';
import { IBoardFaceDTO } from '../../../RTK/API/types';
import { Button, Link, Paper } from '@mui/material';
import { useDeleteBoardMutation } from '../../../RTK/API/boardsApi';

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
      onClick={(e) => {
        navigate(`/boards/${board.id}`);
      }}
    >
      <div className={styles.card__title}>{board.title}</div>
      <div className={styles.card__description}>{board.description}</div>
      <Link component="button" onClick={(e) => deleteBoardHandler(e)}>
        delete
      </Link>
    </Paper>
  );
}
export { BoardCard };
