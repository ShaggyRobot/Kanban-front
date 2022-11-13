import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation, useSignUpMutation } from '../../RTK';

interface IFormValues {
  name: string;
  login: string;
  password: string;
}

function SignUp() {
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
    try {
      const signUpResponse = await handleSignUp(values).unwrap();
      const signInBody = { login: values.login, password: values.password };
      const signInResponse = await handleSignIn(signInBody).unwrap();
      localStorage.setItem('login', signUpResponse.login);
      localStorage.setItem('token', signInResponse.token);
      navigate('/boards');
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'true' })}
          autoComplete="off"
        />
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

export { SignUp };
