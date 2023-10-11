const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError: false
}

const registerUser = (state=initialState, action) => {
    if(action.type === 'REGISTER_PENDING'){
        return{
            ...state,
            isLoading: true,
        } 
    } else if(action.type === 'REGISTER_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            errorMessage:'',
            isLoading:false,
            isError:false
        }
    } else if(action.type === 'REGISTER_FAILED') {
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else if(action.type === 'REGISTER_CLEAN') {
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

export default registerUser