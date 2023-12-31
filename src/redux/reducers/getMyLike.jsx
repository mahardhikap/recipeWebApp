const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const getMyLike = (state=initialState,action) => {
    if(action.type === 'GET_MYLIKE_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'GET_MYLIKE_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            isLoading:false,
            errorMessage:'',
            isError:false
        }
    } else if(action.type === 'GET_MYLIKE_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else if(action.type === 'GET_MYLIKE_CLEAN'){
        return{
            ...state,
            data:null,
            errorMessage:'',
            isLoading:false,
            isError:false
        }
    } else {
        return state
    }
}

export default getMyLike