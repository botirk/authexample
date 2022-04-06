import React from 'react';

import Navbar, { bellowNavbarCSSHeight } from '../components/Navbar';
import useDataQuery from '../hooks/useDataQuery';

const Main = () => {
  const { isLoggedIn } = useDataQuery();

  return <>
    <Navbar />
    <div style={{height: bellowNavbarCSSHeight}} className="d-flex justify-content-center align-items-center">
      {!isLoggedIn && <h3 className="text-warning text-center mt-3">Please Log-in to view contacts!</h3>}
    </div>
    
  </>;
}

export default Main;