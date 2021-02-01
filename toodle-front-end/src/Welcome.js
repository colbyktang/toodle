import React from 'react';
import './Welcome.css';
//import background image
// import Background from './img/img02.jpg';
// const backgroundStyle = {backgroundImage: `url(${Background})`, height:"100vh", backgroundsize: 'cover'}


class Welcome extends React.Component{
    render(){
        return (
            <div className="container">
                <h1>Tutoring re-imagined.</h1>
                <h1>Ask anywhere, answer anytime.</h1>  
            </div>
                
                         
            
        );
    };
};


//displaying the component in the 
export default Welcome;