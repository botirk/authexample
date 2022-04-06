import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
  login: string | undefined;
  contactData: {
    phoneNumber: string,
    email: string,
  } | undefined;
};

export const slice = createSlice({
  name: 'counter',
  initialState: {} as State,
  reducers: {
    login: (state, payload: PayloadAction<string>) => {
      state.login = payload.payload;
    },

    logout: (state) => {
      state.login = undefined;
      state.contactData = undefined;
    },

    dataArrival: (state, payload: PayloadAction<State["contactData"]>) => {
      state.contactData = payload.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, dataArrival } = slice.actions;

export default slice.reducer;