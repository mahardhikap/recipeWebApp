import React from "react";

function Alert({type, message}){
    return(
        <>
        <div className={`alert alert-${type}`}>{message}</div>
        </>
    )
}

export default Alert