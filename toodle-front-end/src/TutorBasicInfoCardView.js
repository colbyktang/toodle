import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

export default function TutorBasicInfoCardView() {
  const classes = useStyles();
  const tutor_name = localStorage.getItem('tutor_name')
  const tutor_email = localStorage.getItem('tutor_email')

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
            Basic Info
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Some info may be visible to other people using Toodle service
        </Typography>
        <br></br>
        <Typography variant="h5" component="h2">
            Name:  {tutor_name}
        </Typography>
        <br></br>
        <hr></hr>
        <Typography variant="h5" component="h2">
            Password:  **********
        </Typography>
        <br></br>
        <hr></hr>
        <Typography variant="h5" component="h2">
            Contact Info: {tutor_email}
        </Typography>
        <br></br>
        <hr></hr>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Manage</Button>
      </CardActions>
    </Card>
  );
}
