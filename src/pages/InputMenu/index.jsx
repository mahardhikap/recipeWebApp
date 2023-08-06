import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJkaGlrYSIsImVtYWlsIjoiZGhpa2FAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdWk4MzJDS1REOEhXaFhtZzNHSEgwLmhSeHBhVUR6NHkwaHpFemZieXQ0U2UvaGppU0YyenkiLCJwaG90byI6ImRlZmF1bHQucG5nIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY5MTIyMjk3M30.D7lQDroJ2j3Mi053CFP0yOe7SRf5HAzUpDYM_-kNJVI`;

function InputMenu() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '2',
    image_url: '',
  });

  // const cropToSquare = (file, size) => {
  //   return new Promise((resolve) => {
  //     const img = new Image();
  
  //     img.onload = () => {
  //       const width = img.width;
  //       const height = img.height;
  //       const minDimension = Math.min(width, height);
  
  //       const canvas = document.createElement('canvas');
  //       canvas.width = size;
  //       canvas.height = size;
  
  //       const ctx = canvas.getContext('2d');
  
  //       // Calculate cropping position to center the image
  //       const offsetX = (width - minDimension) / 2;
  //       const offsetY = (height - minDimension) / 2;
  
  //       ctx.drawImage(img, offsetX, offsetY, minDimension, minDimension, 0, 0, size, size);
  
  //       canvas.toBlob((blob) => {
  //         resolve(new File([blob], file.name, { type: file.type }));
  //       }, file.type);
  //     };
  
  //     img.src = URL.createObjectURL(file);
  //   });
  // };
  
  
  const postData = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputData.title);
    bodyFormData.append('ingredients', inputData.ingredients);
    bodyFormData.append('category_id', inputData.category_id);
    // if (image) {
    //   const croppedImage = await cropToSquare(image, 400); // Set desired size here
    //   bodyFormData.append('image', croppedImage);
    // }
    bodyFormData.append('image', image);
    console.log(bodyFormData);

    axios
      .post('http://localhost:3000/recipe', bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/');
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
          <input
            type="text"
            name="ingredients"
            value={inputData.ingredients}
            onChange={onChange}
            className="w-100 mb-5 p-3 form-control border-2"
            placeholder="ingredients"
          />
          <input
            type="file"
            name="image"
            onChange={onChangeImage}
            className="form-control w-100 mb-3 p-3 border-2"
          />
          {image && <img src={inputData.image_url} width={250} />}
          <button
            type="submit"
            className="p-3 bg-warning w-100 rounded border-0 text-white mt-5"
          >
            Submit Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputMenu;
