import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyUser, cleanVerify } from '../../../redux/actions/loginUser';
import Swal from 'sweetalert2';

function VerifyRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError } = useSelector((state) => state.verifyUser);
  const [verificationCode, setVerificationCode] = useState('');
  const handleVerifyUser = (e) => {
    e.preventDefault();
    dispatch(verifyUser(verificationCode));
  };
  
  useEffect(() => {
    if (data) {
      Swal.fire('Verify success!', '', 'success').then(()=> {
        dispatch(cleanVerify())
        navigate('/login')
    })
    } else if (isError) {
      Swal.fire('Verify failed!', '', 'error').then(()=> dispatch(cleanVerify()));
    }
  }, []);

  return (
    <>
      <section className="container">
        <div className="w-100 my-5">
          <div className="col-sm-12 col-md-6 mx-auto">
            <div className="mb-5 text-center">
              <h2 className="mb-5 fw-bolder text-warning">Recipe</h2>
              <h1 className="text-warning">Verify Account</h1>
              <p>Input code to verify your account</p>
            </div>
            <hr />
            <form onSubmit={handleVerifyUser}>
              <input
                type="text"
                id="verify"
                name="verify"
                onChange={(e) => setVerificationCode(e.target.value)}
                value={verificationCode}
                placeholder="Enter code verify"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <button
                type="submit"
                className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning fw-medium"
              >
                Verification
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default VerifyRegister;
