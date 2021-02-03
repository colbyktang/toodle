import React from "react";
import { Redirect } from 'react-router-dom';

class ProtectedRoutes_STUDENT extends React.Component{
    render(){
        const Component = this.props.component;
        const isAuthenticated_STUDENT = localStorage.getItem("student_status_token");
        console.log(isAuthenticated_STUDENT);
        if( isAuthenticated_STUDENT == "true"){
            return( <Component />)
        }

        else{
            return(<Redirect to={{pathname: '/userPage'}} />)
        }
    }
}

export default ProtectedRoutes_STUDENT;