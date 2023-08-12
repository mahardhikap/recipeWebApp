import axios from "axios";
let url = import.meta.env.VITE_BASE_URL

export const login = (data, navigate) => async (dispatch) => {
    try{
        dispatch({type:"AUTH_LOGIN_PENDING"})
        const result = await axios.post(`${url}/login`,data)
        localStorage.setItem("token",result.data.data.token)
        localStorage.setItem("photo",result.data.data.photo)
        localStorage.setItem("username",result.data.data.username)
        localStorage.setItem("id",result.data.data.id)
        dispatch({payload: result.data, type:"AUTH_LOGIN_SUCCESS"})
        navigate('/')
    } catch(err){
        console.log("error", err)
        dispatch({payload:err.response.data.error, type:"AUTH_LOGIN_FAILED"})
    }
}