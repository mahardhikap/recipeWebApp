import { combineReducers } from "@reduxjs/toolkit";
import loginUser from "./loginUser";
import getDetailMenu from "./getDetailMenu";
import postMenu from "./postMenu"
import updateMenu from "./updateMenu"
import deleteMenu from "./deleteMenu"
import getSearchSort from "./getSearchSort";
import postComment from "./postComment";
import getComment from "./getComment";
import deleteComment from "./deleteComment";
import getMyMenu from "./getMyMenu";
import getMyBookmark from "./getMyBookmark";
import getMyLike from "./getMyLike";
import getCategory from "./getCategory";
import updateProfile from "./updateProfile";
import getUserByPayload from "./getUserByPayload";

const rootReducers = combineReducers({
    loginUser,
    getDetailMenu,
    postMenu,
    updateMenu,
    deleteMenu,
    getSearchSort,
    postComment,
    getComment,
    deleteComment,
    getMyMenu,
    getMyBookmark,
    getMyLike,
    getCategory,
    updateProfile,
    getUserByPayload
})

export default rootReducers