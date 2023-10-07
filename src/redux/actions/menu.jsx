import axios from "axios";
let url = import.meta.env.VITE_BASE_URL
let headers = {
    Authorization : `Bearer ${localStorage.getItem("token")}`
}
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getDataById = (id) => async (dispatch) => {
    try {

        dispatch({type:"DETAIL_MENU_PENDING"})
        const result = await axios.get(`${url}/recipe/id/${id}`, {headers})
        dispatch({payload:result.data.data[0], type:"DETAIL_MENU_SUCCESS"})
        toast.success('Get detail menu successfully');
    } catch (error) {
        dispatch({payload:error.response.data.error, type:"DETAIL_MENU_FAILED"})
        console.log('error get id menu', error)
    }
}


export const postMenu = (data, navigate) => async (dispatch) => {
    try {
        dispatch({type:"POST_MENU_PENDING"})
        const result = await axios.post(`${url}/recipe`,data, {headers})
        dispatch({payload:result.data.data[0], type:"POST_MENU_SUCCESS"})
        navigate('/menu')
        window.scrollTo(0, 0);
        toast.success('Post menu successfully')
    } catch (error) {
        console.log('error post menu', error)
        dispatch({payload:error.response.data, type:"POST_MENU_FAILED"})
        toast.error('Post menu failed')
    }
}

export const updateMenu = (data, id, navigate) => async (dispatch) => {
    try {
        dispatch({type:"UPDATE_MENU_PENDING"})
        const result = await axios.put(`${url}/recipe/${id}`,data, {headers})
        dispatch({payload:result.data.data[0], type:"UPDATE_MENU_SUCCESS"})
        console.log('ini update', result)
        navigate('/menu')
        toast.success('Update menu successfully')
    } catch (error) {
        console.log('error update menu', error)
        dispatch({payload:error.response.data, type:"UPDATE_MENU_FAILED"})
        toast.error('Update menu failed')
    }
}

export const deleteMenu = (id, navigate) => async (dispatch) => {
    try {
        dispatch({type:"DELETE_MENU_PENDING"})
        const result = await axios.delete(`${url}/recipe/${id}`, {headers})
        dispatch({payload:result.data.data, type:"DELETE_MENU_SUCCESS"})
        console.log('ini delete', result)
        navigate('/menu')
        window.scrollTo(0, 0);
        toast.success('Delete menu successfully')
    } catch (error) {
        console.log('error delete menu', error)
        dispatch({payload:error.response.data, type:"DELETE_MENU_FAILED"})
        toast.error('Delete menu failed')
    }
}

export const getSearchSort = (searchby, search, sortby, sort, page, limit) => async (dispatch) => {
    try {
        dispatch({type:"GET_SEARCHSORT_PENDING"})
        const result = await axios.get(`${url}/sort-menu?searchby=${searchby}&search=${search}&sortby=${sortby}&sort=${sort}&page=${page}&limit=${limit}`)
        dispatch({payload:result.data.data, type:"GET_SEARCHSORT_SUCCESS"})
        // console.log('ini getsearchsort', result)
    } catch (error) {
        console.log('error when getsearhcsort', error)
        dispatch({payload:error.response.data, type:"GET_SEARCHSORT_FAILED"})
    }
}

