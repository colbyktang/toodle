import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
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

export default function UserStatsCardView() {
  const classes = useStyles();
  const number = 169;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
            <Button >Active user: {number}</Button>
        </Typography>
        <Typography variant="h5" component="h2">
            <Button >Students: 140</Button>
        </Typography>
        <Typography variant="h5" component="h2">
            <Button >Tutors: 20</Button>
        </Typography>
        <Typography variant="h5" component="h2">
            <Button >Professors: 9</Button>
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>

    </Card>
  );
}