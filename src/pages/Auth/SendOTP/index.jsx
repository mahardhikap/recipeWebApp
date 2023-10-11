import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { sendCodeOTP, cleanSendOTP } from '../../../redux/actions/loginUser';
import Swal from 'sweetalert2';

function SendOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError, errorMessage } = useSelector(
    (state) => state.sendCodeOTP
  );
  const [email, setEmail] = useState('');
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(sendCodeOTP(email));
  };
  
  useEffect(() => {
    if (data) {
      Swal.fire(`${data?.message}`, '', 'success').then(() => {
        dispatch(cleanSendOTP());
        navigate('/otp-change-password');
      });
    } else if (isError) {
      Swal.fire(`${errorMessage?.message}`, '', 'error').then(() =>
        dispatch(cleanSendOTP())
      );
    }
  }, [data, isError, errorMessage]);
  return (
    <>
      <section className="container">
        <div className="w-100 my-5">
          <div className="col-sm-12 col-md-6 mx-auto">
            <div className="mb-5 text-center">
              <h2 className="mb-5 fw-bolder text-warning">Recipe</h2>
              <h1 className="text-warning">Send OTP</h1>
              <p>Input your valid registered email to get Code OTP</p>
            </div>
            <hr />
            <form onSubmit={handleSendOTP}>
              <input
                type="text"
                id="sendOTP"
                name="sendOTP"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
                placeholder="Enter registered email"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <button
                type="submit"
                className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning fw-medium"
              >
                Send OTP
              </button>
              <Link to={'/otp-change-password'} className='text-decoration-none'>
                <div className="mt-3 d-flex justify-content-center align-items-center btn cursor-pointer">
                  I have Code OTP
                </div>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SendOTP;
