import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;
let headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getDetailMenu = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DETAIL_MENU_PENDING' });
    const result = await axios.get(`${url}/menu/${id}`);
    dispatch({ payload: result.data.data, type: 'DETAIL_MENU_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'DETAIL_MENU_FAILED' });
    console.log('error get id menu', error);
  }
};

export const detailMenuReset = () => async (dispatch) => {
  try {
    dispatch({ type: 'DETAIL_MENU_RESET' });
  } catch (err) {
    console.log('error when reset detail menu', err);
  }
};

export const postMenu = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_MENU_PENDING' });
    const result = await axios.post(`${url}/menu`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_MENU_SUCCESS' });
  } catch (error) {
    console.log('error post menu', error);
    dispatch({ payload: error.response.data, type: 'POST_MENU_FAILED' });
    toast.error('post menu failed');
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_CATEGORY_PENDING' });
    const result = await axios.get(`${url}/category`);
    dispatch({ payload: result.data.data, type: 'GET_CATEGORY_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_CATEGORY_FAILED' });
    console.log('error get category', error);
  }
};

export const updateMenu = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_MENU_PENDING' });
    const result = await axios.put(`${url}/menu/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'multipart/form-data'
        },
      });
    dispatch({ payload: result.data.data, type: 'UPDATE_MENU_SUCCESS' });
  } catch (error) {
    console.log('error update menu', error);
    dispatch({ payload: error.response.data, type: 'UPDATE_MENU_FAILED' });
  }
};

export const updateMenuClean = () => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_MENU_CLEAN' });
  } catch (err) {
    console.log('error when reset update menu', err);
  }
};

export const deleteMenu = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_MENU_PENDING' });
    const result = await axios.delete(`${url}/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'DELETE_MENU_SUCCESS' });
  } catch (error) {
    console.log('error delete menu', error);
    dispatch({ payload: error.response.data, type: 'DELETE_MENU_FAILED' });
  }
};

export const getSearchSort =
  (searchby, search, sortby, sort, page, limit) => async (dispatch) => {
    try {
      dispatch({ type: 'GET_SEARCHSORT_PENDING' });
      const result = await axios.get(
        `${url}/sort-menu?searchby=${searchby}&search=${search}&sortby=${sortby}&sort=${sort}&page=${page}&limit=${limit}`
      );
      dispatch({ payload: result.data.data, type: 'GET_SEARCHSORT_SUCCESS' });
      // console.log('ini getsearchsort', result)
    } catch (error) {
      console.log('error when getsearhcsort', error);
      dispatch({ payload: error.response.data, type: 'GET_SEARCHSORT_FAILED' });
    }
  };
