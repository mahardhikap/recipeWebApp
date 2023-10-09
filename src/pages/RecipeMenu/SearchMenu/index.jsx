import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarNoLogin from '../../../components/NavbarNoLogin';
import NavbarCustom from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getSearchSort } from '../../../redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function SearchMenu() {
  const dispatch = useDispatch()
  const {data, isError, errorMessage} = useSelector(state => state.getSearchSort)
  const [sortby, setSortby] = useState('title');
  const [sort, setSort] = useState('ASC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState('');
  const [searchby, setSearchby] = useState('title');
  let token = localStorage.getItem("token")

  const [buttonStates, setButtonStates] = useState({
    'New': false,
    'Appetizer': false,
    'Main Course': false,
    'Dessert': false,
  });

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

  const onChangeSearchBy = (e) => {
    setSearchby(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeSortBy = (e) => {
    setSortby(e.target.value);
  };

  const onChangeSort = (e) => {
    setSort(e.target.value);
  };

  const onChangeLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleNewMenu = () => {
    setSortby('created_at');
    setSort('DESC');
    setSearch('')
    setSearchby('title')
    setPage(1);
    setButtonStates({
      'New': true,
      'Appetizer': false,
      'Main Course': false,
      'Dessert': false,
    });
    getData();
    // Swal.fire('Change to data new upload menu?').then(()=>getData())
  };
  const handleAppetizer = () => {
    setSearch('Appetizer')
    setSearchby('category.name')
    setSortby('created_at');
    setSort('DESC');
    setPage(1);
    setButtonStates({
      'New': false,
      'Appetizer': true,
      'Main Course': false,
      'Dessert': false,
    });
    getData();
  };
  const handleMainCourse = () => {
    setSearch('Main Course')
    setSearchby('category.name')
    setSortby('created_at');
    setSort('DESC');
    setPage(1);
    setButtonStates({
      'New': false,
      'Appetizer': false,
      'Main Course': true,
      'Dessert': false,
    });
    getData();
  };
  const handleDessert = () => {
    setSearch('Dessert')
    setSearchby('category.name')
    setSortby('created_at');
    setSort('DESC');
    setPage(1);
    setButtonStates({
      'New': false,
      'Appetizer': false,
      'Main Course': false,
      'Dessert': true,
    });
    getData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    getData();
  };

  const goToPage = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= data?.pages.totalPage) {
      setPage(pageNumber);
    }
  };

  useEffect(()=>{
    getData()
  },[page, limit])

  return (
    <>
      <div>
       {navbarDisplay()}
      </div>
      
      <section className="container mt-5">
        <h1 className="text-purple">Discover Recipe & Delicious Food</h1>
        <div>
          <form className="row gap-3" onSubmit={handleSubmit}>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <input
                type="text"
                name="search"
                placeholder="Search any..."
                className="p-3 rounded bg-body-secondary border-0 w-100 form-control"
                onChange={onChangeSearch}
                value={search}
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
        <div className='d-flex gap-2 my-2 flex-wrap'>
          <div  className='border-0 bg-warning rounded d-flex p-2 gap-2 text-white'>
            <div>Show</div>
            <select name="limit" id="lmt" className='bg-transparent border-2 rounded text-white border-white' onInput={onChangeLimit} value={limit}>
              <option value="2" className='bg-warning'>2</option>
              <option value="4" className='bg-warning'>4</option>
              <option value="8" className='bg-warning'>8</option>
            </select>
          </div>
          <div className='border-0 bg-warning rounded d-flex p-2 gap-2 text-white'>
            <div>Search By</div>
            <select name="searchby" id="sby" className='bg-transparent border-2 rounded text-white border-white' onInput={onChangeSearchBy} value={searchby}>
              <option value="username" className='bg-warning'>Username</option>
              <option value="title" className='bg-warning'>Title</option>
              <option value="category.name" className='bg-warning'>Category</option>
            </select>
          </div>
          <div className='border-0 bg-warning rounded d-flex p-2 gap-2 text-white'>
            <div>Order</div>
            <select name="order" id="ord" className='bg-transparent border-2 rounded text-white border-white' onInput={onChangeSort} value={sort}>
              <option value="ASC" className='bg-warning'>A-Z</option>
              <option value="DESC" className='bg-warning'>Z-A</option>
            </select>
          </div>
          <div className='border-0 bg-warning rounded d-flex p-2 gap-2 text-white'>
            <div>Order By</div>
            <select name="orderby" id="oby" className='bg-transparent border-2 rounded text-white border-white' onInput={onChangeSortBy} value={sortby}>
              <option value="created_at" className='bg-warning'>Created</option>
              <option value="title" className='bg-warning'>Title</option>
              <option value="username" className='bg-warning'>Username</option>
            </select>
          </div>
        </div>
        <div className="mt-3 d-flex gap-3 flex-wrap">
        <button
            className="rounded px-3 py-2 border-0 text-white"
            style={
              buttonStates.New
                ? { backgroundColor: '#00E092' }
                : { backgroundColor: '#EFC81A' }
            }
            onClick={handleNewMenu}
          >
            New
          </button>
          <button
            className="rounded px-3 py-2 border-0 text-white"
            style={
              buttonStates.Appetizer
                ? { backgroundColor: '#00E092' }
                : { backgroundColor: '#EFC81A' }
            }
            onClick={handleAppetizer}
          >
            Appetizer
          </button>
          <button
            className="rounded px-3 py-2 border-0 text-white"
            style={
              buttonStates['Main Course']
                ? { backgroundColor: '#00E092' }
                : { backgroundColor: '#EFC81A' }
            }
            onClick={handleMainCourse}
          >
            Main Course
          </button>
          <button
            className="rounded px-3 py-2 border-0 text-white"
            style={
              buttonStates.Dessert
                ? { backgroundColor: '#00E092' }
                : { backgroundColor: '#EFC81A' }
            }
            onClick={handleDessert}
          >
            Dessert
          </button>
        </div>
        {data?.rows?.map((item, index) =>{
          return(
              <div className="row mt-5 align-items-center" key={index}>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <Link
                    to={`/detail-menu/${item.id}`}
                    className="text-decoration-none text-black"
                  >
                    <img
                      src={item.photo_menu}
                      alt="photo-menu"
                      className="img-thumbnail ratio ratio-1x1"
                      style={{
                        // width: '300px',
                        height: '340px',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <h2>
                    <Link
                      to={`/detail-menu/${item.id}`}
                      className="text-decoration-none text-black"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p className="badge bg-secondary fs-5">{item.category}</p>
                  <div className="w-100">
                    <div className="bg-warning rounded p-1 text-center d-flex justify-content-evenly fw-bold">
                      <div className='d-flex justify-content-center align-items-center text-white'>
                        <i className="bi bi-hand-thumbs-up-fill fs-4 btn text-white"></i>
                        {item.like_count}
                      </div>
                      <div>
                        <i className="bi bi-chat-left-text-fill fs-4 btn text-white"></i>
                      </div>
                      <div>
                        <i className="bi bi-bookmark-fill fs-4 btn text-white"></i>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                    <div>
                      <img src={item.photo_user} alt="photo-user" className="rounded-circle" style={{width: '40px'}}/>
                    </div>
                    <div>
                      <h4>{item.username}</h4>
                    </div>
                  </div>
                </div>
              </div>
          )
        })}
      </section>
      <div className="my-5 text-center fw-bold">
        <div>
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3 fw-bold"
            onClick={()=> goToPage(page - 1)}
          >
            Prev
          </button>
          {data?.pages?.pageNow} From {data?.pages?.totalPage}
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3 fw-bold"
            onClick={()=> goToPage(page + 1)}
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
