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