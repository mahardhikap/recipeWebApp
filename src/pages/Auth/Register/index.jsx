import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, cleanRegisterUser } from '../../../redux/actions/loginUser';
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {data, isError, errorMessage} = useSelector(state => state.registerUser)
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const postData = (e) => {
    e.preventDefault();
    dispatch(registerUser(inputData));
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      Swal.fire(`${errorMessage?.message}`, '', 'error').then(()=>dispatch(cleanRegisterUser()))
    } else if (data) {
      Swal.fire(`${data?.message}`, '', 'success').then(() => {
        dispatch(cleanRegisterUser())
        navigate('/login');
      });
    }
  }, [isError, data, errorMessage]);

  return (
    <>
      <section className="container w-100">
        <div className="my-5 row justify-content-center">
          <div className="col-sm-12 col-md-6">
            <div className="mb-5 auth-desc text-center">
              <h2 className="mb-5 fw-bolder text-warning">Recipe</h2>
              <h1 className="text-warning">Let's Get Started!</h1>
              <p>Create new account to access all features</p>
            </div>
            <hr />
            <form onSubmit={postData} className="w-100">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Name"
                className="p-3 w-100 rounded mt-3 form-control"
                onChange={onChange}
                value={inputData.username}
              />
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                className="p-3 rounded w-100 mt-3 form-control"
                onChange={onChange}
                value={inputData.email}
              />
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="p-3 rounded w-100 mt-3 form-control"
                onChange={onChange}
                value={inputData.password}
              />
              <div className="form-check mt-3">
                <input
                  className="form-check-input bg-warning border-0"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree to terms & conditions
                </label>
              </div>
              <button
                type="submit"
                className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning"
              >
                Register Account
              </button>
            </form>
            <div className="mt-5 text-center">
              <p>
                Already have account?{' '}
                <Link
                  to={'/login'}
                  className="text-decoration-none text-warning"
                >
                  Log in Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
