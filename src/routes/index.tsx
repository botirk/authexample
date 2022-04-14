import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import Main from "./Main";
import Login from "./Login";
import C404 from "./404";
import Logout from "./Logout";
import Navbar from '../components/Navbar';
import useUser from '../hooks/useUser';
import { store } from '../redux/store';

const IndexWithoutStore = () => {
  const { isLoggedIn } = useUser();

  return <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        {!isLoggedIn && <>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Navigate replace to="/login" />} />
        </>}
        {isLoggedIn && <>
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/logout" element={<Logout />} />
        </>}
        <Route path="/404" element={<C404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>;
};

const Index = () => {
  return <Provider store={store}>
    <IndexWithoutStore />
  </Provider>;
}

export default Index;