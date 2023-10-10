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