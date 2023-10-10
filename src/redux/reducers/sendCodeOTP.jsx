const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const sendCodeOTP = (state=initialState,action) => {
    if(action.type === 'SEND_OTP_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'SEND_OTP_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            isLoading:false,
            errorMessage:'',
            isError:false
        }
    } else if(action.type === 'SEND_OTP_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else if(action.type === 'SEND_OTP_CLEAN'){
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

export default sendCodeOTP