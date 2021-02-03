import React, { useState } from 'react';
import "./AdminNavBar.css";
import {FaUserAlt} from "react-icons/fa";
import {FaRegBell} from "react-icons/fa";
import {FaEnvelopeOpenText} from "react-icons/fa";
import {FaCentercode} from "react-icons/fa";
import {GoSettings} from "react-icons/go";
import {GrLogout} from "react-icons/gr";


//function to render out the full nav bar
function AdminNavBar(){
    return(
        <nav className="admin-nav-bar">
            <ul className="admin-nav-bar-nav">
                <NavItem icons={<FaCentercode />} />
                <NavItem icons={<FaEnvelopeOpenText />} />
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
        <li className="admin-nav-item">
            <a href= "#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icons}
            </a>

            {open && props.children}
        </li>
    )
}

//function to display the drop down menu
function DropdownMenu(){
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
            <DropdownItem leftIcon={<FaUserAlt />} actionState="profile">My Profile</DropdownItem>
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



export default AdminNavBar;