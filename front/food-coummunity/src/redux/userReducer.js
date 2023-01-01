import { createSlice } from '@reduxjs/toolkit';
import api from '../api/api';

let initialStates = {
  user: null,
  userType: null,
  token: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState: initialStates,

  reducers: {
    LOGIN: (state, action) => {
      console.log(state, action);
      state.user = action.payload.user.data;
      state.token = action.payload.token;
      state.type = action.payload.provider;
    },
    UserUpdate: (state, action) => {},
    LOGOUT: (state) => {
      return initialStates;
    },
  },
});
export const { LOGIN, LOGOUT, UserUpdate } = userSlice.actions;

export const connectSignUp = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('user/signup', body);
    console.log(data);
    alert('회원가입이 완료되었습니다');
    // dispatch(LOGIN({ user: data.user, token: data.token }));
  } catch (e) {
    if (e?.response?.data?.msg) {
      alert(e?.response?.data?.msg);
    }
    console.log(e?.response);
  }
};
export const localLogin = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('user/login', body);
    console.log(data);
    alert('로그인 성공');
    console.log(data);
    dispatch(LOGIN({ user: data, token: data.data.accesstoken }));
  } catch (e) {
    if (e?.response?.data?.msg) {
      alert(e?.response?.data?.msg);
    }
    console.log(e?.response);
  }
};
export const localLogout = (token) => async (dispatch) => {
  try {
    const { data } = await api.post('user/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(data);
    alert('로그아웃 성공');
    dispatch(LOGOUT());
  } catch (e) {
    if (e?.response?.data?.msg) {
      alert(e?.response?.data?.msg);
    }
    console.log(e?.response);
  }
};
export const selectUser = (state) => state.user;
export default userSlice.reducer;
