import React from "react";
import Axios from 'axios';
import './AnswerThreadView.css'
import { Grid } from "@material-ui/core";
import CommentCardView from "./ReplySessionCardView";
//inline styling for the place holders: 
var placeHolder_style_01 = {
    paddingLeft: "29%"
    
}

var textStyle_01 = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",

}

//getting the question id 
const questionID = localStorage.getItem("recomended_questionID");

class RecAnswerThreadView extends React.Component{
    state = {
        answers: []
    }

    componentDidMount(){
        Axios.get(`http://206.189.194.211:8080/getThisAnswer/${questionID}`)
        .then(res => {
            const answers = res.data;
            this.setState({answers: answers})
        })
    }

    render(){
        const {
            answers
        } = this.state;

        const getAnswerObject = answer => {
            return(
                <Grid>
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

            </div>
        )
    
    }

}

export default RecAnswerThreadView;