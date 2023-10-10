import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyUser, cleanVerify } from '../../../redux/actions/loginUser';
import Swal from 'sweetalert2';

function DirectVerify() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError } = useSelector((state) => state.verifyUser);

  useEffect(() => {
    dispatch(verifyUser(id));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Verify success!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          dispatch(cleanVerify());
          navigate('/login');
        });
      } else if (isError) {
        Swal.fire({
          icon: 'error',
          title: 'Verify failed!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => dispatch(cleanVerify()));
      }
    }, 5000);
  }, [data, isError]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <div className="text-center">
              <img
                src={'/recipe.svg'}
                style={{ width: '150px' }}
                alt="logo-mama-recipe"
              />
              <h1 className="text-warning">Process Verify Account!</h1>
              <p>Please wait, you will be redirected to the login page if verify successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectVerify;
