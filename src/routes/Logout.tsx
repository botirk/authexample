import React, { useEffect } from 'react';

import { bellowNavbarCSSHeight } from '../components/Navbar';
import useUser from '../hooks/useUser';

const Logout = () => {
  const { logout } = useUser();

  useEffect(() => {
    setTimeout(logout, 5000);
  });

  return <div style={{height: bellowNavbarCSSHeight}} className="d-flex justify-content-center align-items-center">
    <div className="d-flex  flex-column justify-content-center align-items-center">
      <div className="spinner-border mb-3" role="status">
        <span className="visually-hidden-focusable">Loading...</span>
      </div>
      <h1>Logout...</h1>
    </div>
  </div>;
}

export default Logout;