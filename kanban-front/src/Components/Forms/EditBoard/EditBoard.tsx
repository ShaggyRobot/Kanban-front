import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IBoardFaceDTO, useUpdateBoardMutation } from '../../../Rtk';

import styles from '../form.module.scss';
import { emit } from 'process';

interface IFormValues {
  title: string;
  description: string;
}

function EditBoard(props: { board: IBoardFaceDTO; closeModal: () => void }): JSX.Element {
  const { board, closeModal } = props;
  const { t } = useTranslation();
  const [updateBoard] = useUpdateBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const updateBoardHandler = async (values: IFormValues) => {
    updateBoard({ boardId: board.id, body: values });
    reset();
    closeModal();
  };

  return (
    <Paper elevation={2} className={styles.form__container}>
      <h3>{t('boards.editBoard')}</h3>
      <form id="updateBoard" className={styles.form} onSubmit={handleSubmit(updateBoardHandler)}>
        <TextField
          multiline
          maxRows={3}
          label={t('boards.title')}
          className={styles.form__txt_area}
          style={{ width: '300px' }}
          defaultValue={board.title}
          {...register('title', { required: 'true' })}
          error={!!errors.title}
        ></TextField>
        <TextField
          multiline
          rows={8}
          label={t('boards.description')}
          className={styles.form__txt_area}
          placeholder={`${t('boards.description')}`}
          defaultValue={board.description}
          {...register('description', { required: 'true' })}
          error={!!errors.description}
        ></TextField>
        <Button variant="outlined" size="small" type="submit">
          {t('form.submit')}
        </Button>
      </form>
    </Paper>
  );
}

export { EditBoard };
