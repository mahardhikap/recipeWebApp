import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarNoLogin from '../../components/NavbarNoLogin';
import Footer from '../../components/Footer';

function SearchMenu() {
  const [data, setData] = useState();
  const [sortby, setSortby] = useState('created_at');
  const [sort, setSort] = useState('ASC');
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const { title } = useParams();
  const [search, setSearch] = useState('');

  const getData = () => {
    axios
      .get(
        `http://localhost:3000/recipe/sorted?sortby=${sortby}&sort=${sort}&page=${currentPage}&limit=${limit}`
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
        .get(`http://localhost:3000/recipe/searched?search=${search}`)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getData();
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getSearchData();
  };


  useEffect(() => {
    getData();
    getSearchData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <NavbarNoLogin />
      <section className="container w-100 position-relative mt-5">
        <div className="obstacle1 position-absolute"></div>
        <div className="obstacle2 position-absolute"></div>
        <h1 className="text-purple">Discover Recipe & Delicious Food</h1>
        <div className="d-flex gap-2 flex-wrap row">
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
              <div className="row mt-5 align-items-center">
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
                <div className="col-sm-12 col-md-6 col-lg-6 pe-5">
                  <h2 key={index}>
                    <Link
                      to={`/detail-menu/${item.id}`}
                      className="text-decoration-none text-black"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <p>{item.ingredients}</p>
                  <div className="w-75">
                    <div className="bg-warning rounded p-3 text-center text-white">
                      10 Likes - 12 Comment - 3 Bookmark
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mb-5">
                    <div>
                      <img src="#GambarProfileNanti" alt="" />
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
            onClick={() => setCurrentPage(currentPage - 1)} // Kembali ke halaman sebelumnya
            disabled={currentPage <= 1} // Menonaktifkan tombol jika sudah di halaman pertama
          >
            Prev
          </button>
          Show {page?.totalData} - {page?.pageNow} From {page?.totalPage}
          <button
            className="rounded p-2 button-custom text-white border-0 bg-warning ms-3"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= page?.totalPage}
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
