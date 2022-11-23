import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../../CONSTS/endpoints';
import {
  ICreateBoardBody,
  IBoardFaceDTO,
  IBoardDTO,
  IColumn,
  ICreateTaskBody,
  ITaskUpdate,
} from './types';

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

  tagTypes: ['boards', 'board'],

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
      providesTags: ['board'],
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
      invalidatesTags: ['board'],
    }),

    deleteColumn: builder.mutation<void, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => {
        return {
          url: `/${boardId}/columns/${columnId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['board'],
    }),

    createTask: builder.mutation<
      void,
      { boardId: string; columnId: string; body: ICreateTaskBody }
    >({
      query: ({ boardId, columnId, body }) => {
        return {
          url: `/${boardId}/columns/${columnId}/tasks`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['board'],
    }),

    updateTask: builder.mutation<
      void,
      { boardId: string; columnId: string; taskId: string; body: ITaskUpdate }
    >({
      query: ({ boardId, columnId, taskId, body }) => {
        return {
          url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['board'],
    }),
  }),
});

export { boardsApi };

export const {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useDeleteBoardMutation,
  useGetBoardQuery,
  useDeleteColumnMutation,
  useCreateColumnMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = boardsApi;
