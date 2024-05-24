import { configureStore, combineReducers } from '@reduxjs/toolkit';
import boardReducer from './reducers/boardSlice.ts';
import taskReducer from './reducers/taskSlice.ts';

const rootReducer = combineReducers({
  board: boardReducer,
  tasks: taskReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
