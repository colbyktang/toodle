import React from 'react';
import './Disclaimer.css';
import img1 from './img/ToodleExample.png'

class Disclaimer extends React.Component{
    render(){
        return(
            <div className="Disclaimer">
                <div className="ds">
                    <div className="d01">Ask Instantly, everywhere</div>
                    <div className="d02">No appointment, no meetup, just ask and get answered</div>
                    <div className="d03">
                        Get answered to your homework question right in the comfort of your home or dorm room without the hastle of scheduling an appointment
                    </div>
                    <div className="d03">
                        Ask question on any laptops, desktops, phones, and tablets. It’s up to you. Our tutors and knowledge base center are always available to assist you on your education journey.                    
                    </div>
                </div>
                <div className="picture">
                    <img src={img1} className="img1" alt="logo"/>
                </div>
            </div>

            
        )
    }
}

export default Disclaimer;