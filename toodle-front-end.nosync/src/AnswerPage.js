//React component that stores the tutor accout processing for users
import React from 'react';
// import "./AnswerPage.css";


// import PermanentDrawerLeft from "./TutorAnsweringView";
// import AnswerThreadView from "./AnswerThreadView";
import PermanentDrawerLeft from "./TutorAnsweringView";
// import TutorReplyBoxView from "./TutorReplyBoxView";
// console.log(questionInfo);
class AnswerPage extends React.Component{
    render(){
        return(
            <div className="show-data-tutor">
                <PermanentDrawerLeft />
                
            </div>
        )
    }
}

export default AnswerPage;
