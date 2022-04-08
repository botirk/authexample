import React from 'react';

import { bellowNavbarCSSHeight } from '../components/Navbar';

const C404 = () => {
  return <div style={{height: bellowNavbarCSSHeight}} className="d-flex justify-content-center align-items-center">
    <h1 className="text-danger">404</h1>
  </div>;
}

export default C404;