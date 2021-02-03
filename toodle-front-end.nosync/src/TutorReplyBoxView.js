//React component that stores the tutor accout processing for users
import React from 'react';
import Axios from 'axios';
import "./TutorReplyBoxView.css";
const topic = localStorage.getItem("topic");
const description = localStorage.getItem("description");
const studentName = localStorage.getItem("studentName");
const professor = localStorage.getItem("professor");
const course = localStorage.getItem("courseName");
const timeStamp = localStorage.getItem('timeStamp');
const status = localStorage.getItem('status');
const questionID = localStorage.getItem('questionID');
const studentID = localStorage.getItem('student_ID');
// console.log(studentID);
//TUTOR INFORMATION:
const tutorName = localStorage.getItem('tutor_name');
const tutor_id = localStorage.getItem('tutor_id');
class TutorReplyBoxView extends React.Component{
    render(){
        return(
            <div className="answer-question">
                <form onSubmit={(e) => sendAnswer(e)}>
                    <div className="answer-box">
                        <textarea className="answerBox" id="solution" placeholder="Enter your resolution of the issue..." style={{marginLeft: "20px", height: "70px", width: "97%", position: "relative"}}></textarea>
                    </div>
                    <div className="sendAns" style={{paddingLeft: "90%", position:"relative"}}>
                            <button type="submit" className="btn">Submit</button>
                      </div>
                </form>

                <div className="closeTheQuestion" style={{paddingLeft:"1%"}}>
                    <button type="button" className="resolved-btn" onClick={closeTheCase}>Resolved!</button>
                </div>
            </div>
        )
    }
}
//Function to send the answer to the user 
function sendAnswer(e){
    e.preventDefault();
    const reply_TIME = new Date();
    const reply_TIME_FORMATTED = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(reply_TIME);
    const answer = document.getElementById('solution').value
    const updated_status = "pending"
    console.log(answer);

    //Setting up a request: 
    let request = {
        tutorID: tutor_id,
        tutorName: tutorName,
        questionID: questionID,
        answer: answer,
        timestamp: reply_TIME_FORMATTED,
        studentID: studentID,
    }

    //Axio command to connect to the back end via the api url:
    // Axios.post('http://206.189.194.211:8080/answer', request)
    Axios.all([
        Axios.post('http://206.189.194.211:8080/answer', request),
        Axios.post(`http://206.189.194.211:8080/updateQuestionStatus/${questionID}/${updated_status}`)
        // Axios.post('http://localhost:8080/answer', request),
        // Axios.post(`http://localhost:8080/updateQuestionStatus/${questionID}/${updated_status}`)
    ])
    // Axios.post('http://localhost:8080/answer', request)
    //server response handling: 
    .then(response => {
        console.log("Server response...");
        alert("Replies sent to user...")
        console.log(response)
    })

    .catch(err => {
        console.log(err);
        console.log(request);
    });

    window.location.reload(false);
}//end of sendAnswer(e)


//function to close the current question, when this is called the function will change the status of the current question into close 
function closeTheCase(e){
    e.preventDefault();
    //check to see if the user really wants to close this case: 
    const close_status = "closed"
    var confirm = window.confirm("Are you sure that you want to close this quesion?")
    if(confirm){ //this function will send a request to change the status of the question in the database to close
        Axios.post(`http://206.189.194.211:8080/updateQuestionStatus/${questionID}/${close_status}`)
        //handling a response from the database: 
        .then(response => {
            console.log("Server response...");
            alert("Question has been closed! Great works!")
            console.log(response)
        })

        //hadnling error if the request is bad: 
        .catch(err => {
            alert(err)
        })

        window.location.reload(false);
    }

    else{
        //do nothing
    }

}//end of closeTheCase function...
export default TutorReplyBoxView;
