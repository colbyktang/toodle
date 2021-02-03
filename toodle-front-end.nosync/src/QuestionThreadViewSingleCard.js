import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./QuestionThreadViewSingleCard.css"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    fontSize: "20px",
    marginBottom: 12
  },
});

//getting question information from the
const topic = localStorage.getItem("topic");
const description = localStorage.getItem("description");
// const professor = localStorage.getItem("professor");
const student_name = localStorage.getItem("student_name");
const status = localStorage.getItem("status");
const timeStamp = localStorage.getItem("timestamp");
// const studentID= localStorage.getItem("id")
const questionID = localStorage.getItem("questionID")

export default function SingleQuestionCardView() {
  const classes = useStyles();

  return (
    <div>
      <div className="id-header">
        <h1>Question ID {questionID}</h1>
      </div>
      <Card className={classes.root}>
        <CardContent>
          <div className="case-details-header">
            <b>
              Case details
            </b>
          </div>

          <div className="topic-name-status-time-container">
            <div className="topic-student-name-container">
              <p style={{fontSize: "20px"}}>Topic </p>          
                <Typography variant="h5" component="h2">
                  {topic}
                </Typography>
                <p style={{fontSize: "20px"}}>Student Name </p>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {student_name}
                </Typography>
            </div>

            <div className="status-time-container">
              <p style={{fontSize: "20px"}}>Status </p>
              <Typography className={classes.pos} color="textSecondary">
                {status}
              </Typography>
              <p style={{fontSize: "20px"}}>Created </p>
              <Typography className={classes.pos} color="textSecondary">
                {timeStamp}
              </Typography>
            </div>
          </div>
            <p style={{fontSize: "20px"}}>Subject </p>          
            <Typography variant="body2" component="p" className={classes.pos}>
              {description}
            </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
