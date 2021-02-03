//This component will render out the input box for the student to send their replies to the tutor
import React from 'react';
import axios from 'axios';

const topic = localStorage.getItem("topic");
const description = localStorage.getItem("description");
const professor = localStorage.getItem("professor");
const student_name = localStorage.getItem("student_name");
const status = localStorage.getItem("status");
const timeStamp = localStorage.getItem("timestamp");
const studentID= localStorage.getItem("id")
const questionID = localStorage.getItem("questionID");

class StudentReplyBox extends React.Component{
    render(){
        if(status != "closed"){
            return(
                <div className="student-text-box" >
                    <form onSubmit={(e) => sendFollowUp(e)}>
                        <div className="answer-box">
                            <textarea className="answerBox" id="followUp" placeholder="Still have question? Let us know!"></textarea>
                        </div>
                        <div className="sendAns">
                            <button type="submit" className="btn">Submit Response</button>
                        </div>
                    </form>
    
                </div>
            )
        }

        else{
            return(
                <div className="reopen-container" style={{paddingTop: "10px", textAlign: "center"}}>
                    <h2>This question has been closed. Click reopen if you have further question</h2>
                    <div className="sendAns">
                        <button type="submit" className="btn" onClick={(e) => reopen(e)}>Reopen</button>
                    </div>
                </div>

            )
        }
    }
}

//Function to send the follow up from the student into the back end
function sendFollowUp(e){
    e.preventDefault();
    //getting the time stamp: 
    const timestamp = new Date()
    const timestamp_Formated= new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    const answer = document.getElementById('followUp').value
    const updatedStatus = "open"
    //creating a request object to send out
    let request = {
        studentName: student_name,
        studentID: studentID,
        questionID: questionID,
        answer: answer, 
        timestamp: timestamp_Formated,
        status: "open"
    }
    //Making a connection to the back end:
    // axios.post('http://206.189.194.211:8080/answer', request)
    // axios.post('http://localhost:8080/answer', request)
    Promise.all([
        axios.post('http://206.189.194.211:8080/answer', request),
        axios.post(`http://206.189.194.211:8080/updateQuestionStatus/${questionID}/${updatedStatus}`)
    ])
    //server reponse hanlding: 
    .then(response => {
        console.log(response)
        alert("Follow up sent!")
    })
    //error handling: 
    .catch(err => {
        alert(err)
    })

    window.location.reload(false);
}

//function to reopen the question: 
function reopen(e){
    e.preventDefault();
    const reopenStatus = "open"
    //making an api request to the backend to update the status to open.
    axios.post(`http://206.189.194.211:8080/updateQuestionStatus/${questionID}/${reopenStatus}`)
    //server reponse hanlding: 
    .then(response => {
        console.log(response)
        alert("Follow up sent!")
    })
    //error handling: 
    .catch(err => {
        alert(err)
    })

    window.location.reload(false);
}

export default StudentReplyBox;