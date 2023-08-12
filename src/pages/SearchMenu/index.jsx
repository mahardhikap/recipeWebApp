import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarNoLogin from '../../components/NavbarNoLogin';
import NavbarCustom from '../../components/Navbar';
import Footer from '../../components/Footer';

function SearchMenu() {
  const [data, setData] = useState();
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('ASC');
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { title } = useParams();
  const [search, setSearch] = useState('');
  let url = import.meta.env.VITE_BASE_URL
  let token = localStorage.getItem("token")

  const getData = () => {
    axios
      .get(
        `${url}/recipe/sorted?sortby=${sortby}&sort=${sort}&page=${currentPage}&limit=${limit}`
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setPage(res.data.status);
        setCurrentPage(res.data.status.pageNow);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSearchData = () => {
    if (search) {
      axios
        .get(`${url}/recipe/searched?search=${search}`)
        .then((res) => {
          console.log('ini res search', res);
          setData(res.data.data);
          setPage({
            totalData: res.data.data.length, // Update totalData jumlah hasil search
            pageNow: 1, // Reset pageNow ke 1 untuk hasil search
            totalPage: 1, // Reset totalPage ke 1 untuk hasil search
          });
        })
        .catch((error) => {
          console.error(error);
          alert('data tidak ditemukan');
        });
    } else {
      getData();
    }
  };

  const navbarDisplay = () => {
    if(!token) {
      return <NavbarNoLogin/>
    } else {
      return <NavbarCustom/>
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage);
    getSearchData();
  };

  useEffect(() => {
    getSearchData();
    getData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div>
       {navbarDisplay()}
      </div>
      <section className="container mt-5">
        <h1 className="text-purple">Discover Recipe & Delicious Food</h1>
        <div>
          <form className="row gap-3" onSubmit={handleSearchSubmit}>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <input
                type="text"
                name="search"
                placeholder="Telur Gulung"
                value={search}
                onChange={handleSearchChange}
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
        {data?.map((item, index) => {
          return (
            <>
              <div className="row mt-5 align-items-center" key={index}>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <Link
                    to={`/detail-menu/${item.id}`}
                    className="text-decoration-none text-black"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="img-thumbnail ratio ratio-1x1"
                      style={{
                        width: '500px',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <h2>
                    <Link
                      to={`/detail-menu/${item.id}`}
                      className="text-decoration-none text-black"
                    >
                      {item.title}
                    </Link>
                    <span className="badge bg-secondary">{item.category}</span>
                  </h2>
                  <p>{item.ingredients}</p>
                  <div className="w-100">
                    <div className="bg-warning rounded p-3 text-center text-white">
                      10 Likes - 12 Comment - 3 Bookmark
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                    <div>
                      <img src={item.photo} alt="" className="rounded-circle" style={{width: '40px'}}/>
                    </div>
                    <div>
                      <h4>{item.username}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
      <div className="my-5 text-center">
        <div>
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning me-3"
            onClick={() => setCurrentPage(currentPage - 1)}
            hidden={currentPage <= 1}
          >
            Prev
          </button>
          {search ? (
            <span>Show {data?.length} - 1 From 1 </span>
          ) : (
            <span>
              Show {page?.totalData} - {page?.pageNow} From {page?.totalPage}
            </span>
          )}
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3"
            onClick={() => setCurrentPage(currentPage + 1)}
            hidden={currentPage >= (search ? 1 : page?.totalPage)}
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
