import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCreateBoardMutation } from '../../../Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

const CreateBoard = React.forwardRef(function (
  props: { modalClose: () => void },
  ref
): JSX.Element {
  const { modalClose } = props;
  const { t } = useTranslation();
  const [createBoard] = useCreateBoardMutation();
  console.log(ref);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const boardCreate = async (values: IFormValues) => {
    await createBoard(values).unwrap();
    modalClose();
    reset();
  };

  return (
    <Paper elevation={2} className={styles.form_container}>
      <form id="boardCreate" className={styles.form} onSubmit={handleSubmit(boardCreate)}>
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
    </Paper>
  );
});

export { CreateBoard };
