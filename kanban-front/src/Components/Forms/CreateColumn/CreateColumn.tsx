import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateColumnMutation } from '../../../Rtk/Api/boardsApi';

import styles from '../form.module.scss';

interface IFormValues {
  title: string;
}

const CreateColumn = React.forwardRef(function (
  props: {
    boardId: string;
    modalClose: () => void;
  },
  ref
): JSX.Element {
  const { boardId, modalClose } = props;
  const [createColumn] = useCreateColumnMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    await createColumn({ boardId, title: values.title });
    modalClose();
    reset();
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
export { CreateColumn };
