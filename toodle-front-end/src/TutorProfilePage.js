import React from 'react';
import Drawer from './TutorHomePageNavBar';
import './TutorProfilePage.css';
import axios from 'axios';
import TutorStatsCards from './TutorStatsCards';
import { Grid } from "@material-ui/core";
import DisplayTutorWorksCardView from './DisplayTutorWorksCardView';
import Qs from 'qs';
import DisplayTutorWorksCardViewUtils from './DisplayTutorWorksCardViewUtils';

const tutor_name = localStorage.getItem('tutor_name')
const tutor_id = localStorage.getItem('tutor_id')
// const tutor_email = localStorage.getItem('tutor_email')
const unique_questions_ids = new Set();
class TutorProfilePage extends React.Component{
    //creating the state to store the all the answers given by this tutor
    state = {
        answers: [],
        questions: []
    }
    componentDidMount(){
        //make an api call that request for the number of answers provided by this tutpr 
        //as soon as the page is loaded 
        // axios.get(`http://206.189.194.211:8080/getAnswersByThisTutor`)
        axios.get(`http://206.189.194.211:8080/getAnswersByThisTutor/${tutor_id}`)
        .then(res => {
            const answers = res.data;
            this.setState({answers: answers})
            //console.log(answers)
        }).catch(errors => {
            console.log(errors)
        })
    }
    render(){
        const {
            answers
        } = this.state;
        const numOfAnswerProvided = answers.length;
        //getting unique questions that the user has worked on
        answers.map((answer, index) => (
            unique_questions_ids.add(answer.questionID)
        ))
        var questionID_Array = [... unique_questions_ids]
        // console.log(questionID_Array)
        const questionsWorkedOnCount = unique_questions_ids.size;
        const tutorServiceData = [
            {
                title: "Answers provided",
                count: numOfAnswerProvided,
            },

            {
                title: "Questions answered",
                count: questionsWorkedOnCount,
            }
        ]

        //function to loop through each service data and send it to the card view
        const getStatObject = data => {
            return(
                <Grid item xs={12} sm={4}>
                    <TutorStatsCards {...data} />
                </Grid>
            )
        }
        const questionObject = []
        getQuestionsFromAPI(questionID_Array).then(function(response){
            // console.log(response);
            Object.keys(response).forEach(function(key){
                // console.log(response[key])
                questionObject.push(response[key])
            })
        })

        console.log(questionObject)

        // const getQuestionObjectFromID = question => {
        //     console.log(question)
        // }
        return(
            <div>
                <Drawer />
                <h1 className="profile-page-first-h1">Welcome {tutor_name}</h1>
            
                <div className="tutor-stats-display">
                    <Grid container spacing={4} style={{paddingLeft: "540px", paddingRight: "40px", paddingTop: "30px"}}>
                        {tutorServiceData.map(tool => getStatObject(tool))}
                    </Grid>
                </div>

                <div className="tutor-question-worked-on-display">
                    <Grid style={{paddingLeft: "340px", paddingRight: "40px", paddingTop: "30px"}}>
                        <DisplayTutorWorksCardView  {...questionObject}/>
                        <DisplayTutorWorksCardViewUtils />

                    </Grid>
                </div>
                
            </div>
        )
    }
}



function getQuestionsFromAPI(ids){
    const questions = [];
    //request the question objects from the back end
    // console.log('http://206.189.194.211:8080/getQuestionsFromQuestionID?', params)
    const promise = axios.get('http://206.189.194.211:8080/getQuestionsFromQuestionID', {
        params: {
            id: ids
        },
        paramsSerializer: (params) => {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
    // using .then, create a new promise which extracts the data
    const dataPromised = promise.then((res) => res.data)
    //returning the data from json
    return dataPromised
  }

export default TutorProfilePage;

