import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        email:'',
        password:''
    })
    let url = import.meta.env.VITE_BASE_URL

    const postData = (e) => {
        e.preventDefault()
        console.log(inputData)
        axios.post(`${url}/login`,inputData).then((res)=>{console.log(res)
        localStorage.setItem("token",res.data.data.token)
        localStorage.setItem("username",res.data.data.username)
        localStorage.setItem("photo",res.data.data.photo)
        localStorage.setItem("email",res.data.data.email)
        navigate('/menu')
        }
        ).catch((err)=>{
            console.log(err)
        })
    }

    const onChange = (e) => {
        setInputData({...inputData,
        [e.target.name]:e.target.value
        })
    }

    return (
        <>
        <section className="container w-100">
  <div className="w-100 my-5 registration d-flex align-items-center justify-content-center">
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="mb-5 auth-desc text-center">
        <h2 className="mb-5 fw-bolder text-warning">Recipe</h2>
        <h1 className='text-warning'>Welcome</h1>
        <p>Login into your existing account</p>
      </div>
      <hr />
      <form onSubmit={postData} className="form-style-custom">
        <label htmlFor="email" className="mt-3">
          Email
        </label>
        <input
          type="text"
          id="email"
          name='email'
          onChange={onChange}
          value={inputData.email}
          placeholder="Enter email address"
          className="p-3 rounded w-100 mt-3 form-control"
        />
        <label htmlFor="password" className="mt-3">
          Password
        </label>
        <input
          type="text"
          id="password"
          name='password'
          onChange={onChange}
          value={inputData.password}
          placeholder="Password"
          className="p-3 rounded w-100 mt-3 form-control"
        />
        <div className="form-check">
            <input className="form-check-input bg-warning border-0" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
            I agree to terms & conditions
            </label>
        </div>
          <button
            type="submit"
            className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning"
          >
            Login
          </button>
      </form>
      <div className="mt-5 text-center">
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            className="text-decoration-none text-warning"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default Login