import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkLnl6QllkRDZQUlpKVHRwdHVRZHVOdTlYS3Z4eVNGZ0dxak9VbTlTVng3ejdRY3RuLnM3aU8iLCJwaG90byI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4YW8wNmFwci9pbWFnZS91cGxvYWQvdjE2OTE1MDM5MDQvcmVjaXBlL29wd2R2ZGxub3RpbzBndHU3dzFxLmpwZyIsInJvbGVzIjoiYWRtaW4iLCJpbWdfaWQiOiJyZWNpcGUvb3B3ZHZkbG5vdGlvMGd0dTd3MXEiLCJpYXQiOjE2OTE1NTQ5MDd9.Z-FNpHBr61PK7ixlcwULOV1vv1FyU6Fm4YPBgFiEhw8`;

function InputMenu() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '2',
    image_url: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const postData = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputData.title);
    bodyFormData.append('ingredients', inputData.ingredients);
    bodyFormData.append('category_id', inputData.category_id);
    bodyFormData.append('image', image);
    console.log(bodyFormData);

    axios
      .post('https://scary-cyan-salamander.cyclic.app/recipe', bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/menu');
      })
      .catch((error) => {
        console.error('axios error', error);
        setLoading(false);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        image_url: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(() => {
    axios
      .get('https://scary-cyan-salamander.cyclic.app/category', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
        console.log('respon category', res); // Menyimpan daftar kategori dari respons server
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row col-lg-6 gap-3 mx-auto">
        <h1>Input Menu</h1>
        <Link to={'/menu'}>Back</Link>
        <form onSubmit={postData}>
          <label
            htmlFor="file"
            style={{
              backgroundImage: `url(${image && inputData.image_url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '300px',
              // border: "2px solid grey",
            }}
            className="w-100 d-flex justify-content-center align-items-center rounded border border-2 mb-5"
          >
            Add Image
          </label>
          <input
            className="d-none"
            type="file"
            onChange={onChangeImage}
            name="image"
            id="file"
          />
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
            rows={5}
            className="w-100 mb-5 p-3 form-control border-2"
            placeholder="Ingredients"
          />
          <select
            name="category_id"
            value={inputData.category_id}
            onChange={onChange}
            className="w-100 mb-5 p-3 form-control border-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <input
            type="file"
            name="image"
            onChange={onChangeImage}
            className="form-control w-100 mb-3 p-3 border-2"
          />
          {image && <img src={inputData.image_url} width={250} />} */}
          <button
            type="submit"
            className="p-3 bg-warning w-100 rounded border-0 text-white mt-5"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Menu'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputMenu;
