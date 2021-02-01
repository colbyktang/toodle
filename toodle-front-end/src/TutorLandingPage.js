import React from 'react';
import "./TutorLandingPage.css"
// import logo from './img/favicon.ico'
import axios from 'axios';
import TutorViewNavBar from "./TutorViewNavBar";
const token = localStorage.getItem('tutor_status_token')
class TutorLandingPage extends React.Component{
    //creating a state to store the question data from the BE api
    state={
        questions: []
    }
    componentDidMount(){
        //make a api call to the backend for question data
        // axios.get('http://206.189.194.211:8080/getAllQuestions')
        // axios.get('http://localhost:8080/getAllActiveQuestion')
        axios.get('http://206.189.194.211:8080/getAllActiveQuestion')
        .then(res => {
            const questions = res.data;
            this.setState({questions: questions});
            console.log(questions)
        })
    }
    
    //Populate data within the table
    renderTableData(){
        //render question data retrieved from the API onto the FE
        const {
            questions
        } = this.state;
        // console.log(questions)
        //condition for rendering: 
        if(questions){
            return questions.map((question, index) => {
                const {_id, course, topic, professor, timestamp, description, studentName, status} = question //deconstructing the question object            
                return(
                    <tr key={_id} onClick={() => fetchTableData(question)}>
                        <td>{_id}</td>
                        <td>{studentName}</td>
                        <td>{topic}</td>
                        <td>{course}</td>
                        <td>{description}</td>
                        <td>{changeStatusColor(status)}</td>
                        <td>{professor}</td>
                        <td>{timestamp}</td>
                    </tr>
                )
            })
        }
        
    }

    render(){
        const {
            questions
        } = this.state;

        //if the question object exist: 
        if(questions){
        return(
            <div>
                <TutorViewNavBar />
                <table id='questions'>
                    <tbody>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Topic</th>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Status </th>
                        <th>Professor</th>
                        <th>Date Sent</th>


                        {/* <tr>{this.renderTableHeader()}</tr> */}
                        {this.renderTableData()}
                    </tbody>
                </table>
                {/* { questions.map(question => <li>{question.topic}</li>)}
                {this.renderTableData()} */}
            </div>
        )
        }
        else{
            return(
                <div>
                <TutorViewNavBar />
                <table id='questions'>
                    <tbody>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Topic</th>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Professor</th>
                        <th>Date Sent</th>
                        <th>Status </th>

                        {/* <tr>{this.renderTableHeader()}</tr> */}
                        {/* {this.renderTableData()} */}
                    </tbody>
                    
                </table>
                <div className="ex01" style={{textAlign:"center"}}>
                    No active question right now
                </div>
                </div>
            )
        }
    }
}

//Function fetch data from the table in the table.
function fetchTableData(data){
    console.log(data);
    //storing the table row data from the click into the localstorage. 
    //STUDENT INFORMATION
    localStorage.setItem('topic', data.topic);
    localStorage.setItem('description', data.description);
    localStorage.setItem('studentName', data.studentName);
    localStorage.setItem('professor', data.professor);
    localStorage.setItem('courseName', data.course);
    localStorage.setItem('timeStamp', data.timestamp);
    localStorage.setItem('status', data.status);
    localStorage.setItem('questionID', data._id);
    localStorage.setItem('student_ID', data.student_ID);
    
    window.location = "/AnswerPage"

}

//Function to change the background color of the 
//status field
function changeStatusColor(status){
    if(status == "new"){
        return(
            <div className="new-status-color">
                <span>{status}</span>
            </div>
        )
    }
    
    else if(status == "open"){
        return(
            <div className="open-status-color">
                <span>{status}</span>
            </div>
        )    
    }

    else if(status == "pending"){
        return(
            <div className="pending-status-color">
                <span>{status}</span>
            </div>
        )
    }

    else{
        //return nothing 
    }
}

export default TutorLandingPage;
