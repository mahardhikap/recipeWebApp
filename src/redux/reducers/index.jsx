import { combineReducers } from "@reduxjs/toolkit";
import loginUser from "./loginUser";
import getDetailMenu from "./getDetailMenu";
import post_menu from "./post_menu"
import update_menu from "./update_menu"
import delete_menu from "./delete_menu"
import getSearchSort from "./getSearchSort";
import postComment from "./postComment";
import getComment from "./getComment";
import deleteComment from "./deleteComment";


const rootReducers = combineReducers({
    loginUser,
    getDetailMenu,
    post_menu,
    update_menu,
    delete_menu,
    getSearchSort,
    postComment,
    getComment,
    deleteComment
})

export default rootReducers