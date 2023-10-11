import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getCategory, postMenu } from '../../../redux/actions/menu'
import NavbarCustom from '../../../components/Navbar';
import Swal from 'sweetalert2';
import { getMyMenu } from '../../../redux/actions/myMenu';
import { detailMenuReset } from '../../../redux/actions/menu';
// let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkLnl6QllkRDZQUlpKVHRwdHVRZHVOdTlYS3Z4eVNGZ0dxak9VbTlTVng3ejdRY3RuLnM3aU8iLCJwaG90byI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4YW8wNmFwci9pbWFnZS91cGxvYWQvdjE2OTE1MDM5MDQvcmVjaXBlL29wd2R2ZGxub3RpbzBndHU3dzFxLmpwZyIsInJvbGVzIjoiYWRtaW4iLCJpbWdfaWQiOiJyZWNpcGUvb3B3ZHZkbG5vdGlvMGd0dTd3MXEiLCJpYXQiOjE2OTE1NTQ5MDd9.Z-FNpHBr61PK7ixlcwULOV1vv1FyU6Fm4YPBgFiEhw8`;

function InputMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '2',
    photo: '',
  });
  const categories = [{id:1, name:"Appetizer"}, {id:2, name:"Main Course"}, {id:3, name:"Dessert"}];
  const {data, isError} = useSelector(state => state.postMenu)

  const postData = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('title', inputData.title);
    bodyFormData.append('ingredients', inputData.ingredients);
    bodyFormData.append('category_id', inputData.category_id);
    bodyFormData.append('photo', image);

    dispatch(postMenu(bodyFormData))
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
        photo: URL.createObjectURL(e.target.files[0]),
      });
  };

  useEffect(()=>{
    if(data){
      Swal.fire({
        icon: 'success',
        title: 'Post menu success!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate('/mymenu')
        dispatch(getMyMenu('created_at', 'DESC', 1, 4));
        dispatch(detailMenuReset())
      });
    } else if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Post menu failed!',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }, [data, isError])

  return (
    <>
    <NavbarCustom/>
    <h1 className='text-center mt-5'>Input Menu</h1>
    <div className="container">
      <div className="row col-lg-6 gap-3 mx-auto mt-5">
        <form onSubmit={postData}>
          <label
            htmlFor="file"
            style={{
              backgroundImage: `url(${image && inputData.photo})`,
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
            name="photo"
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
            {categories?.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="p-3 bg-warning w-100 rounded border-0 text-white my-5"
          >
            Submit Menu
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default InputMenu;
