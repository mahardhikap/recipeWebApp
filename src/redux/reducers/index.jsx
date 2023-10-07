import { combineReducers } from "@reduxjs/toolkit";
import loginUser from "./loginUser";
import detail_menu from "./detail_menu"
import post_menu from "./post_menu"
import update_menu from "./update_menu"
import delete_menu from "./delete_menu"
import getSearchSort from "./getSearchSort";


const rootReducers = combineReducers({
    loginUser,
    detail_menu,
    post_menu,
    update_menu,
    delete_menu,
    getSearchSort
})

export default rootReducers