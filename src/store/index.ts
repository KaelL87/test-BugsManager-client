import { configureStore } from '@reduxjs/toolkit';

import bugsSlice from './slices/bugsSlice';
import modalSlice from './slices/modalSlice';
import usersSlice from './slices/usersSlice';
import projectsSlice from './slices/projectsSlice';
import { apiSlice } from './middleware/apiSlice';

const store = configureStore({
  reducer: {
    bugs: bugsSlice,
    users: usersSlice,
    projects: projectsSlice,
    modal: modalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
