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

  tagTypes: ['columns'],
  endpoints: (builder) => ({
    getColumn: builder.query<IColumn, string[]>({
      query: (args) => {
        const [boardId, columnId] = args;
        return {
          url: `/${boardId}/columns/${columnId}`,
          method: 'GET',
        };
      },
    }),
    createColumn: builder.mutation<IColumn, { boardId: string; title: string }>({
      query: (arg) => {
        const { boardId, title } = arg;
        return {
          url: `/${boardId}/columns`,
          method: 'POST',
          body: {
            title,
          },
        };
      },
    }),
  }),
});

export { columnsApi };
export const { useGetColumnQuery, useCreateColumnMutation } = columnsApi;
