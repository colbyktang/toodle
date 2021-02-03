import React from 'react';
import "./registrationConfirmation.css"
import {Link} from "react-router-dom";

class RegConfirmation extends React.Component{
    render(){
        return(
            <div className="main-Container">
                <div className="head_01">
                    <h1>Welcome aboard!</h1>
                    <p>Your account was successfully created. We have sent a confirmation link to your email address. Please click the link in your email to activate your account</p>

                    <button type="submit" className="btn_01">
                        <Link to="/userPage">
                            Back to Login
                        </Link>
                    </button>    
                </div>
            </div>
        )
    }

}


export default RegConfirmation;


