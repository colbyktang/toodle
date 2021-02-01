import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
      fontSize: 12,
    },
    description: {
        fontsize: 20,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function QuestionCardView(props){
    const classes = useStyles();
    //Deconstructing the props object
    const {topic, status, course} = props
    
    return(
        <Card className={classes.root}>
            <CardHeader
                // avatar={
                //   <Avatar src={avatarSrc} />

                // }
                action={
                <IconButton aria-label="settings">
                    {/* <MoreVertIcon /> */}
                </IconButton>
                }
                title={topic}
                subheader={status}
            />
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Course title:
                </Typography>
                <Typography className={classes.description} variant="h5" component="h2">
                {course}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => openThreadView(props)}>Learn More</Button>
            </CardActions>
        </Card>

    )

}

//function to open a question thread views
function openThreadView(props){
    //open up a new page that would allow the students to view the question threads
    console.log(props);
    localStorage.setItem("recomended_question_object", props)
    localStorage.setItem("recomended_topic", props.topic)
    localStorage.setItem("recomended_description", props.description)
    localStorage.setItem("recomended_professor", props.professor)
    localStorage.setItem("recomended_student_name", props.studentName)
    localStorage.setItem("recomended_status", props.status)
    localStorage.setItem("recomended_timestamp", props.timestamp)
    localStorage.setItem("recomended_questionID", props._id)
  
    window.location = "/RecommendThreadView";
  }