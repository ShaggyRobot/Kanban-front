import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { endpoints } from '../../CONSTS/endpoints';
import { IColumn } from './types';

const columnsApi = createApi({
  reducerPath: 'columnsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.boards,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      token && headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['columns', 'boards', 'board'],

  endpoints: (builder) => ({}),
});

export { columnsApi };
export const {
  // useGetColumnQuery,
  // useGetColumnsQuery,
  // useCreateColumnMutation,
  // useDeleteColumnMutation,
} = columnsApi;
