import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({component: Layout, ...rest}) => {
    let auth = useSelector(state => state.auth);
    
    return(<Route 
        {...rest}
        render = { (props) => auth.isAuthenticated ?
            <Layout {...props}/>
            :
            <Redirect to= {{
                pathname:"/login"
            }} />
        }
    />)
};