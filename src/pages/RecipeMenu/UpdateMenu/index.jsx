import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenu, getDetailMenu } from '../../../redux/actions/menu';
import NavbarCustom from '../../../components/Navbar';

function UpdateMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const categories = [{ id: 1, name: 'Appetizer' }, { id: 2, name: 'Main Course' }, { id: 3, name: 'Dessert' }];
  const { data } = useSelector((state) => state.getDetailMenu);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '',
    photo: '',
  });

  const postData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', inputData.title);
    formData.append('ingredients', inputData.ingredients);
    formData.append('category_id', inputData.category_id);
  
    if (image) {
      console.log('kode image')
      formData.append('photo', image);
    } else if (inputData.photo) {
      console.log('kode ini dijalankan', inputData.photo);
      formData.append('photo', inputData.photo);
    }
    dispatch(updateMenu(formData, id))
  }; 

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setInputData({
        ...inputData,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    } else if (data && data.photo_menu) {
      setInputData({
        ...inputData,
        photo: data.photo_menu,
      });
    }
  };

  useEffect(() => {
    dispatch(getDetailMenu(id));
  }, []);

  useEffect(() => {
    if (data) {
      setInputData({
        title: data.title || '',
        ingredients: data.ingredients || '',
        category_id: data.category_id || '',
        photo: data.photo_menu || '',
      });
    }
  }, [data]);

  return (
    <>
      <NavbarCustom />
      <h1 className="text-center my-5">Update Menu</h1>
      <div className="container">
        <div className="row col-lg-6 gap-3 mx-auto">
          <form onSubmit={postData}>
            <label
              htmlFor="photoUpload"
              style={{
                backgroundImage: `url(${inputData.photo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '300px',
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
              id="photoUpload"
              accept="image/*"
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
            <button
              type="submit"
              className="p-3 bg-warning w-100 rounded border-0 text-white my-5"
            >
              Update Menu
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateMenu;