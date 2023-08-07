import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './../../components/Alert';
import Footer from '../../components/Footer';
import NavbarCustom from '../../components/Navbar';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkaGlrYSIsImVtYWlsIjoiZGhpa2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdWk4MzJDS1REOEhXaFhtZzNHSEgwLmhSeHBhVUR6NHkwaHpFemZieXQ0U2UvaGppU0YyenkiLCJwaG90byI6ImRlZmF1bHQucG5nIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY5MTIyMjk3M30.D7lQDroJ2j3Mi053CFP0yOe7SRf5HAzUpDYM_-kNJVI`;

function Menu() {
  const [data, setData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    type: '',
    message: '',
  });

  const getData = () => {
    axios
      .get('http://localhost:3000/recipe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    setAlertData({
      ...alertData,
      type: 'primary',
      message: 'berhasil get data',
    });
    setShowAlert(true);
  }, []);

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        getData();
        setAlertData({
          ...alertData,
          type: 'warning',
          message: 'berhasil hapus data',
        });
        setShowAlert(true);
      })
      .catch((error) => {
        console.error(error);
        getData();
        setAlertData({
          ...alertData,
          type: 'danger',
          message: error.response.data.error.message,
        });
        setShowAlert(true);
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
        <h1>Menu</h1>
        <div>
          {data?.map((item, index) => {
            return (
              <>
                <div className="mb-5 row">
                  <div
                    key={item.id}
                    className="col-lg-6 col-md-6"
                    onClick={() => console.log(item.id)}
                  >
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
                  <div className="col-lg-6 col-md-6">
                    <h2>{item.title}</h2>
                    <p>{item.ingredients}</p>
                    <div className="d-flex gap-3 flex-wrap col-sm-12 col-lg-6 mb-5" key={index}>
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
      </div>
      <Footer />
    </>
  );
}

export default Menu;
