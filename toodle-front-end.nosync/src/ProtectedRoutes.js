//this file will handle logic to create a protected routes that can only be accessed via log in status
import React from "react";
import { Redirect } from 'react-router-dom';

class ProtectedRoutes extends React.Component{
    render(){
        const Component = this.props.component;
        const isAuthenticated  = localStorage.getItem('tutor_status_token');
        return isAuthenticated == "true"  ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/userPage'}} />
        );

    }
}

export default ProtectedRoutes;