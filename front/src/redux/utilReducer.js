import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

let initialStates = {
  mylocation: false,
  positionlat: null,
  positionlng: null,
};

const utilSlice = createSlice({
  name: 'util',
  initialState: initialStates,

  reducers: {
    MYLOCATION: (state, action) => {
      state.mylocation = action.payload;
      // state.mylocation = action;
    },
    POSITION: (state, action) => {
      console.log(action.payload);
      {
      }
      state.positionlat = action.payload.lat;
      state.positionlng = action.payload.lng;
    },
  },
});
export const { MYLOCATION, POSITION } = utilSlice.actions;

export const geomylocation = (body) => async (dispatch) => {
  dispatch(MYLOCATION(body));
};

export const selectUtil = (state) => state.util;

export default utilSlice.reducer;
