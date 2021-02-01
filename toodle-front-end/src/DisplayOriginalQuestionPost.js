import React from 'react';
import "./DisplayOriginalQuestionPost.css";
//getting the question information from the table that was stored in the localstorage
//STUDENT - QUESTION INFORMATION
const topic = localStorage.getItem("topic");
const description = localStorage.getItem("description");
const studentName = localStorage.getItem("studentName");
const professor = localStorage.getItem("professor");
const course = localStorage.getItem("courseName");
const timeStamp = localStorage.getItem('timeStamp');
// const status = localStorage.getItem('status');
const questionID = localStorage.getItem('questionID');
const studentID = localStorage.getItem('student_ID');
// console.log(studentID);
//TUTOR INFORMATION:
// const tutorName = localStorage.getItem('tutor_name');
// const tutor_id = localStorage.getItem('tutor_id');
// console.log(tutorName)
// console.log(tutor_id)

//main class to display the original quesiton post
class DisplayOriginalQuestionPost extends React.Component{
    render(){
        return(
            <div className="show-post">
                <div className="show-post-header">
                    <h2>{studentName}</h2>
                    <span>{topic}</span>
                    <div className="id-time-span">
                        
                        <span>{timeStamp}</span>
                    </div>
                </div>
                <div className="show-post-description">
                    <span>{description}</span>
                </div>

            </div>
        )
    }

}


export default DisplayOriginalQuestionPost;