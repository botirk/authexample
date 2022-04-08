import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Key } from 'react';

import '../utils/dateExtension';

export interface ContactInterface {
  id: string, 
  phoneNumber: string,
}

export interface ContactsInterface {
  [id: Key]: ContactInterface,
}

export interface LoginData {
  email: string,
  token: string,
}

export interface State {
  loginData?: LoginData,
  contactData?: ContactsInterface,
};

const loadLoginData = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const expirationStr = localStorage.getItem("expiration");
  if (!email || !token || !expirationStr) return;
  
  const expiration = new Date(expirationStr);
  if (expiration > new Date().withoutOffset()) return;

  return { email, token, expirationStr };
}

const removeLoginData = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}

const setLoginData = (email: string, token: string, expiration: Date) => {
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expiration.toISOString());
}

export const slice = createSlice({
  name: 'counter',
  initialState: { loginData: loadLoginData() } as State,
  reducers: {
    login: (state, payload: PayloadAction<LoginData>) => {
      state.loginData = payload.payload;
      setLoginData(payload.payload.email, payload.payload.token, (new Date()).addHours(0.95));
    },

    logout: (state) => {
      state.loginData = undefined;
      state.contactData = undefined;
      removeLoginData();
    },

    dataArrival: (state, payload: PayloadAction<ContactsInterface>) => {
      state.contactData = payload.payload;
    },

    dataRefresh: (state, payload: PayloadAction<ContactInterface>) => {
      if (!state.contactData) return;
      state.contactData[payload.payload.id] = payload.payload;
    },

    dataDelete: (state, payload: PayloadAction<ContactInterface>) => {
      if (!state.contactData) return;
      delete state.contactData[payload.payload.id];
    },

    dataAdd: (state, payload: PayloadAction<ContactInterface>) => {
      if (!state.contactData) return;
      state.contactData[payload.payload.id] = payload.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, dataArrival, dataRefresh, dataDelete, dataAdd } = slice.actions;

export default slice.reducer;