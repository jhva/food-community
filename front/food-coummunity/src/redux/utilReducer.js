import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

let initialStates = {
  mylocation: false,
};

const utilSlice = createSlice({
  name: 'util',
  initialState: initialStates,

  reducers: {
    MYLOCATION: (state, action) => {
      state.mylocation = action.payload;
      // state.mylocation = action;
    },
  },
});
export const { MYLOCATION } = utilSlice.actions;

export const geomylocation = (body) => async (dispatch) => {
  dispatch(MYLOCATION(body));
};

export const selectUtil = (state) => state.util;

export default utilSlice.reducer;
