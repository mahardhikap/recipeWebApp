const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const updateMenu = (state=initialState,action) => {
    if(action.type === 'UPDATE_MENU_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'UPDATE_MENU_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            errorMessage:'',
            isLoading:false,
            isError:false
        }
    } else if(action.type === 'UPDATE_MENU_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else {
        return state
    }
}

export default updateMenu