import React, { useState } from 'react';

import { useGetBoardsQuery } from '../../Rtk/Api/boardsApi';
import { Fab, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoardCard } from './BoardCard/BoardCard';

import styles from './boards-page.module.scss';
import { CreateBoard } from '../../Components/Forms/CreateBoard/CreateBoard';

function BoardsPage() {
  const { data } = useGetBoardsQuery();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.boards} page`}>
      <div className={styles.boards__wrapper}>
        {data && data.map((board) => <BoardCard key={board.id} board={board} />)}

        <Modal open={open} onClose={() => setOpen(false)} className="modal">
          <CreateBoard modalClose={() => setOpen(false)} />
        </Modal>

        <div className={styles.create}>
          <Fab onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
}

export { BoardsPage };
