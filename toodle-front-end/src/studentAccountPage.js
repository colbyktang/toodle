import React from 'react';
import "./studentAccountPage.css"
import SideMenuStudent from './SideMenuStudent'
// import Button from 'react-bootstrap/Button';
import DropDownMenu from './DropDownMenu';
import PopUp from "./PopUp";
const username = localStorage.getItem("username")
const userID= localStorage.getItem("id")
const userEmail = localStorage.getItem("email")
class StudentAccountPage extends React.Component{
    render(){
        return(
            <div className="main-account-page-container">
                <SideMenuStudent />
                <div className="account-page-header">Welcome, {username}</div>
                <br></br>
                <hr></hr>
                <div className="account-basic-info">
                    <div className="basic-info-h2">
                        <h2>Basic info</h2>
                    </div>
                    
                    <div className="basic-info-contents">
                        <div className="username-span">
                            <span>{username}</span>
                        </div>
                        <div className="userpass-span">
                            <span>Password:*******</span>
                        </div>
                        <div className="useremail-span">
                            <span>{userEmail}</span>
                        </div>
                        <div className="userid-span">
                            <span>{userID}</span>
                        </div>
                    </div>
                    <div className="info-modified-btn">
                        <PopUp />
                    </div>
                </div>
                <hr></hr>

                <div className="course-subscription-info">
                    <div className="course-subscription-info-h2">
                        <h2>Course subscription</h2>
                        <span>Add or remove concepts that you find interesting from your account</span>
                    </div>
                    
                    <div className="course-info-dropdown">
                        <DropDownMenu />
                    </div>
                    <br></br>
                    <hr></hr>
                    {/* <div className="course-info-stored">
                    </div> */}
                </div>

            
            </div>
        )
    }
}
export default StudentAccountPage; 