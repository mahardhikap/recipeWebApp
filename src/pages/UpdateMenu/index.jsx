import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import { useNavigate, Link, useParams } from 'react-router-dom';


let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkaGlrYSIsImVtYWlsIjoiZGhpa2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdWk4MzJDS1REOEhXaFhtZzNHSEgwLmhSeHBhVUR6NHkwaHpFemZieXQ0U2UvaGppU0YyenkiLCJwaG90byI6ImRlZmF1bHQucG5nIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY5MTIyMjk3M30.D7lQDroJ2j3Mi053CFP0yOe7SRf5HAzUpDYM_-kNJVI`;

function UpdateMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '2',
    image_url: '',
  });

  const getData = () => {
    axios
      .get(`http://localhost:3000/recipe/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setInputData({
          ...inputData,
          title: res.data.data[0].title,
          ingredients: res.data.data[0].ingredients,
          image_url: res.data.data[0].image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(id);
    getData();
  }, []);

  const postData = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputData.title);
    bodyFormData.append('ingredients', inputData.ingredients);
    bodyFormData.append('category_id', inputData.category_id);
    bodyFormData.append('image', image);
    console.log(bodyFormData);

    axios
      .put(`http://localhost:3000/recipe/${id}`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/menu')
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        image_url: URL.createObjectURL(e.target.files[0]),
      });
  };

  return (
    <div className="container">
      <div className="row col-lg-6 gap-3 mx-auto">
        <h1>Input Menu</h1>
        <Link to={'/'}>Back</Link>
        <form onSubmit={postData}>
          <input
            type="text"
            name="title"
            value={inputData.title}
            onChange={onChange}
            className="w-100 mb-5 p-3 form-control border-2"
            placeholder="title"
          />
          <textarea
            name="ingredients"
            value={inputData.ingredients}
            onChange={onChange}
            className="w-100 mb-5 p-3 form-control border-2"
            placeholder="Ingredients"
          />
          <input
            type="file"
            name="image"
            onChange={onChangeImage}
            className="form-control w-100 mb-3 p-3 border-2"
          />
          {<img src={inputData.image_url} width={200} />}
          <button
            type="submit"
            className="p-3 bg-warning w-100 rounded border-0 text-white my-5"
          >
            Update Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMenu;
