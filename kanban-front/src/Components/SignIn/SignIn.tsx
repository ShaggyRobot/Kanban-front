import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../RTK';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignIn() {
  const navigate = useNavigate();
  const [handleSignIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
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
    <div>
      <form id="form" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        <input type="text" placeholder="Login" {...register('login', { required: 'true' })} />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'true' })}
        />

        <button type="submit" disabled={!!Object.keys(errors).length}>
          Submit
        </button>
      </form>
    </div>
  );
}

export { SignIn };
