import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './../../components/Alert';
import Footer from '../../components/Footer';
import NavbarCustom from '../../components/Navbar';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkaGlrYSIsImVtYWlsIjoiZGhpa2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdWk4MzJDS1REOEhXaFhtZzNHSEgwLmhSeHBhVUR6NHkwaHpFemZieXQ0U2UvaGppU0YyenkiLCJwaG90byI6ImRlZmF1bHQucG5nIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY5MTIyMjk3M30.D7lQDroJ2j3Mi053CFP0yOe7SRf5HAzUpDYM_-kNJVI`;

function Menu() {
  // const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [limit, setLimit] = useState(5)
  const [alertData, setAlertData] = useState({
    type: '',
    message: '',
  });
  const [recipe, setRecipeAmount] = useState(null)

  // const getData = () => {
  //   axios
  //     .get('http://localhost:3000/recipe', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/sorted?sortby=created_at&sort=DESC&page=${currentPage}&limit=${limit}`
        );
  
        const user = response.data.data[0].users_id;
        const userResponse = await axios.get(`http://localhost:3000/recipe/user/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('data response', response)
        console.log('user response', userResponse)
  
        setData(response.data.data);
        setPage(response.data.status);
        setCurrentPage(response.data.status.pageNow);
        setRecipeAmount(userResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  
    setAlertData({
      ...alertData,
      type: 'primary',
      message: 'berhasil get data',
    });
    setShowAlert(true);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAlertData({
          ...alertData,
          type: 'warning',
          message: 'berhasil hapus data',
        });
        setShowAlert(true);
        window.scrollTo(0, 0)
        history.go(0)
      })
      .catch((error) => {
        console.error(error);
        setAlertData({
          ...alertData,
          type: 'danger',
          message: error.response.data.error.message,
        });
        setShowAlert(true);
        window.scrollTo(0, 0)
        setData([]);
      });
  };

  return (
    <>
      <NavbarCustom />
      <div className="container">
        <div className="mt-4 col-lg-3 text-center">
          {showAlert && (
            <Alert type={alertData.type} message={alertData.message} />
          )}
        </div>
        <section className="container col-md-12 col-lg-9">
          <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
            <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
              <div>
                <img src="../assets/images/menu/Ellipse 128.webp" alt="" />
              </div>
              <div>
                <div>{data && data.length > 0 ? data[0].username : ''}</div>
                <div className="fw-bold">{recipe?.length} Recipes</div>
              </div>
            </div>
            <div>
              <div>{data && data.length > 0 ? data[0].created_at.split('T').shift() : ''}</div>
            </div>
          </div>
          <div className="detail-profile-menu border-bottom border-warning border-5">
            <ul className="list-unstyled d-flex gap-4 fs-3 fw-bold flex-wrap">
              <li>
                <a
                  href="#"
                  className="text-decoration-none selected"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                >
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
            {data?.map((item, index) => {
              return (
                <>
                  <div className='my-5 row align-items-center'>
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
                    <h2>{item.title} <span className="badge bg-secondary">{item.category}</span></h2>
                    <p>{item.ingredients}</p>
                    <div className="w-75">
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
                        onClick={() => deleteData(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <div className='text-center my-5'>
        <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
        Show {page?.totalData} - {page?.pageNow} From {page?.totalPage}
        <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= page?.totalPage}
          >
            Next
          </button>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
