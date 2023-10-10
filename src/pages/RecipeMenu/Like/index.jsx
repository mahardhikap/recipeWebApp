import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import NavbarCustom from '../../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMyLike } from '../../../redux/actions/myLike';

function Liked() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: myLike } = useSelector((state) => state.getMyLike);
  const todayDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(new Date());

  useEffect(() => {
    dispatch(getMyLike());
  }, []);

  return (
    <>
      <NavbarCustom />
      <div className="container">
        <section className="container col-md-12 col-lg-9">
          <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
            <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
              <div>
                <img
                  src={localStorage.getItem('photo')}
                  className="rounded-circle"
                  style={{ width: '40px' }}
                  alt=""
                />
              </div>
              <div>
                <div>{localStorage.getItem('username')}</div>
                <div className="fw-bold">Recipes</div>
              </div>
            </div>
            <div>
              <div>{todayDate}</div>
            </div>
          </div>
          <div className="detail-profile-menu border-bottom border-warning border-5">
            <ul className="list-unstyled d-flex gap-4 fs-3 fw-bold flex-wrap">
              <li>
                <Link to={'/mymenu'} className="text-decoration-none text-dark">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to={'/bookmarked'} className="text-decoration-none text-dark">
                  Bookmarked
                </Link>
              </li>
              <li>
                <Link to={'/liked'} className="text-decoration-none">
                  Liked
                </Link>
              </li>
            </ul>
          </div>
          {myLike ? (
            myLike?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="my-5 row align-items-center gap-3">
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center"
                      style={{ width: '350px' }}
                    >
                      <img
                        src={item.photo_menu}
                        className="img-thumbnail ratio ratio-1x1"
                        style={{
                          maxWidth: '300px',
                          height: '300px',
                          objectFit: 'cover',
                          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
                        }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <h2>{item.title}</h2>
                      <p className="badge bg-secondary fs-5">{item.category}</p>
                      <div className="w-25">
                        <div className="bg-warning rounded p-1 text-center d-flex justify-content-evenly fw-bold">
                          <div className="d-flex justify-content-center align-items-center text-white">
                            <i className="bi bi-hand-thumbs-up-fill fs-4 btn text-white"></i>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                        <div>
                          <img
                            src={item.photo_user}
                            alt="photo-user"
                            className="rounded-circle"
                            style={{ width: '40px' }}
                          />
                        </div>
                        <div>
                          <h4>{item.username}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-3">Data not found!</div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Liked;
