import { createSlice } from "@reduxjs/toolkit";
import {instance} from '../api/axiosclient';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    token: null,
    isAdmin: false
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      instance.defaults.headers.common['authorization'] = `Bearer ${action.payload.token}`
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      instance.defaults.headers.common['authorization'] = null
      state.isAdmin = false;
    },
    refreshData: (state, action) => {
      state.token = action.payload.token;
      instance.defaults.headers.common['authorization'] = `Bearer ${action.payload.token}`
      state.isAdmin = action.payload.isAdmin;
    }
  }
})



export const { login, logout, refreshData} = userSlice.actions

export const selectIsUserConnected = (state) => state.user.token !== null
export const selectUser = (state) => state.user.userId !== null
export const selectUserAdmin = (state) => state.user.isAdmin


export default userSlice.reducer