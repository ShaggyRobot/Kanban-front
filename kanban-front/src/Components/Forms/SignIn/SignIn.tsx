import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSignInMutation } from '../../../RTK';

import { Button, Divider, Link, Paper, TextField } from '@mui/material';

import styles from '../form.module.scss';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [handleSignIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    try {
      const signInBody = { login: values.login, password: values.password };
      const signInResponse = await handleSignIn(signInBody).unwrap();
      localStorage.setItem('token', signInResponse.token);
      localStorage.setItem('login', values.login);
      navigate('/boards');
    } catch (error) {
      console.log((error as { data: { message: string } }).data.message);
    }
    reset();
  };

  return (
    <Paper className={styles.form_container} elevation={3}>
      <form
        className={styles.form}
        id="form"
        onSubmit={handleSubmit(submitHandler)}
        autoComplete="off"
      >
        <Paper elevation={3}>
          <TextField
            error={!!errors.login}
            size="small"
            type="text"
            label={t('form.login')!}
            {...register('login', { required: 'true' })}
          />
        </Paper>
        <Paper elevation={3}>
          <TextField
            error={!!errors.password}
            size="small"
            type="password"
            label={t('form.password')!}
            {...register('password', { required: 'true' })}
          />
        </Paper>

        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={!!Object.keys(errors).length}
        >
          {t('form.submit')}
        </Button>
        <Divider>{t('form.or')}</Divider>
        <NavLink to="/signup" style={{ margin: 'auto' }}>
          <Link component="button" underline="hover">
            {t('form.register')}
          </Link>
        </NavLink>
      </form>
    </Paper>
  );
}

export { SignIn };
