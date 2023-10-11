import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavbarNoLogin() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-none pt-3">
        <div className="container w-100">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div id='customborder' className="navbar-nav gap-4">
                <Link to={'/home'} style={{color:'#2E266F'}} className={`fw-bold text-decoration-none ${activeMenu === '/home' ? 'text-decoration-underline' : ''}`}>
                  Home
                </Link>
                <Link to={'/register'} style={{color:'#2E266F'}} className={`fw-bold text-decoration-none ${activeMenu === '/register' ? 'text-decoration-underline' : ''}`}>
                  Register
                </Link>
                <Link to={'/search-menu'} style={{color:'#2E266F'}} className={`fw-bold text-decoration-none ${activeMenu === '/search-menu' ? 'text-decoration-underline' : ''}`}>
                  Search Menu
                </Link>
              </div>
              <div>
                <div className='mt-4'>
                  <Link to={'/login'} style={{color:'#2E266F'}} className='text-decoration-none fw-bold'>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarNoLogin;
