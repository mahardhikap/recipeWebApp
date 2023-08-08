import { Link } from "react-router-dom";

function NavbarCustom() {
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
                <Link to={'/home'} className="text-decoration-none">Home</Link>
                <Link to={'/input-menu'} className="text-decoration-none">Add Menu</Link>
                <Link to={'/search-menu'} className="text-decoration-none">
                  Search Menu
                </Link>
              </div>
              <div className="border-start border-warning border-4 ps-2">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <a href="#linktoeditprofile">
                      <img
                        src="#linkphotoprofile"
                        alt=""
                      />
                    </a>
                  </div>
                  <div>
                    <div className="m-0 p-0">dhika</div>
                    <div className="m-0 p-0 fw-bold">
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal"
                        className="text-decoration-none text-black"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarCustom