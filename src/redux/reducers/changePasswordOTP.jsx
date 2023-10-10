const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const changePasswordOTP = (state=initialState,action) => {
    if(action.type === 'CHANGE_PASSOTP_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'CHANGE_PASSOTP_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            isLoading:false,
            errorMessage:'',
            isError:false
        }
    } else if(action.type === 'CHANGE_PASSOTP_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else if(action.type === 'CHANGE_PASSOTP_CLEAN'){
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

export default changePasswordOTP