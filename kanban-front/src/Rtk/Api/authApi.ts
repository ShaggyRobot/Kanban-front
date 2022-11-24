import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endpoints } from '../../CONSTS/endpoints';

import { ISignInResponse, ISignInBody, ISignUpBody, ISignUpResponse } from './types';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoints.baseUrl }),

  tagTypes: ['users'],

  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUpResponse, ISignUpBody>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['users'],
    }),

    signIn: builder.mutation<ISignInResponse, ISignInBody>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export { authApi };
export const { useSignUpMutation, useSignInMutation } = authApi;
