import React from 'react';
import { IBoardFaceDTO } from '../../../Rtk';
import { Divider, Paper } from '@mui/material';

import styles from './board-card.module.scss';
import { useNavigate } from 'react-router-dom';
import { BoardCardHeader } from './Header/BoardCardHeader';

function BoardCard(props: { board: IBoardFaceDTO }): JSX.Element {
  const { board } = props;
  const navigate = useNavigate();

  return (
    <Paper
      className={styles.card}
      elevation={3}
      onClick={() => {
        navigate(`/boards/${board.id}`);
      }}
    >
      <BoardCardHeader board={board} />
      <Divider style={{ margin: '.5rem 0' }} />
      <div className={styles.card__description}>{board.description}</div>
    </Paper>
  );
}
export { BoardCard };
