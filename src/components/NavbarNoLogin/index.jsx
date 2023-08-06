import { Link } from 'react-router-dom';

function NavbarNoLogin() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-none pt-5">
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
              <div className="navbar-nav gap-4 mt-4">
                <Link to={'/home'} className="text-decoration-none">
                  Home
                </Link>
                <Link to={'#register'} className="text-decoration-none">
                  Register
                </Link>
                <a className="text-decoration-none" href="#">
                  Search Menu
                </a>
              </div>
              <div>
                  <div className='mt-4'>
                    <Link to={'/menu'}>Login</Link>
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
