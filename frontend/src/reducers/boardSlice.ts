import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IBoard from '../services/IBoard.ts';

const initialState: IBoard = {
  id: '',
  name: '',
  tasks: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    loadBoard: (state: IBoard, action: PayloadAction<IBoard>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    updateBoardName: (state: IBoard, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    removeBoard: (state: IBoard, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        return;
      }
      state.name = '';
      state.id = '';
    },
  }
})

export const {
  loadBoard,
  updateBoardName,
  removeBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
