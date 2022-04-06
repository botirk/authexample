import React from 'react';
import { Link } from 'react-router-dom';

import useUser from '../hooks/useUser';

export const navbarCSSHeight = "3.5rem";
export const bellowNavbarCSSHeight = `calc(100% - ${navbarCSSHeight})`;

const Navbar = () => {
  const { isLoggedIn } = useUser();

  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link  className="navbar-brand" to="/">authexample</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto"/>
        <div className="d-flex">
          {!isLoggedIn && 
            <Link className="btn btn-outline-success" to="/login">Log-in</Link>
          }
          {isLoggedIn && 
            <button className="btn btn-outline-danger">
              <Link to="/logout">Log-out</Link>
            </button>
          }
        </div>
      </div>
    </div>
  </nav>;
};

export default Navbar;