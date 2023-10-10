import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;

export const getMyMenu = (sortby, sort, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_MYMENU_PENDING' });
    const result = await axios.get(`${url}/menu-user?sortby=${sortby}&sort=${sort}&page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'GET_MYMENU_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_MYMENU_FAILED' });
    console.log('error get my menu', error);
  }
};
