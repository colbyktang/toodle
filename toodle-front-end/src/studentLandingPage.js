import React from 'react';
import "./studentLandingPage.css"
// import logo from './img/favicon.ico'
import axios from 'axios';
import SideMenuStudent from './SideMenuStudent'
import StudentCardView from "./StudentCardView"
import SupportToolRecommend from "./SupportToolRecommend"


const username = localStorage.getItem('username')
// console.log(username)
const studentID= localStorage.getItem("id")
// console.log(studentID)
class StudentLandingPage extends React.Component{
    //creating a state to store the question data from the BE api
    // state={
    //     questions: []
    // }

    // componentDidMount(){
    //     //make an api call to the backend for data
    //     axios.get(`http://localhost:8000/getThisQuestion/${studentID}`)
    //     // console.log(`http://localhost:8000/getThisQuestion/${studentID}`)
    //     //Reponse handling from the server backend: 
    //     .then(res => {
    //         const questions = res.data;
    //         this.setState({questions: questions});
    //         console.log(questions);
    //     })

    //     const {
    //         questions
    //     } = this.state;
    // }

    render(){
        return(
            <div>
                <div className="show-data">
                    <SideMenuStudent />
                    {/* <ul className="logo">
                        <li><a href="/"><img src={logo} className="App-logo" alt="logo" /></a></li>
                    </ul> */}

                    {/* <div className="message01">Welcome {username}, {user_id} How can we help you?</div> */}
                    <form onSubmit={(e) => sendQuestion(e)}>
                        <div className="input_box">
                            <h2>Ask question</h2>
                            <div className="form-group">
                                <label className="course_name">Course Name </label>
                                <input type="text" id="course" className="courseClass"placeholder="course name" />
                            </div>
                            <div className="form-group">
                                    <label className="topic_01">Topic </label>
                                    <input type="text" id="topic" className="topicClass" placeholder="Topic" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label className="Professor_01">Professor Name </label>
                                <input type="text" id="professor" className="professorClass" placeholder="professor" />
                            </div>
                            <div className="input_area">
                                <label className="quesDesc">How can we help you? </label>
                                <textarea className="textBox" id="questionDescription" placeholder="Enter your problem here"></textarea>

                            </div>

                            <div className="footer">
                                <button type="submit" className="btn">SUBMIT</button>
                            </div>
                        </div>
                    </form>
                </div>
                <StudentCardView />
                <SupportToolRecommend />
            </div>
        )
    }
}

//Function to group the data from the form and send it out as a JSON package
function sendQuestion(e){
    e.preventDefault();
    const timestamp = new Date()
    const timestamp_Formated= new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    // console.log(timestamp_Formated)
    //creating a request object to send out
    let request = {
        studentName: username,
        student_ID: studentID,
        course: document.getElementById('course').value,
        topic: document.getElementById('topic').value,
        professor: document.getElementById('professor').value,
        description: document.getElementById('questionDescription').value,
        status: "new",
        timestamp: timestamp_Formated
    }

    //axio command to make send the package to the BE: 
    axios.post('http://206.189.194.211:8080/question', request)
    // axios.post('http://localhost:8080/question', request)
    //server reponse handling: 
    .then(response => {
        // console.log("Server with something back...")
        // console.log(request)
        alert("We have managed to recieved a quesiton from you, please hang tight and we will get back to you with an answer")
        window.location.reload(false);
    })

    .catch(err => {
        console.log(err);
        console.log(request);
    });
}


export default StudentLandingPage;
