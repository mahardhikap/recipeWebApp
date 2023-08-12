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
