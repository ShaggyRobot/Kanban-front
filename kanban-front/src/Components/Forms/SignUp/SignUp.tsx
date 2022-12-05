import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Divider, Link, Paper } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IServerError, useSignInMutation, useSignUpMutation } from '../../../Rtk';
import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
import styles from '../form.module.scss';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignUp() {
  const { t } = useTranslation();
  const [handleSignUp] = useSignUpMutation();

  const [handleSignIn] = useSignInMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    const signupToast = toast.loading(`${t('messages.registering')}...`);
    try {
      toast.update(signupToast, { render: `${t('messages.loggingIn')}...` });
      await handleSignUp(values).unwrap();

      const signInBody = { login: values.login, password: values.password };
      const signInResponse = await handleSignIn(signInBody).unwrap();

      const { token } = signInResponse;
      const { userId, login } = jwtDecode(signInResponse.token) as {
        userId: string;
        login: string;
      };

      Object.entries({ userId, login, token }).forEach((entry) => {
        localStorage.setItem(entry[0], entry[1]);
      });

      toast.update(signupToast, {
        render: `${t('messages.success')} (*^o^)人 (^o^*)`,
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });

      navigate('/boards');
    } catch (error) {
      const statusCode = (error as IServerError).status;
      const msg = statusCode === 409 ? t('messages.userExists') : t('messages.userNotFound');

      toast.update(signupToast, {
        render: (
          <div>
            {`${statusCode}`}
            <br />
            {msg}
            <br />
            ¯\_(ツ)_/¯
          </div>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
    reset();
  };

  return (
    <Paper className={styles.form__container} elevation={3}>
      <h3>{t('form.register')}</h3>
      <form
        className={styles.form}
        id="form"
        onSubmit={handleSubmit(submitHandler)}
        autoComplete="off"
      >
        <Paper elevation={3}>
          <TextField
            error={!!errors.name}
            size="small"
            label={t('form.name')!}
            {...register('name', { required: 'true' })}
          />
        </Paper>
        <Paper elevation={3}>
          <TextField
            error={!!errors.login}
            size="small"
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
        <div>
          <Divider>{t('form.or')}</Divider>
        </div>
        <NavLink to="/signin" style={{ margin: 'auto' }}>
          <Link component="button" underline="hover">
            {t('form.log')}
          </Link>
        </NavLink>
      </form>
    </Paper>
  );
}

export { SignUp };
