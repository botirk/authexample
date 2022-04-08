import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/store';
import { login, logout } from '../redux/slice';

const useUser = () => {
  const dispatch = useDispatch();
  const loginData = useSelector((state: RootState) => state.state.loginData);
  const [isProcess, setProcess] = useState(false);

  return {
    loginData,
    isLoggedIn: !!loginData,
    login: async (email: string, password: string) => {
      if (isProcess) return false;
      setProcess(true);
      try {
        const result = await fetch("http://localhost:3001/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (result.ok) dispatch(login({ email, token: (await result.json()).accessToken }));

        setProcess(false);
        return result.ok;
      } catch (error) {
        setProcess(false);
        return false;
      }
    },
    logout: async () => {
      dispatch(logout());
    }
  };
};

export default useUser;