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

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_PENDING' });
    const result = await axios.put(`${url}/user`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'multipart/form-data'
        },
      });
    dispatch({ payload: result.data.data, type: 'UPDATE_PROFILE_SUCCESS' });
  } catch (error) {
    console.log('error update profile', error);
    dispatch({ payload: error.response.data, type: 'UPDATE_PROFILE_FAILED' });
  }
};

export const getUserByPayload = () => async (dispatch) => {
  try {
    dispatch({ type: 'USER_PAYLOAD_PENDING' });
    const result = await axios.get(`${url}/get-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'USER_PAYLOAD_SUCCESS' });
  } catch (error) {
    console.log('error get user by payload', error);
    dispatch({ payload: error.response.data, type: 'USER_PAYLOAD_FAILED' });
  }
};