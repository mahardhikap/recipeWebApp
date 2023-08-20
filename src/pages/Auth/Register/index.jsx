import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  let url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const postData = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('username', inputData.username);
    bodyFormData.append('email', inputData.email);
    bodyFormData.append('password', inputData.password);
    console.log(bodyFormData);

    axios
      .post(`${url}/users`, bodyFormData)
      .then((res) => {
        console.log(res);
        toast.success(res.data.status)
        setTimeout(()=>{
          navigate('/login')
        }, 2000)
      })
      .catch((error) => {
        console.error('axios error', error);
        toast.error(error.response.data.error.message)
      });
  };

  const onChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    console.log(value);
  };

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
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
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
                type="text"
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
                type="text"
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
      <ToastContainer/>
    </>
  );
}

export default Register;
