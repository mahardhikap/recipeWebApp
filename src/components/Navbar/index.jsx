import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function NavbarCustom() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

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
                <Link to={'/home'} className="text-decoration-none text-black">
                  Home
                </Link>
                <Link
                  to={'/input-menu'}
                  className="text-decoration-none text-black"
                >
                  Add Menu
                </Link>
                <Link
                  to={'/search-menu'}
                  className="text-decoration-none text-black"
                >
                  Search Menu
                </Link>
              </div>
              <div className="border-start border-warning border-4 ps-2">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <a href="#linktoeditprofile">
                      <img
                        className="rounded-circle"
                        style={{ width: '40px' }}
                        src={localStorage.getItem('photo')}
                      />
                    </a>
                  </div>
                  <div>
                    <div className="m-0 p-0">
                      {localStorage.getItem('username')}
                      <span className="badge rounded-pill bg-danger">
                        {localStorage.getItem('roles')}
                      </span>
                    </div>
                    <div className="m-0 p-0 fw-bold">
                      <button
                        className="text-decoration-none text-black p-0 border-0 bg-transparent fw-bold"
                        onClick={handleShow}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wanna logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning w-100" onClick={handleClose && logout}>
            Yes
          </Button>
          <Button variant="secondary w-100" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarCustom;
