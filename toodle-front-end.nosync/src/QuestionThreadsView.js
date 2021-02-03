import React from "react";
import "./QuestionThreadView.css";
import AnswerThreadView from "./AnswerThreadView";
import StudentReplyBox from "./StudentReplyBox";
import SingleQuestionCardView from "./QuestionThreadViewSingleCard";
//Getting the information about the question that needs to be created
// const questionObject = localStorage.getItem("question_object");
// const question_status = localStorage.getItem("topic")


class QuestionThreadsView extends React.Component{
    //function to render out components
    render(){
        return(
            <div className="showInfo">
                <SingleQuestionCardView />
                <AnswerThreadView />
                <StudentReplyBox />                
            </div>
        )
    }
}



//export the function
export default QuestionThreadsView;