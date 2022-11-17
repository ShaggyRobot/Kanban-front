import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './API/authApi';
import { boardsApi } from './API/boardsApi';
import { columnsApi } from './API/columnsApi';
import { usersApi } from './API/usersApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(boardsApi.middleware)
      .concat(columnsApi.middleware)
      .concat(usersApi.middleware),
});

export { store };
