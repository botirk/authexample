import React from 'react';

import Navbar, { bellowNavbarCSSHeight } from '../components/Navbar';
import useDataQuery from '../hooks/useDataQuery';

const C404 = () => {
  return <>
    <Navbar />
    <div style={{height: bellowNavbarCSSHeight}} className="d-flex justify-content-center align-items-center">
      <h1>404</h1>
    </div>
    
  </>;
}

export default C404;