import React from 'react';
import './footer.css';
// import {Link} from "react-router-dom";
//import logo 
import logo from './img/favicon.ico'


class Footer extends React.Component{
    render(){
        return (
            <div className="Footer">
                <div className="Toodle-Link">
                    <img src={logo} className="App-logo" alt="logo" />
                    <a href="#button">Toodle</a>
                </div>
                <div className="about-link">
                    <a href="#button">About us</a>
                </div>

                <div className="privacy-link">
                    <a href="#button">Privacy</a>
                </div>

                <div className="term-link">
                    <a href="#button">Terms</a>
                </div>

                <div className="support-link">
                    <a href="#button">Support</a>
                </div>
                   
                <div className="Icon">
                    <div>
                        <span>
                            <a href="#button"><ion-icon name="logo-facebook"></ion-icon></a>
                            <a href="#button"><ion-icon name="logo-twitter"></ion-icon></a>
                            
                        </span>
                    </div>
                

                </div>    
            </div>

        );
    };
};

export default Footer;