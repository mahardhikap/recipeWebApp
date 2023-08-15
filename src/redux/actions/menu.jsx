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
    } catch (err) {
        console.log('error get id menu', err)
        dispatch({payload:err.response.data.error, type:"DETAIL_MENU_FAILED"})
    }
}


export const postMenu = (data, navigate) => async (dispatch) => {
    try {
        dispatch({type:"POST_MENU_PENDING"})
        const result = await axios.post(`${url}/recipe`,data, {headers})
        dispatch({payload:result.data.data[0], type:"POST_MENU_SUCCESS"})
        toast.success('Post menu successfully')
        navigate('/menu')
        window.scrollTo(0, 0);
    } catch (err) {
        console.log('error post menu', err)
        toast.error('Post menu failed')
        dispatch({payload:err.response.data, type:"POST_MENU_FAILED"})
    }
}

export const updateMenu = (data, id, navigate) => async (dispatch) => {
    try {
        dispatch({type:"UPDATE_MENU_PENDING"})
        const result = await axios.put(`${url}/recipe/${id}`,data, {headers})
        dispatch({payload:result.data.data[0], type:"UPDATE_MENU_SUCCESS"})
        console.log('ini update', result)
        toast.success('Update menu successfully')
        navigate('/menu')
    } catch (err) {
        console.log('error update menu', err)
        dispatch({payload:err.response.data, type:"UPDATE_MENU_FAILED"})
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
    } catch (err) {
        console.log('error delete menu', err)
        dispatch({payload:err.response.data, type:"DELETE_MENU_FAILED"})
        toast.error('Delete menu failed')
    }
}

