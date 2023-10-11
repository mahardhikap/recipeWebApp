import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordOTP, cleanChangePasswordOTP } from '../../../redux/actions/loginUser';
import Swal from 'sweetalert2';

function ChangePassProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError, errorMessage } = useSelector(
    (state) => state.changePasswordOTP
  );
  const [inputData, setInputData] = useState({
    password: '',
    email: '',
    validate:'',
  });

  const postData = (e) => {
    e.preventDefault();
    dispatch(changePasswordOTP(inputData));
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      Swal.fire(`${errorMessage?.message}`, '', 'error').then(()=>dispatch(cleanChangePasswordOTP()))
    } else if (data) {
      Swal.fire(`${data?.message}`, '', 'success').then(() => {
        dispatch(cleanChangePasswordOTP())
        navigate('/login');
      });
    }
  }, [isError, data, errorMessage]);

  return (
    <>
      <section className="container">
        <div className="w-100 my-5">
          <div className="col-sm-12 col-md-6 mx-auto">
            <div className="mb-5 text-center">
              <h2 className="mb-5 fw-bolder text-warning">Recipe</h2>
              <h1 className="text-warning">Change Password</h1>
              <p>Input your credentials data to change your password's account</p>
            </div>
            <hr />
            <form onSubmit={postData} className="">
            <label htmlFor="password" className="mt-3">
                New Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                onChange={onChange}
                value={inputData.password}
                placeholder="Enter new password"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={onChange}
                value={inputData.email}
                placeholder="Enter email address"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <label htmlFor="validate" className="mt-3">
                Code OTP
              </label>
              <input
                type="text"
                id="validate"
                name="validate"
                onChange={onChange}
                value={inputData.validate}
                placeholder="Enter your code OTP"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <button
                type="submit"
                className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning fw-medium"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePassProfile;