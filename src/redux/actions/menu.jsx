import axios from "axios";
let url = import.meta.env.VITE_BASE_URL
let headers = {
    Authorization : `Bearer ${localStorage.getItem("token")}`
}

export const getDataById = (id) => async (dispatch) => {
    try {

        dispatch({type:"DETAIL_MENU_PENDING"})
        const result = await axios.get(`${url}/recipe/id/${id}`, {headers})
        dispatch({payload:result.data.data[0], type:"DETAIL_MENU_SUCCESS"})
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
        navigate('/menu')
    } catch (err) {
        console.log('error post menu', err)
        dispatch({payload:err.response.data, type:"POST_MENU_FAILED"})
    }
}

export const updateMenu = (data, id, navigate) => async (dispatch) => {
    try {
        dispatch({type:"UPDATE_MENU_PENDING"})
        const result = await axios.put(`${url}/recipe/${id}`,data, {headers})
        dispatch({payload:result.data.data[0], type:"UPDATE_MENU_SUCCESS"})
        console.log('ini update', result)
        navigate('/menu')
    } catch (err) {
        console.log('error update menu', err)
        dispatch({payload:err.response.data, type:"UPDATE_MENU_FAILED"})
    }
}

