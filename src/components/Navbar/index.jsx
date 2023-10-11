import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { logoutUser } from '../../redux/actions/loginUser';
import { getLikeClean } from '../../redux/actions/myLike';
import { getBookmarkClean } from '../../redux/actions/myBookmark';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function NavbarCustom() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',}).then((result)=>{
        if(result.isConfirmed){
          dispatch(logoutUser())
          dispatch(getLikeClean())
          dispatch(getBookmarkClean())
          Swal.fire(
            'Logout success!',
            '',
            'success'
          ).then(()=> {
            navigate('/');
          })
        } else {
          Swal.close()
        }
      })
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-none">
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
              <div className="navbar-nav gap-4">
                <Link to={'/mymenu'} className="text-decoration-none text-black">
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
                {/* <Link
                  to={'#'}
                  className="text-decoration-none text-black"
                >
                  My Menu
                </Link> */}
              </div>
              <div className="border-start border-warning border-4 ps-2">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <div>
                    <Link to={`/profile/${localStorage.getItem('id')}`}>
                      <img
                        className="rounded-circle"
                        style={{ width: '50px', height:'50px', objectFit:'cover' }}
                        src={localStorage.getItem('photo')}
                        alt='photo-profile'
                      />
                    </Link>
                  </div>
                  <div>
                    <div className="m-0 p-0 fw-bold" style={{width:'140px'}}>
                      {localStorage.getItem('username')}
                      {/* <span className="badge rounded-pill bg-danger">
                        {localStorage.getItem('roles')}
                      </span> */}
                    </div>
                    <div className="m-0 p-0 fw-bold">
                      <button
                        className="text-decoration-none border-0 bg-danger rounded text-white fw-bold"
                        onClick={()=>logout()}
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
    </>
  );
}

export default NavbarCustom;
