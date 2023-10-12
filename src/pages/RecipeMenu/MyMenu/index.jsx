import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import NavbarCustom from '../../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMenu } from '../../../redux/actions/myMenu';
import { deleteMenu } from '../../../redux/actions/menu';
import { postLike, getMyLike } from '../../../redux/actions/myLike';
import { postBookmark, getMyBookmark } from '../../../redux/actions/myBookmark';
import Swal from 'sweetalert2';

function MyMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: myMenu } = useSelector((state) => state.getMyMenu);
  const { data: myLike } = useSelector((state) => state.getMyLike);
  const { data: myBookmark } = useSelector((state) => state.getMyBookmark);
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('DESC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [title, setTitle] = useState('');
  const todayDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(new Date());

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= myMenu?.pages?.totalPage) {
      setPage(pageNumber);
    }
  };

  const handleLike = (idRecipe) => {
    dispatch(postLike(idRecipe)).then(() => {
      dispatch(getMyLike());
      dispatch(getMyMenu(sortby, sort, page, limit));
    });
  };
  const handleBookmark = (idRecipe) => {
    dispatch(postBookmark(idRecipe)).then(() => {
      dispatch(getMyBookmark());
      dispatch(getMyMenu(sortby, sort, page, limit));
    });
  };

  const handleDeleteMenu = (idMenu, titleMenu) => {
    Swal.fire({
      title: `Do you want to delete "${titleMenu}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMenu(idMenu));
        Swal.fire('Delete menu success!', '', 'success').then(() => {
          dispatch(getMyMenu(sortby, sort, page, limit));
        });
      } else {
        Swal.close();
      }
    });
  };

  useEffect(() => {
    dispatch(getMyMenu(sortby, sort, page, limit));
    dispatch(getMyLike())
    dispatch(getMyBookmark())
  }, [page]);

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
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
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
                <Link to={'/mymenu'} style={{color:'#EFC81A'}} className="text-decoration-none">
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  to={'/bookmarked'}
                  className="text-decoration-none text-dark"
                >
                  Bookmarked
                </Link>
              </li>
              <li>
                <Link to={'/liked'} className="text-decoration-none text-dark">
                  Liked
                </Link>
              </li>
            </ul>
          </div>
          {myMenu ? (
            myMenu?.rows?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="my-5 row align-items-center gap-3">
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center"
                      style={{ width: '350px' }}
                    >
                      <Link to={`/detail-menu/${item.id}`}>
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
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                    <Link to={`/detail-menu/${item.id}`} className='text-decoration-none text-black'>
                      <h2>{item.title}</h2>
                      <p className="badge bg-secondary fs-5">{item.category}</p>
                      </Link>
                      <div className="w-100">
                        <div className="bg-warning rounded p-1 text-center d-flex justify-content-evenly fw-bold">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            onClick={() => handleLike(item.id)}
                          >
                            {myLike?.some(liked=> liked.recipe_id === item.id) ? (<i className="bi bi-hand-thumbs-up-fill fs-4 btn text-black"></i>) : (<i className="bi bi-hand-thumbs-up-fill fs-4 btn text-white"></i>)}
                            {item.like_count}
                          </div>
                          <Link to={`/detail-menu/${item.id}`}>
                            <div>
                              <i className="bi bi-chat-left-text-fill fs-4 btn text-white"></i>
                            </div>
                          </Link>
                          <div onClick={() => handleBookmark(item.id)}>
                            {myBookmark?.some(bookmarked=> bookmarked.recipe_id === item.id) ? (<i className="bi bi-bookmark-fill fs-4 btn text-black"></i>):(<i className="bi bi-bookmark-fill fs-4 btn text-white"></i>)}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <Link
                          to={`/update-menu/${item.id}`}
                          className="text-decoration-none"
                        >
                          <button className="px-2 py-1 border-0 bg-success rounded text-white d-flex justify-content-center align-items-center gap-2">
                            <i className="bi bi-pencil-square fs-4"></i>Edit
                          </button>
                        </Link>
                        <button
                          className="px-2 py-1 border-0 bg-danger rounded text-white d-flex justify-content-center align-items-center gap-2"
                          onClick={() => {
                            handleDeleteMenu(item.id, item.title);
                          }}
                        >
                          <i className="bi bi-trash-fill fs-4"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{color:'#EFC81A'}} className='d-flex justify-content-center align-items-center flex-column my-5'>
              <img src='/recipe.svg'/>
              <p className='fw-bold fs-3 text-center mt-5'>You haven't posted anything yet!</p>
            </div>
          )}
        </section>
        <div className="my-5 text-center fw-bold">
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3 fw-bold"
            onClick={() => goToPage(page - 1)}
          >
            Prev
          </button>
          {myMenu?.pages?.pageNow} From {myMenu?.pages?.totalPage}
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3 fw-bold"
            onClick={() => goToPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyMenu;
