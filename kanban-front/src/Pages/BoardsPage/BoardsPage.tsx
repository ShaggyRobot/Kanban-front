import React, { useState } from 'react';

import { useGetBoardsQuery } from '../../Rtk/Api/boardsApi';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoardCard } from './BoardCard/BoardCard';

import styles from './boards-page.module.scss';
import { CreateBoard } from '../../Components/Forms/CreateBoard/CreateBoard';
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent';

function BoardsPage() {
  const { data } = useGetBoardsQuery();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.boards} page`}>
      <div className={styles.boards__wrapper}>
        {data && data.map((board) => <BoardCard key={board.id} board={board} />)}
        <ModalComponent
          open={open}
          setOpen={setOpen}
          Elem={<CreateBoard modalClose={() => setOpen(false)} />}
        />

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
