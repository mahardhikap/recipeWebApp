import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
let url = import.meta.env.VITE_BASE_URL

export const login = (data, navigate) => async (dispatch) => {
    try{
        dispatch({type:"AUTH_LOGIN_PENDING"})
        const result = await axios.post(`${url}/login`,data)
        localStorage.setItem("token",result.data.data.token)
        localStorage.setItem("photo",result.data.data.photo)
        localStorage.setItem("username",result.data.data.username)
        localStorage.setItem("id",result.data.data.id)
        localStorage.setItem("roles",result.data.data.roles)
        toast.success('Login success!');
        dispatch({payload: result.data, type:"AUTH_LOGIN_SUCCESS"})
        setTimeout(()=>{
            navigate('/')
            window.location.reload();
        }, 2000)
    } catch(err){
        console.log("error", err)
        dispatch({payload:err.response.data.error, type:"AUTH_LOGIN_FAILED"})
        toast.error(err.response.data.error.message)
    }
}