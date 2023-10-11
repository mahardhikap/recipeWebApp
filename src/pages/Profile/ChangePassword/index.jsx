import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateProfile } from '../../../redux/actions/loginUser';
import NavbarCustom from '../../../components/Navbar';
import Swal from 'sweetalert2';

function ChangePassProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError } = useSelector(
    (state) => state.updateProfile
  );
  const [inputData, setInputData] = useState({
    password: '',
  });

  const postData = (e) => {
    e.preventDefault();
    dispatch(updateProfile(inputData));
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      Swal.fire('Update password failed!', '', 'error')
    } else if (data) {
      Swal.fire('Update password success!', '', 'success').then(() => {
        dispatch(logoutUser())
        navigate('/login');
        window.location.reload()
      });
    }
  }, [isError, data]);

  return (
    <>
    <NavbarCustom/>
      <section className="container">
        <div className="w-100 my-5">
          <div className="col-sm-12 col-md-6 mx-auto">
            <div className="mb-5 text-center">
              <h1 className="text-warning">Change Password</h1>
              <h5>After change password re-login is required</h5>
            </div>
            <hr />
            <form onSubmit={postData} className="">
            <label htmlFor="password" className="mt-3">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                value={inputData.password}
                placeholder="Enter new password"
                className="p-3 rounded w-100 mt-3 form-control"
              />
              <button
                type="submit"
                className="p-3 border-0 text-white rounded mt-5 w-100 bg-warning fw-medium"
              >
                Change Password
              </button>
              <div className='mt-3 fw-medium'>Back to edit profile?<Link to={`/profile/${localStorage.getItem('id')}`} className='text-decoration-none text-warning'> Click here</Link> </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePassProfile;