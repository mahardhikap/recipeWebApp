import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import detail_menu from "./detail_menu"
import post_menu from "./post_menu"


const rootReducers = combineReducers({
    auth: authReducer,
    detail_menu,
    post_menu
})

export default rootReducers