import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from './../../components/Alert';
import NavbarNoLogin from '../../components/NavbarNoLogin';
import Footer from '../../components/Footer';

let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkaGlrYSIsImVtYWlsIjoiZGhpa2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdWk4MzJDS1REOEhXaFhtZzNHSEgwLmhSeHBhVUR6NHkwaHpFemZieXQ0U2UvaGppU0YyenkiLCJwaG90byI6ImRlZmF1bHQucG5nIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY5MTIyMjk3M30.D7lQDroJ2j3Mi053CFP0yOe7SRf5HAzUpDYM_-kNJVI`;

function Home() {
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
  return (
    <>
      <NavbarNoLogin />
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
                  <div className="col-lg-6 col-md-6 mb-5">
                    <h2>{item.title}</h2>
                    <p>{item.ingredients}</p>
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

export default Home;
