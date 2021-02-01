import React from 'react';
// import "./StudentCardView.css";
import axios from 'axios';
import SimpleCard from "./Card";
import { Grid } from "@material-ui/core";
import tempPic from "./img/placeHolderPic.png";
// import { makeStyles } from '@material-ui/core/styles';

// const studentID = localStorage.getItem("id")
const studentID = localStorage.getItem("id")
// console.log(studentID)

//inline styling for the place holders: 
var placeHolder_style = {
    paddingLeft: "33%"   
}
var textStyle = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",

}

class StudentReports extends React.Component{
    //creating a state to store the question data object from the BE Api
    state = {
        questions: []
    }
    componentDidMount(){
        //make an api call to the backend to display question belongs to this particular user
        axios.get(`http://206.189.194.211:8080/getThisQuestion/${studentID}`)
        // axios.get(`http://localhost:8080/getThisQuestion/${studentID}`)
        .then(res => {
            const questions = res.data;
            this.setState({questions: questions});
            console.log(questions);
        })
    }
    render(){
        // const useStyles = makeStyles({
        //     gridContainer: {
        //         paddingLeft: "40px",
        //         paddingRight: "40px"
        //     }
        // })
        //creating a question objects that store all the question information from the database
        const {
            questions
        } = this.state;
        //iterate through the list of question objects and populate them onto the card views
        const getQuestionObjects = question => {
            return(
                <Grid item xs={12} sm={4}>
                    <SimpleCard {...question} />
                </Grid>
            )
        }

        //if the question object is empty, as the user has not asked any questions, render nothing
        if (questions){
            return(
                <div>
                    <h2 style={{paddingLeft: "10px"}}>Question history</h2>
                    <Grid container spacing={4} style={{paddingLeft: "40px", paddingRight: "40px"}}>
                        {questions.map(question => getQuestionObjects(question))}
                    </Grid>
                </div>
            )
        }
        return(
            <div>
                <img src={tempPic} style={placeHolder_style} />
                <h1 style={textStyle}>You have no active question right now!</h1>
            </div>
        )

    }
}


export default StudentReports;
