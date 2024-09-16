// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建一个计数器 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

const editorSlice = createSlice({
  name: 'editor',
  initialState: { content: 'Hello, World!' },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

// 导出 reducer
export const { setContent } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;

// 导出 action 创建函数
export const { increment, decrement } = counterSlice.actions;

// 创建 Redux store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    editor: editorSlice.reducer,
  },
});

export default store;