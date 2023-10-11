import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;

export const getMyBookmark = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_MYBOOKMARK_PENDING' });
    const result = await axios.get(`${url}/bookmark`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'GET_MYBOOKMARK_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_MYBOOKMARK_FAILED' });
    console.log('error get my bookmark', error);
  }
};

export const getBookmarkClean = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_MYBOOKMARK_CLEAN' });
  } catch (err) {
    console.log('error when reset my bookmark', err);
  }
};

export const postBookmark = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_BOOKMARK_PENDING' });
    const result = await axios.post(`${url}/bookmark/${id}`,null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_BOOKMARK_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'POST_BOOKMARK_FAILED' });
    console.log('error post bookmark', error);
  }
};

export const cleanBookmark = () => async (dispatch) => {
  try {
    dispatch({ type: 'POST_BOOKMARK_CLEAN' });
  } catch (err) {
    console.log('error when reset bookmark', err);
  }
};