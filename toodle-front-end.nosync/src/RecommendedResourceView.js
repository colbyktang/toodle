import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import QuestionCardView from './RecommendCard'

class RecommendedResourceView extends React.Component{
    state = {
        questions: []
    }

    componentDidMount(){
        //connecting the BE 
        axios.get(`http://206.189.194.211:8080/getAllResolvedQuestions`)
        .then(res => {
            const questions = res.data;
            this.setState({questions: questions});
            console.log(questions);
        })
    }

    render(){
        const {
            questions
        } = this.state
        //function to populate the card view with the api response info
        const getQuestionObject = question =>{
            return(
                <Grid item xs={12} sm={4}>
                    <QuestionCardView {...question} />
                </Grid>
            )
        }

        if(questions){
            return(
                <Grid>
                    {questions.map(question => getQuestionObject(question))}
                </Grid>
            )
        }

        return(
            <div>

            </div>
        )
    }
}

export default RecommendedResourceView;