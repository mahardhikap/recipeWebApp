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
  } catch (error) {
    console.log('error when login', error);
    dispatch({ payload: error.response.data, type: 'AUTH_LOGIN_FAILED' });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username')
    localStorage.removeItem('photo')
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

export const cleanUpdateProfile = () => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_CLEAN' });
  } catch (err) {
    console.log('error when clean update profile', err);
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

export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_PENDING' });
    const result = await axios.post(`${url}/register`, data, {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    dispatch({ payload: result.data, type: 'REGISTER_SUCCESS' });
  } catch (error) {
    console.log('error when register', error);
    dispatch({ payload: error.response.data, type: 'REGISTER_FAILED' });
  }
};

export const cleanRegisterUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_CLEAN' });
  } catch (err) {
    console.log('error when clean register', err);
  }
};

export const verifyUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'VERIFY_PENDING' });
    const result = await axios.get(`${url}/verify/${id}`);
    dispatch({ payload: result.data, type: 'VERIFY_SUCCESS' });
  } catch (error) {
    console.log('error when verify', error);
    dispatch({ payload: error.response.data, type: 'VERIFY_FAILED' });
  }
};

export const cleanVerify = () => async (dispatch) => {
  try {
    dispatch({ type: 'VERIFY_CLEAN' });
  } catch (err) {
    console.log('error when clean verify', err);
  }
};

export const sendCodeOTP = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'SEND_OTP_PENDING' });
    const result = await axios.post(`${url}/forget/${email}`);
    dispatch({ payload: result.data, type: 'SEND_OTP_SUCCESS' });
  } catch (error) {
    console.log('error when send OTP', error);
    dispatch({ payload: error.response.data, type: 'SEND_OTP_FAILED' });
  }
};

export const cleanSendOTP = () => async (dispatch) => {
  try {
    dispatch({ type: 'SEND_OTP_CLEAN' });
  } catch (err) {
    console.log('error when clean send OTP', err);
  }
};

export const changePasswordOTP = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'CHANGE_PASSOTP_PENDING' });
    const result = await axios.put(`${url}/forget`, data);
    dispatch({ payload: result.data, type: 'CHANGE_PASSOTP_SUCCESS' });
  } catch (error) {
    console.log('error when send OTP', error);
    dispatch({ payload: error.response.data, type: 'CHANGE_PASSOTP_FAILED' });
  }
};

export const cleanChangePasswordOTP = () => async (dispatch) => {
  try {
    dispatch({ type: 'CHANGE_PASSOTP_CLEAN' });
  } catch (err) {
    console.log('error when clean change pass otp', err);
  }
};