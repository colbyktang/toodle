import React from 'react';
import "./registrationLogin.css"
import axios from 'axios';
 // @ts-ignore  
 import jwt_decode from "jwt-decode";
// import StudentLandingPage from "./studentLandingPage"
class Login extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            
            <div className="base-container" ref={this.props.containerRef}>
                <form onSubmit={(e) => login(e)}>
                    <div className="header">Login</div>
                    <div className="content">
                        {/* <div className="image">
                            <p>image goes here!</p>
                        </div> */}

                        <div className="form">

                            <div className="form-group">
                                <label htmlFor="username">Username </label>
                                <input type="text" id="username" placeholder="username" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password" id="password" placeholder="password" />
                            </div>
                        </div>
                    </div>

                    <div className="footer">
                        <button type="submit" className="btn">Login</button>
                    </div>                            
                </form>
            </div>

        )
    }
}

//function to group the data and send them out via Json.
function login(e){
    e.preventDefault();
    let request = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    axios.post('http://206.189.194.211:8000/login', request)
    // axios.post('http://localhost:8000/login', request)
    .then(response => {
        // alert(response.data.message);
        // console.log(request);
        // console.log(response.data.result) //response back from server
        // console.log(response.data.error)  // two type: invalid password or username
        // //Variable to store the reponse from the server+
        var goodRes = response.data.result
        var errorMessage = response.data.error

        // //alert the error to the user
        if(errorMessage === "Invalid password" || errorMessage === "Invalid Username"){
            alert(errorMessage)
        }
        
        else{
            // alert(goodRes)
            //decode the jwt sent in from the server. 
            var decode = jwt_decode(goodRes);
            //storing the session token in the local storage
            localStorage.setItem('student_status_token', decode.student)
            localStorage.setItem('tutor_status_token', decode.tutor)
            //If the user type is a tutor direct them to a tutor page
            if (decode.student == true){
                //Creating a cookie with the username 
                localStorage.setItem('username', decode.username)
                localStorage.setItem('email', decode.email)
                localStorage.setItem('id', decode.id)

                window.location = "/studentLandingPage";
            }

            if (decode.tutor == true){
                localStorage.setItem('tutor_name', decode.username)
                localStorage.setItem('tutor_email', decode.email)
                localStorage.setItem('tutor_id', decode.id)
                window.location = "/TutorLandingPage";

            }

        }
        
    })
    .catch(err => {
        console.log(err);
        console.log(request);
    })
}

export default Login;