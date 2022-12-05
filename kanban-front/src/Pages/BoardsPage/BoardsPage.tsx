import React, { useState } from 'react';

import { useGetBoardsQuery } from '../../Rtk/Api/boardsApi';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoardCard } from './BoardCard/BoardCard';

import styles from './boards-page.module.scss';
import { CreateBoard } from '../../Components/Forms/CreateBoard/CreateBoard';
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent';
import { useTranslation } from 'react-i18next';

function BoardsPage() {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { data, isLoading } = useGetBoardsQuery();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.boards} page`}>
      {isLoading ? (
        <h1 className="float">Loading...</h1>
      ) : (
        <div className={styles.boards__wrapper}>
          {data &&
            [...data!]
              .sort((a, b) => a.title.localeCompare(b.title, language, { numeric: true }))
              .map((board) => <BoardCard key={board.id} board={board} />)}
          <ModalComponent open={open} setOpen={setOpen}>
            <CreateBoard modalClose={() => setOpen(false)} />
          </ModalComponent>

          <div className={styles.create}>
            <Fab onClick={() => setOpen(true)}>
              <AddIcon />
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
}

export { BoardsPage };
