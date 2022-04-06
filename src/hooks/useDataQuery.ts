import useUser from '../hooks/useUser';

const useDataQuery = () => {
  const { isLoggedIn } = useUser();

  return {
    isLoggedIn,
    data: undefined,
  }
};

export default useDataQuery;