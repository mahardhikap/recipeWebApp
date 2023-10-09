import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { getDataById } from '../../../redux/actions/menu'
import NavbarNoLogin from '../../../components/NavbarNoLogin';
import NavbarCustom from '../../../components/Navbar';

function DetailMenu() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const {data: detailMenu, errorMessage, isError} = useSelector((state)=> state.detail_menu)

  const navbarDisplay = () => {
    if(!localStorage.getItem('token')) {
      return <NavbarNoLogin/>
    } else {
      return <NavbarCustom/>
    }
  }

  const getDataId = () => {
    dispatch(getDataById(id))
  };

  useEffect(() => {
    getDataId();
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
    <div>
      {navbarDisplay()}
    </div>
      <section className="container w-100">
        <div className="col-sm-12 col-md-9 col-lg-9 mx-auto">
          <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
            <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
              <div>
                <img src={detailMenu?.photo_user} alt="photo-profile" style={{width:'50px', borderRadius:'75%'}} />
              </div>
              <div>
                <div className='fw-bolder'>{detailMenu?.username}</div>
                <div className='fw-medium'>Recipes</div>
              </div>
            </div>
            <div>
              <div className='fw-bold'>{new Date(`${detailMenu?.created_at}`).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div className='fw-medium'>{detailMenu?.like_count} Like</div>
            </div>
          </div>
          <h1 className="text-center">{detailMenu?.title}</h1>
          <div className="text-center py-5">
            <img
              src={detailMenu?.photo_menu}
              alt="photo-menu"
              className="w-100"
              style={{
                // width: '500px',
                height: '400px',
                objectFit: 'cover',
                boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.5)',
                borderRadius:'10px'
              }}
            />
          </div>
          <h3>Ingredients</h3>
          <div>
          {detailMenu?.ingredients.split(',').map((sour)=>{
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

          <div className="border-top border-bottom border-5 border-warning py-1 mb-5">
            <div className="d-flex align-items-center gap-3 py-3">
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
          <div className="comment col-sm-12 col-md-12">
            <textarea
              name=""
              id=""
              className="w-100 p-3 rounded border-0 form-control bg-body-tertiary"
              placeholder="Your comment here!"
              rows={5}
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
