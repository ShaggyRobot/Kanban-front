import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './Api/authApi';
import { boardsApi } from './Api/boardsApi';
import { columnsApi } from './Api/columnsApi';
import { usersApi } from './Api/usersApi';

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
      .concat(columnsApi.middleware)
      .concat(usersApi.middleware)
      .concat(boardsApi.middleware),
});

export { store };
