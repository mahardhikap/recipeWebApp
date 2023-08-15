import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import NavbarCustom from '../../components/Navbar';
import Footer from '../../components/Footer';

function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    photo_url: '',
  });
  let url = import.meta.env.VITE_BASE_URL;

  const getUser = () => {
    axios
      .get(`${url}/users/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log('ini respon get user by id', res);
        setInputData({
          ...inputData,
          username: res.data.data[0].username,
          email: res.data.data[0].email,
          //   password: res.data.data[0].password,
          photo_url: res.data.data[0].photo,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(id);
    getUser();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('username', inputData.username);
    bodyFormData.append('email', inputData.email);
    if (inputData.password) {
      bodyFormData.append('password', inputData.password);
    }
    bodyFormData.append('photo', photo);
    console.log(bodyFormData);

    axios
      .put(`${url}/users/${id}`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('ini respon update user', res);
        localStorage.clear();
        navigate('/login');
      })
      .catch((error) => {
        console.error('ini adalah error user', error);
      });
  };
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo_url: URL.createObjectURL(e.target.files[0]),
      });
  };

  return (
    <>
      <NavbarCustom />
      <section className="container w-100 d-flex justify-content-center align-items-center">
        <div className="my-5 col-sm-12 col-md-6 col-lg-6">
          <form onSubmit={postData}>
            <div className="d-flex flex-column align-items-center">
              <label
                htmlFor="file"
                style={{
                  backgroundImage: `url(${inputData.photo_url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '300px',
                  height: '300px',
                }}
                className="d-flex justify-content-center align-items-center rounded-circle border border-2"
              >
                Add Photo
              </label>
              <input
                className="d-none"
                type="file"
                onChange={onChangePhoto}
                name="photo"
                id="file"
              />

              <div className="fw-medium">Change Profile Picture</div>
            </div>
            <label htmlFor="name" className="mt-3 fw-medium">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={inputData.username}
              onChange={onChange}
              className="w-100 p-3 form-control border-2"
              placeholder="username"
            />
            <label htmlFor="email" className="mt-3 fw-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={inputData.email}
              onChange={onChange}
              className="w-100 p-3 form-control border-2"
              placeholder="name"
            />
            <label htmlFor="password" className="mt-3 fw-medium">
              Password
            </label>
            <input
              type="password" // Change the input type to "password"
              name="password"
              value={inputData.password || ''} // Use an empty string if no password is available
              onChange={onChange}
              className="w-100 p-3 form-control border-2"
              placeholder="password"
              required
            />
            <button
              type="submit"
              className="p-3 rounded border-0 text-white w-100 mt-5 bg-warning"
            >
              Update Profile
            </button>
            <p className="mt-3 fw-medium">
              Change Password?{' '}
              <a
                href="./change-password.html"
                className="text-warning text-decoration-none"
              >
                Click Here
              </a>
            </p>
          </form>
        </div>
      </section>
      <section id="call-modal">
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-warning" id="exampleModalLabel">
                  You want to logout?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              {/* <div class="modal-body">
            <p>Ini adalah konten dari modal.</p>
          </div> */}
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn w-100 bg-warning text-white border-0"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn bg-secondary-subtle w-100 text-white border-0"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserProfile;
