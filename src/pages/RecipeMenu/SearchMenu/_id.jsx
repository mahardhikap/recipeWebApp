import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMenu, detailMenuReset } from '../../../redux/actions/menu';
import {
  postComment,
  getComment,
  deleteComment,
  commentStatusReset
} from '../../../redux/actions/comment';
import NavbarNoLogin from '../../../components/NavbarNoLogin';
import NavbarCustom from '../../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function DetailMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: detailMenu,
    errorMessage,
    isError,
  } = useSelector((state) => state.getDetailMenu);

  const { data: listComment } = useSelector((state) => state.getComment);
  const { isError: postCommentError, data: postCommentData } = useSelector(
    (state) => state.postComment
  );
  const [inputComment, setInputComment] = useState({
    text: '',
  });

  const navbarDisplay = () => {
    if (!localStorage.getItem('token')) {
      return <NavbarNoLogin />;
    } else {
      return <NavbarCustom />;
    }
  };

  const getDetailMenuById = () => {
    dispatch(getDetailMenu(id));
  };

  const getListComment = () => {
    dispatch(getComment(id));
  };

  const handlePostComment = () => {
    dispatch(postComment(id, inputComment)).then(() => {
      dispatch(getComment(id));
    });
  };

  const handleDeleteComment = (idComment) => {
    Swal.fire({
      title: 'Do you want to delete this comment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(idComment));
        Swal.fire('Delete success!', '', 'success').then(() => {
          dispatch(getComment(id));
        });
      } else {
        Swal.close();
      }
    });
  };

  const onChangeComment = (e) => {
    setInputComment({ ...inputComment, [e.target.name]: e.target.value });
  };
  console.log('isi comment', inputComment);

  useEffect(() => {
    if (isError) {
      Swal.fire(`${errorMessage?.message}`, '', 'error').then(() => {
        navigate('/search-menu');
        dispatch(detailMenuReset());
      });
    }
    getDetailMenuById();
    getListComment();
    window.scrollTo(0, 0);
  }, [isError]);

  useEffect(()=>{
    if (postCommentError) {
      Swal.fire({
        icon: 'error',
        title: 'Login first!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navigate('/login');
        dispatch(commentStatusReset())
      });
    } else if (postCommentData) {
      Swal.fire({
        icon: 'success',
        title: 'Comment added!',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        dispatch(commentStatusReset())
      });
    }
  },[postCommentData, postCommentError])

  return (
    <>
      <div>{navbarDisplay()}</div>
      <section className="container w-100">
        <div className="col-sm-12 col-md-9 col-lg-9 mx-auto">
          <div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
            <div className="d-flex align-items-center gap-3 border-start border-warning border-4 ps-2">
              <div>
                <img
                  src={detailMenu?.photo_user}
                  alt="photo-profile"
                  style={{ width: '50px', borderRadius: '75%' }}
                />
              </div>
              <div>
                <div className="fw-bolder">{detailMenu?.username}</div>
                <div className="fw-medium">Recipes</div>
              </div>
            </div>
            <div>
              <div className="fw-bold">
                {new Date(`${detailMenu?.created_at}`).toLocaleDateString(
                  'id-ID',
                  {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </div>
              <div className="fw-medium">{detailMenu?.like_count} Like</div>
            </div>
          </div>
          <h1 className="text-center">{detailMenu?.title}</h1>
          <div className="text-center py-5">
            <img
              src={detailMenu?.photo_menu}
              alt="photo-menu"
              className="w-100 img-thumbnail"
              style={{
                maxHeight: '500px',
                objectFit: 'cover',
                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
              }}
            />
          </div>
          <h3>Ingredients</h3>
          {detailMenu?.ingredients.split(',').map((sour, index) => {
            return (
              <div key={index}>
                <ul className="m-0">
                  <li>{sour}</li>
                </ul>
              </div>
            );
          })}

          <div className="d-flex gap-3 my-5">
            <div className="like rounded d-flex align-items-center justify-content-center">
              <img src="#" alt="" />
            </div>
            <div className="bookmark rounded d-flex align-items-center justify-content-center">
              <img src="#" alt="" />
            </div>
          </div>

          <div className="border-top border-bottom border-5 border-warning py-1 mb-5">
            {listComment ? (
              listComment?.map((comment, index) => {
                const isCurrentUserComment =
                  parseInt(comment.user_id) ===
                  parseInt(localStorage.getItem('id'));
                return (
                  <div
                    className="d-flex align-items-center gap-3 py-3"
                    key={index}
                  >
                    <div className="d-flex align-items-center gap-1">
                      <div>
                        <img
                          src={comment.photo}
                          alt="comment-photo-user"
                          className="rounded-circle"
                          style={{ width: '50px' }}
                        />
                      </div>
                      <div className="border-end border-4 border-warning pe-3">
                        <div className="fw-bold">{comment.username}</div>
                        {/* <div className="fw-bold">{comment.user_id} - {localStorage.getItem('id')}</div> */}
                      </div>
                    </div>
                    <div>{comment.text}</div>
                    <div>
                      {isCurrentUserComment ? (
                        <i
                          className="bi bi-trash-fill"
                          onClick={() => handleDeleteComment(comment.id)}
                          style={{ cursor: 'pointer', color: 'red' }}
                        >
                          Delete
                        </i>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-3">
                <p className="fw-bold">No comment here!</p>
              </div>
            )}
          </div>
          <div className="comment col-sm-12 col-md-12">
            <textarea
              name="text"
              onChange={onChangeComment}
              value={inputComment.text}
              id="text"
              className="w-100 p-3 rounded border-0 form-control bg-body-tertiary"
              placeholder="Your comment here!"
              rows={5}
            ></textarea>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <button
              className="rounded p-3 mb-5 mt-3 border-0 bg-warning text-white w-100"
              onClick={() => handlePostComment()}
            >
              Send a comment
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailMenu;
