import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../../CONSTS/endpoints';
import { ICreateBoardBody, IBoardFaceDTO, IBoardDTO, IColumn } from './types';

const boardsApi = createApi({
  reducerPath: 'boardsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.boards,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      token && headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ['boards'],

  endpoints: (builder) => ({
    getBoards: builder.query<IBoardFaceDTO[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['boards'],
    }),

    createBoard: builder.mutation<IBoardFaceDTO, ICreateBoardBody>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['boards'],
    }),

    deleteBoard: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['boards'],
    }),

    getBoard: builder.query<IBoardDTO, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    getColumns: builder.query<Array<IColumn>, string>({
      query: (boardId: string) => ({
        url: `/${boardId}/columns`,
        method: 'GET',
      }),
    }),
  }),
});

export { boardsApi };
export const {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useDeleteBoardMutation,
  useGetBoardQuery,
} = boardsApi;
