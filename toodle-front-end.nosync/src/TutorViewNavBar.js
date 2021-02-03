import React, { useState } from 'react';
import "./TutorViewNavBar.css";
import {FaUserAlt} from "react-icons/fa";
import {FaRegBell} from "react-icons/fa";
// import {FaEnvelopeOpenText} from "react-icons/fa";
// import {FaCentercode} from "react-icons/fa";
import {GoSettings} from "react-icons/go";
import {GrLogout} from "react-icons/gr";

const tutor_name = localStorage.getItem("tutor_name")
console.log(tutor_name);
// const tutor_log_in_status = localStorage.getItem("tutor_login_status");
// console.log(tutor_log_in_status)
//function to render out the full nav bar
function TutorViewNavBar(props){
    return(
        <nav className="tutor-nav-bar">
            <ul className="tutor-nav-bar-nav">
                {/* <NavItem icons={<FaCentercode />} />
                <NavItem icons={<FaEnvelopeOpenText />} /> */}
                <NavItem icons={<FaRegBell />} />
                <NavItem icons={<FaUserAlt />}>
                    <DropdownMenu />
                </NavItem>
            </ul>

        </nav>
    )
}

//Function to render out the nav items
function NavItem(props){
    
    const [open, setOpen] = useState(false);


    return(
        <li className="tutor-nav-item">
            <a href= "#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icons}
            </a>

            {open && props.children}
        </li>
    )
}

//function to display the drop down menu
function DropdownMenu(){
    function DropdownItem_UserProfile(props){      
        return(
            <a href="#" className="menu-item" onClick={() => goToTutorProfilePage()}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}

                {/* <span className="icon-right">{props.rightIcon}</span> */}

            </a>
        )
    }
    function DropdownItem(props){      
        return(
            <a href="#" className="menu-item" >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}

                {/* <span className="icon-right">{props.rightIcon}</span> */}

            </a>
        )
    }

    function DropdownItem_logout(props){
        return(
            <a href="#" className="menu-item" onClick={() => logoutHandler()}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}

                {/* <span className="icon-right">{props.rightIcon}</span> */}

            </a>

        )
    }
    return(
        <div className="dropdown">
            <DropdownItem_UserProfile leftIcon={<FaUserAlt />} actionState="profile">My Profile</DropdownItem_UserProfile>
            <DropdownItem
                leftIcon={<GoSettings />}
                // rightIcon={<FaCentercode />}
                actionState="setting"
                > Setting
            </DropdownItem>
            <DropdownItem_logout leftIcon={<GrLogout />} actionState="log-out">Log out</DropdownItem_logout>
        </div>
    )

}

//Function to handle the logout logic: 
function logoutHandler(){
    localStorage.clear();
    window.location = "/";
}

//function to get to user profile page
function goToTutorProfilePage(){
    window.location = "/TutorBasicInfoPage";
}



export default TutorViewNavBar;