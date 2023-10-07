import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarNoLogin from '../../../components/NavbarNoLogin';
import NavbarCustom from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getSearchSort } from '../../../redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux';

function SearchMenu() {
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.getSearchSort)
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('ASC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState('');
  const [searchby, setSearchby] = useState('title');
  let token = localStorage.getItem("token")

  const getData = () => {
    dispatch(getSearchSort(searchby, search, sortby, sort, page, limit))
  };

  const navbarDisplay = () => {
    if(!token) {
      return <NavbarNoLogin/>
    } else {
      return <NavbarCustom/>
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div>
       {navbarDisplay()}
      </div>
      
      <section className="container mt-5">
      {/* {showAlert && (
        <div className="alert alert-danger">Data tidak ditemukan</div>
      )} */}
        <h1 className="text-purple">Discover Recipe & Delicious Food</h1>
        <div>
          <form className="row gap-3">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <input
                type="text"
                name="search"
                placeholder="Telur Gulung"
                className="p-3 rounded bg-body-secondary border-0 w-100 form-control"
              />
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
              <button
                type="submit"
                className="rounded p-3 border-0 text-white w-100 button-custom bg-warning"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className='change-limit d-flex gap-2 my-2 flex-wrap'>
          <div>Show</div>
          <select name="limit" id="lmt" className='border-0 bg-warning rounded'>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="1000">All</option>
          </select>
          <div>Search By</div>
          <select name="searchby" id="sby" className='border-0 bg-warning rounded'>
            <option value="username">Username</option>
            <option value="title">Title</option>
            <option value="ingredients">Ingredients</option>
            <option value="category.name">Category</option>
          </select>
          <div>Order</div>
          <select name="order" id="ord" className='border-0 bg-warning rounded'>
            <option value="ASC">A-Z</option>
            <option value="DESC">Z-A</option>
          </select>
          <div>Order By</div>
          <select name="orderby" id="oby" className='border-0 bg-warning rounded'>
            <option value="created_at">Created</option>
            <option value="title">Title</option>
            <option value="username">Username</option>
          </select>
        </div>
        <div className="mt-3 d-flex gap-3 flex-wrap">
          <button className="rounded p-1 border-0 text-white bg-warning">
            New
          </button>
          <button className="rounded p-1 border-0 text-white bg-warning">
            Popular
          </button>
          <button className="rounded p-1 border-0 text-white bg-success">
            Vegetarian
          </button>
          <button className="rounded p-1 border-0 text-white bg-success">
            Breakfast
          </button>
        </div>
              <div className="row mt-5 align-items-center">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <Link
                    to={`/detail-menu/#`}
                    className="text-decoration-none text-black"
                  >
                    <img
                      src={"https://res.cloudinary.com/dxao06apr/image/upload/v1696471086/recipev2/v3yf7xsw0maq2cxfifqc.jpg"}
                      alt=""
                      className="img-thumbnail ratio ratio-1x1"
                      style={{
                        width: '400px',
                        height: '400px',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <h2>
                    <Link
                      to={`/detail-menu/#`}
                      className="text-decoration-none text-black"
                    >
                      Resep Siomay
                    </Link>
                  </h2>
                  <p className="badge bg-secondary fs-5">Appetizer</p>
                  <div className="w-100">
                    <div className="bg-warning rounded p-3 text-center text-white">
                      10 Likes - 12 Comment - 3 Bookmark
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                    <div>
                      <img src={"https://i.ibb.co/M2JSRmW/noimage.png"} alt="" className="rounded-circle" style={{width: '40px'}}/>
                    </div>
                    <div>
                      <h4>Nama User</h4>
                    </div>
                  </div>
                </div>
              </div>
      </section>
      <div className="my-5 text-center">
        <div>
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3"
          >
            Prev
          </button>
          1 From 1
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchMenu;
