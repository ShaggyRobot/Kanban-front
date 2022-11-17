import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateColumnMutation } from '../../../RTK/API/columnsApi';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
}

function CreateColumn(props: { boardId: string }): JSX.Element {
  const { boardId } = props;
  const [createColumn] = useCreateColumnMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    await createColumn({ boardId, title: values.title });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <TextField
        size="small"
        type="text"
        label="Title"
        {...register('title', { required: 'true' })}
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
  );
}
export { CreateColumn };
