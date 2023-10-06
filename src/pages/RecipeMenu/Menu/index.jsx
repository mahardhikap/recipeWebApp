import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import NavbarCustom from '../../../components/Navbar';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenu } from '../../../redux/actions/menu';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipeAmount, setRecipeAmount] = useState(null);
  let url = import.meta.env.VITE_BASE_URL;
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalVisibility, setModalVisibility] = useState({});

  const handleClose = () => setModalVisibility({});
  const handleShow = (item) => {
    setItemToDelete(item);
    setModalVisibility({ [item.id]: true });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteMenu(itemToDelete.id, navigate));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}/recipe/sorteduser/recipe?users_id=${parseInt(
          localStorage.getItem('id')
        )}&limit=5&page=${currentPage}&sort=DESC&sortby=created_at`
      );

      const user = parseInt(localStorage.getItem('id'));
      const userResponse = await axios.get(`${url}/recipe/user/${user}`);
      if (response) {
        toast.success('Getting data', { toastId: "1" });
      }

      setData(response.data.data);
      setPage(response.data.status);
      setCurrentPage(response.data.status.pageNow);
      setRecipeAmount(userResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [currentPage]);

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
                <div>
                  {localStorage.getItem('username')}
                  <span className="badge rounded-pill bg-danger">
                    {localStorage.getItem('roles')}
                  </span>
                </div>
                <div className="fw-bold">{recipeAmount?.length} Recipes</div>
              </div>
            </div>
            <div>
              <div>
                {Data && Data.length > 0
                  ? Data[0].created_at.split('T').shift()
                  : ''}
              </div>
            </div>
          </div>
          <div className="detail-profile-menu border-bottom border-warning border-5">
            <ul className="list-unstyled d-flex gap-4 fs-3 fw-bold flex-wrap">
              <li>
                <a href="#" className="text-decoration-none selected">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Bookmarked
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Liked
                </a>
              </li>
            </ul>
          </div>

          <div>
            {Data?.map((item, index) => {
              return (
                <>
                  <div className="my-5 row align-items-center" key={index}>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <img
                        src={item.image}
                        className="img-thumbnail ratio ratio-1x1"
                        style={{
                          width: '500px',
                          height: '300px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <h2>
                        {item.title}{' '}
                        <span className="badge bg-secondary">
                          {item.category}
                        </span>
                      </h2>
                      <p>{item.ingredients}</p>
                      <div className="w-100">
                        <div className="bg-warning rounded p-3 text-center text-white">
                          10 Likes - 12 Comment - 3 Bookmark
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                        <Link to={`/update-menu/${item.id}`} className="w-100">
                          <button className="p-3 border-0 bg-success rounded text-white w-100">
                            Update
                          </button>
                        </Link>
                        <button
                          className="p-3 border-0 bg-danger rounded text-white w-100"
                          onClick={() => handleShow(item)}
                        >
                          Delete
                        </button>
                        <div>
                          <Modal
                            show={modalVisibility[item.id]}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete</Modal.Title>
                            </Modal.Header>
                            {itemToDelete && (
                              <Modal.Body>
                                Do you wanna delete{' '}
                                <strong>{itemToDelete.title}</strong>?
                              </Modal.Body>
                            )}
                            <Modal.Footer>
                              <Button
                                variant="warning w-100 text-white"
                                onClick={() => {
                                  if (itemToDelete) {
                                    handleDelete();
                                    handleClose();
                                  }
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                variant="secondary w-100"
                                onClick={handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <div className="text-center my-5">
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3"
            onClick={() => setCurrentPage(currentPage - 1)}
            hidden={currentPage <= 1}
          >
            Prev
          </button>
          Show {page?.totalData} - {page?.pageNow} From {page?.totalPage}
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3"
            onClick={() => setCurrentPage(currentPage + 1)}
            hidden={currentPage >= page?.totalPage}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default Menu;
