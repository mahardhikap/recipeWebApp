import axios from "axios";
let url = import.meta.env.VITE_BASE_URL

export const postComment = (id, text) => async (dispatch) => {
    try {
        dispatch({type:"POST_COMMENT_PENDING"})
        const result = await axios.post(`${url}/comment/${id}`, text, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`,
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        dispatch({payload:result.data.data, type:"POST_COMMENT_SUCCESS"})
    } catch (error) {
        console.log('error post comment', error)
        dispatch({payload:error.response.data, type:"POST_COMMENT_FAILED"})
    }
}

export const getComment = (id) => async (dispatch) => {
    try {
        dispatch({type:"GET_COMMENT_PENDING"})
        const result = await axios.get(`${url}/comment/${id}`)
        dispatch({payload:result.data.data, type:"GET_COMMENT_SUCCESS"})
    } catch (error) {
        console.log('error get comment', error)
        dispatch({payload:error.response.data, type:"GET_COMMENT_FAILED"})
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try {
        dispatch({type:"DELETE_COMMENT_PENDING"})
        const result = await axios.delete(`${url}/comment/${id}`, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            }
        })
        dispatch({payload:result.data.data, type:"DELETE_COMMENT_SUCCESS"})
    } catch (error) {
        console.log('Error when delete comment!', error)
        dispatch({payload:error.response.data, type:"DELETE_COMMENT_FAILED"})
    }
}

export const commentStatusReset = () => async (dispatch) => {
    try {
      dispatch({ type: 'COMMENT_STATUS_RESET' });
    } catch (err) {
      console.log('error when reset status comment', err);
    }
  };
