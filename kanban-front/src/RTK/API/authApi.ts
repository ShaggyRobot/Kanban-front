import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from '../../CONSTS/endpoints';

import { ISignInResponse, ISignInBody, ISignUpBody, ISignUpResponse } from './types';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoints.baseUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpBody>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),

    signIn: builder.mutation<ISignInResponse, ISignInBody>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export { authApi };
export const { useSignUpMutation, useSignInMutation } = authApi;
