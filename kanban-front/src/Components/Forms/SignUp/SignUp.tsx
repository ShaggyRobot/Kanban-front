import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Divider, Link, Paper } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useGetUsersQuery, useSignInMutation, useSignUpMutation } from '../../../Rtk';
import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
import styles from '../form.module.scss';
import jwtDecode from 'jwt-decode';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignUp() {
  const { t } = useTranslation();
  const [handleSignUp, { isLoading: signUpLoading }] = useSignUpMutation();

  const [handleSignIn, { isLoading: signInLoading }] = useSignInMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });

  const submitHandler = async (values: IFormValues) => {
    try {
      const signUpResponse = await handleSignUp(values).unwrap();
      const signInBody = { login: values.login, password: values.password };
      const signInResponse = await handleSignIn(signInBody).unwrap();
      localStorage.setItem('login', signUpResponse.login);
      localStorage.setItem('token', signInResponse.token);
      const { userId } = jwtDecode(signInResponse.token) as { userId: string };
      localStorage.setItem('userId', userId);
      navigate('/boards');
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <Paper className={styles.form_container} elevation={3}>
      {signUpLoading ? (
        <div>Registering...</div>
      ) : signInLoading ? (
        <div>Logging in...</div>
      ) : (
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
              autoComplete="off"
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
          <Divider>{t('form.or')}</Divider>
          <NavLink to="/signin" style={{ margin: 'auto' }}>
            <Link component="button" underline="hover">
              {t('form.log')}
            </Link>
          </NavLink>
        </form>
      )}
    </Paper>
  );
}

export { SignUp };
