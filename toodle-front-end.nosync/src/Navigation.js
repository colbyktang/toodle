import React, {useState, useEffect } from 'react';
import logo from './img/favicon.ico'
import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation(){
    //set the state to be changed later.
    const [navbar, setNavBar] = useState(false);

    //create a funtion that showcase the scroll
    const changeBackground = () => {
        // console.log(window.scrollY); //check if the vertical scroll works on our page
        if(window.scrollY >= 120) {
            setNavBar(true)
            
        } else {
            setNavBar(false);
        }
    }
    window.addEventListener('scroll', changeBackground);
    return(
        <nav className={navbar ? 'navbarActive' : 'navBar'}>
            <ul className="logo">
                <li><a href="#button"><img src={logo} className="App-logo" alt="logo" /></a></li>
            </ul>
            <ul className="links">
                <li><a href="#About">About</a></li>
                {/* <li><a href="#contact">Contact Us</a></li> */}
                <li><a href="/ThreadsAroundToodle">Threads</a></li>
                {/* <li><a href="#becomeProfessor">For Toodle Professor</a></li> */}
                {/* <li><a href="/TutorJobPosting">Become a Tutor</a></li> */}
            </ul>

            <ul className="button">
                <Link to="/userPage">
                    <li>Try Toodle</li>
                </Link>
                
                {/* <li><a href="/userPage">Try Toodle for Free</a></li> */}
            </ul>
        </nav>
    );    
};

// const linkStyle = {
//     text-decoration: 'none';
//     color: 'white';
//     font-size: 20px;
// }

export default Navigation;