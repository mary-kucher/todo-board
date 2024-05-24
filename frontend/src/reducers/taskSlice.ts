import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ITask, { TaskStatus } from '../services/ITask.ts';

export interface ITasksState {
  TODO: ITask[];
  IN_PROGRESS: ITask[];
  DONE: ITask[];
}

const initialState: ITasksState = {
  TODO: [],
  IN_PROGRESS: [],
  DONE: [],
};


export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state: ITasksState, action: PayloadAction<ITask[]>) => {
      state.TODO = action.payload.filter(task => task.status === TaskStatus.TODO);
      state.IN_PROGRESS = action.payload.filter(task => task.status === TaskStatus.IN_PROGRESS);
      state.DONE = action.payload.filter(task => task.status === TaskStatus.DONE);
    },
    createTask: (state: ITasksState, action: PayloadAction<ITask>) => {
      state.TODO.push(action.payload);
    },
    editTask: (state: ITasksState, action: PayloadAction<ITask>) => {
      const tasks = state[action.payload.status];
      const taskIndex = tasks.findIndex(task => task.id === action.payload.id);
      tasks[taskIndex] = action.payload;
    },
    changeTaskStatus: (state: ITasksState, action: PayloadAction<{oldStatus: TaskStatus, task: ITask}>) => {
      const tasks = state[action.payload.oldStatus];
      state[action.payload.oldStatus] = tasks.filter(task => task.id !== action.payload.task.id);
      state[action.payload.task.status].push(action.payload.task);
    },
    removeTask: (state: ITasksState, action: PayloadAction<ITask>) => {
      const tasks = state[action.payload.status];

      state[action.payload.status] = tasks.filter(task => task.id !== action.payload.id);
    }
  }
})

export const {
  loadTasks,
  createTask,
  editTask,
  removeTask,
  changeTaskStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
