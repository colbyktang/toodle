import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

//getting question information from the
const topic = localStorage.getItem("recomended_topic");
const description = localStorage.getItem("recomended_description");
const professor = localStorage.getItem("recomended_professor");
const student_name = localStorage.getItem("recomended_student_name");
const status = localStorage.getItem("recomended_status");
const timeStamp = localStorage.getItem("recomended_timestamp");



export default function RecQuestionThreadView() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {student_name}
            </Typography>
            <Typography variant="h5" component="h2">
              {topic}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {professor}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {status}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {timeStamp}
            </Typography>
          </CardContent>
        </Card>
      );
}