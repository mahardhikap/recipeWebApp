import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import detail_menu from "./detail_menu"
import post_menu from "./post_menu"
import update_menu from "./update_menu"
import delete_menu from "./delete_menu"


const rootReducers = combineReducers({
    auth: authReducer,
    detail_menu,
    post_menu,
    update_menu,
    delete_menu
})

export default rootReducers