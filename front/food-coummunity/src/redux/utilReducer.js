import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

let initialStates = {
  mylocation: false,
};

const utilSlice = createSlice({
  name: 'util',
  initialState: initialStates,

  reducers: {},
});
export const {} = (state) => state.util;
export default utilSlice.reducer;
