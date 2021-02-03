import React from 'react';
import Axios from 'axios';
import './AnswerThreadView.css'
import { Grid } from "@material-ui/core";
import CommentCardView from "./ReplySessionCardView";
import tempPic_01 from "./img/placeHolderPic.png";


//inline styling for the place holders: 
var placeHolder_style_01 = {
    paddingLeft: "29%",
    paddingTop:"30px"
    
}

var textStyle_01 = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
}
//getting the question id 
const question_id = localStorage.getItem("questionID");
// console.log(question_id);
class AnswerThreadView extends React.Component{
    //state to store the answer object from the BE api, 
    //we will take the questions_ID and use it as a parameters to take find all related
    //object to this question
    state={
        answers: []
    }

    componentDidMount(){
        //make an API call to the BE to request answer object
        Axios.get(`http://206.189.194.211:8080/getThisAnswer/${question_id}`)
        // Axios.get(`http://localhost:8080/getThisAnswer/${question_id}`)
        .then(res => {
            const answers = res.data;
            this.setState({answers: answers});
            console.log(answers)
        })
    }
    render(){
        //getting answer object data
        const {
            answers
        } = this.state;
        //iterate through the list of answer objects coming back and ppopulate them onto the card views
        const getAnswerObject = answer => {
            return(
                <Grid >
                    <CommentCardView {...answer} />
                </Grid>
            )
        }
        //conditional rendering: 
        if(answers){
            return(
                <Grid style={{paddingLeft: "150px", paddingRight: "40px", paddingTop: "10px", paddingBottom: "20px"}}>
                    {answers.map(answer => getAnswerObject(answer))}
                </Grid>
            )
        }
        return(
        <div>
            <img src={tempPic_01} style={placeHolder_style_01} />
            <h1 style={textStyle_01}>Let's start a conversation</h1>
        </div>
        )
    }
}
export default AnswerThreadView;