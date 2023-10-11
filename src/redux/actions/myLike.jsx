import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;

export const getMyLike = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_MYLIKE_PENDING' });
    const result = await axios.get(`${url}/like`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'GET_MYLIKE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_MYLIKE_FAILED' });
    console.log('error get my like', error);
  }
};

export const getLikeClean = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_MYLIKE_CLEAN' });
  } catch (err) {
    console.log('error when reset my like', err);
  }
};

export const postLike = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_LIKE_PENDING' });
    const result = await axios.post(`${url}/like/${id}`,null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_LIKE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'POST_LIKE_FAILED' });
    console.log('error post like', error);
  }
};

export const cleanLike = () => async (dispatch) => {
  try {
    dispatch({ type: 'POST_LIKE_CLEAN' });
  } catch (err) {
    console.log('error when reset like', err);
  }
};
