import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import NavbarNoLogin from '../../components/NavbarNoLogin';

function DetailMenu() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [recipe, setRecipeAmount] = useState(null);

  const getDataId = () => {
    axios
      .get(`https://scary-cyan-salamander.cyclic.app/recipe/id/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
      });
  };

  const user = data?.users_id;

  const getDataByUser = async () => {
    try {
      const response = await axios.get(`https://scary-cyan-salamander.cyclic.app/recipe/user/${user}`);
      console.log('Data by user:', response);
      setRecipeAmount(response.data.data);
    } catch (error) {
      console.error('Error fetching data by user:', error);
    }
  };

  useEffect(() => {
    getDataId();
    console.log(id);
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if (data) {
      getDataByUser();
    }
  }, [data]);

  return (
    <>
    <NavbarNoLogin/>
      <section className="container w-100">
        <div className="col-sm-12 col-md-9 col-lg-9 mx-auto">
          <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
            <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
              <div>
                <img src="#" alt="" />
              </div>
              <div>
                <div>{data?.username}</div>
                <div className="fw-bold">{recipe?.length} Recipes</div>
              </div>
            </div>
            <div>
              <div>{data?.created_at.split('T').shift()}</div>
              <div>20 Likes - 2 Comments</div>
            </div>
          </div>
          <h1 className="text-center">{data?.title}</h1>
          <div className="text-center py-5">
            <img
              src={data?.image}
              alt=""
              className="w-100"
              style={{
                width: '500px',
                height: '500px',
                objectFit: 'cover'
              }}
            />
          </div>
          <h3>Ingredients</h3>
          <div>
          {data?.ingredients.split(',').map((sour)=>{
                      return (
                        <>
                          <ul>
                        <li>{sour}</li>
                      </ul>
                        </>
                      )
                    })}
          </div>

          <div className="d-flex gap-3 my-5">
            <div className="like rounded d-flex align-items-center justify-content-center">
              <img src="#" alt="" />
            </div>
            <div className="bookmark rounded d-flex align-items-center justify-content-center">
              <img src="#" alt="" />
            </div>
          </div>

          <div className="border-top border-bottom border-5 border-warning py-5 mb-5">
            <div className="d-flex align-items-center gap-3 py-5">
              <div className="d-flex align-items-center gap-1">
                <div>
                  <img src="#" alt="" />
                </div>
                <div className="border-end border-4 border-warning pe-3">
                  <div>Karen</div>
                  <div className="fw-bold">20 Recipes</div>
                </div>
              </div>
              <div>
                Wow, I just made this and it was delicious! Thanks for sharing!
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 py-5">
              <div className="d-flex align-items-center gap-1">
                <div>
                  <img src="#" alt="" />
                </div>
                <div className="border-end border-4 border-warning pe-3">
                  <div>Karen</div>
                  <div className="fw-bold">20 Recipes</div>
                </div>
              </div>
              <div>
                Wow, I just made this and it was delicious! Thanks for sharing!
              </div>
            </div>
          </div>
          <div className="comment col-sm-12 col-md-12 col-lg-9">
            <textarea
              name=""
              id=""
              className="w-100 p-3 rounded border-0 form-control"
              placeholder="Your Comment Here!"
            ></textarea>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <button className="rounded p-3 mb-5 mt-3 border-0 bg-warning text-white w-100">
              Send a comment
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailMenu;
