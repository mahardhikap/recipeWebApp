import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOGIN_PENDING' });
    const result = await axios.post(`${url}/login`, data);
    localStorage.setItem('token', result.data.data.token);
    localStorage.setItem('id', result.data.data.id);
    localStorage.setItem('username', result.data.data.username);
    localStorage.setItem('photo', result.data.data.photo);
    // localStorage.setItem('roles', result.data.data.roles);
    dispatch({ payload: result.data, type: 'AUTH_LOGIN_SUCCESS' });
  } catch (err) {
    console.log('error', err);
    dispatch({ payload: err.response.data, type: 'AUTH_LOGIN_FAILED' });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    // localStorage.removeItem('roles');
    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (err) {
    console.log('error when logout', err);
  }
};
