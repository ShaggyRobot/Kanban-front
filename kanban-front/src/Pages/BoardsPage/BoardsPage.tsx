import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCreateBoardMutation, useGetBoardsQuery } from '../../RTK/API/boardsApi';
import { Button, TextField } from '@mui/material';
import { BoardCard } from './BoardCard/BoardCard';

import style from './boards-page.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

function BoardsPage() {
  const { t } = useTranslation();
  const { data } = useGetBoardsQuery();
  const [createBoard] = useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const boardCreate = async (values: IFormValues) => {
    await createBoard(values).unwrap();
    reset();
  };

  return (
    <div
      className={`${style.boards} page`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {data && data.map((board) => <BoardCard key={board.id} board={board} />)}

      <form
        id="boardCreate"
        onSubmit={handleSubmit(boardCreate)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'fit-content' }}
      >
        <TextField
          size="small"
          label={t('boards.title')}
          error={!!errors.title}
          {...register('title', { required: 'true' })}
        ></TextField>

        <TextField
          size="small"
          label={t('boards.description')}
          error={!!errors.description}
          {...register('description', { required: 'true' })}
        ></TextField>

        <Button variant="outlined" size="small" type="submit">
          {t('boards.create')}
        </Button>
      </form>
    </div>
  );
}

export { BoardsPage };
