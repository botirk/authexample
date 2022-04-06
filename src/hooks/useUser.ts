import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/store';
import { login } from '../redux/slice';

const useUser = () => {
  const dispatch = useDispatch();
  const currentLogin = useSelector<RootState>((state) => state.state.login);

  return {
    isLoggedIn: !!currentLogin,
    login: async (email: string, password: string) => {
      try {
        console.log("FETCH!");
        const result = await fetch("http://localhost:3001/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        });

        

        if (result.ok) dispatch(login(email));

        return result.ok;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    logout: async () => {
      
    }
  };
};

export default useUser;