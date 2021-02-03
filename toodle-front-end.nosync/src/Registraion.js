import React from 'react';
import "./registrationLogin.css"
import axios from 'axios';

// import {Link} from "react-router-dom";
// import RegConfirmation from './registrationConfirmation';
class Register extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            input: {},
            errors: {}        
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();

        if(this.validate()){       
            let request = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }

            axios.post('http://206.189.194.211:8000/register', request)
            // axios.post('http://localhost:8000/register', request)
            .then(response => {
                // alert(response.data.message);
                console.log(request);   //Data object being sent out
                //object received 
                // console.log(response.data.result)
                // console.log(response.data.error)
                var server_response = response.data.result
                // var error = response.data.error
                // console.log(goodRes)
            
                //if the username is already in the database: then let the user know and dont redirect to confirmation page
                if (server_response == "Username Already Exists!"){
                    alert(server_response)
                }
                //redirect to a page confirmation page if no error is sent back from the server
                else{
                    window.location = "/registrationConfirmation";
                }
                
            })

            //Error handling: 
            .catch(err => {
                console.log(err);
                console.log(request);
            })
        }

    }


    validate(){
        //getting form information: 
        var username = document.getElementById('username').value
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        let error = {}
        let isValid = true;

        if(!username){
            isValid = false;
            error["username"] = "Please enter your username.";
        }

        if(typeof(username) != "undefined"){
            const re = /^\S*$/;
            if(username.length < 6 || !re.test(username)){
                isValid = false
                error["username"] = "Please enter valid username.";
            }
        }

        //email validation
        if(!email){
            isValid = false;
            error["email"] = "Please enter your email address.";
        }

        if(typeof(email) != "undefined"){
            //regular expression to check for valid email address: 
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(email)){
                isValid = false;
                error["email"] = "Please enter a valid email address.";

            }
        }
        //password validation
        if(!password){
            isValid = false;
            error["password"] = "Please enter your password";
        }

        if(typeof(password) != "undefined"){
            if(password.length < 6){
                isValid = false;
                error["password"] = "Please add at least 6 character.";
            }
        }

        this.setState({
            errors: error
        })

        return isValid
    }
    render(){
        return(
            <div className="base-container" ref={this.props.containerRef}>
                {/* <form onSubmit={(e) => registrattion(e)}> */}
                <form onSubmit={this.handleSubmit}>
                <div className="header">Register</div>
                <div className="content">
                    {/* <div className="image">
                        <p>image goes here!</p>
                    </div> */}
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username </label>
                            <input type="text" name="username" id="username" placeholder="username" />
                            <div className="text-danger">{this.state.errors.username}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Email </label>
                            <input type="email" name="email" id="email" placeholder="email" />
                            <div className="text-danger">{this.state.errors.email}</div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password </label>
                            <input type="password" name="password" id="password" placeholder="password" />
                            <div className="text-danger">{this.state.errors.password}</div>

                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn">Register</button>
                </div>
                </form>
            </div>

        )
    }
}

export default Register;