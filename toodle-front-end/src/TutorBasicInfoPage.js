import React from 'react';
import Drawer from './TutorHomePageNavBar';
import './TutorBasicInfoPage.css'
import TutorBasicInfoCardView from './TutorBasicInfoCardView';

class TutorBasicInfoPage extends React.Component{
    render(){
        return(
            <div className="tutor-basic-info-page-wrapper">
                <Drawer />
                <h1 className="first-h1">Personal Info</h1>

                <div className="personal-info-description">
                    Basic info, like your name and email address, that you use on Toodle.
                </div>

                <div className="tutor-basic-info-card-view">
                    <TutorBasicInfoCardView />

                </div>
            </div>
        )
    }
}

export default TutorBasicInfoPage;