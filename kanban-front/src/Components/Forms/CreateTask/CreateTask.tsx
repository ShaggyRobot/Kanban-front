import { Button, Paper, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '../../../Rtk';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
  description: string;
}

const CreateTask = React.forwardRef(function (
  props: {
    boardId: string;
    columnId: string;
    modalClose: () => void;
  },
  ref
): JSX.Element {
  const userId = localStorage.getItem('userId');
  const { boardId, columnId, modalClose } = props;
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    if (userId) {
      await createTask({ boardId, columnId, body: { ...values, userId } });
      modalClose();
      reset();
    }
  };

  return (
    <Paper className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <TextField
          size="small"
          type="text"
          label="Title"
          {...register('title', { required: 'true' })}
        />

        <TextField
          size="small"
          type="text"
          label="Description"
          {...register('description', { required: 'true' })}
        />

        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={!!Object.keys(errors).length}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
});
export { CreateTask };
