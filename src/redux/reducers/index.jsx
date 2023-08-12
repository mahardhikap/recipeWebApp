import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import detail_menu from "./detail_menu"


const rootReducers = combineReducers({
    auth: authReducer,
    detail_menu
})

export default rootReducers