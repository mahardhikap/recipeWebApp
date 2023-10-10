const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError: false
}

const verifyUser = (state=initialState, action) => {
    if(action.type === 'VERIFY_PENDING'){
        return{
            ...state,
            isLoading: true,
        } 
    } else if(action.type === 'VERIFY_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            errorMessage:'',
            isLoading:false,
            isError:false
        }
    } else if(action.type === 'VERIFY_FAILED') {
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else if(action.type === 'VERIFY_CLEAN') {
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

export default verifyUser