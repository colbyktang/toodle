import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  pos: {
    fontSize: "20px",
    marginBottom: 12
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//getting replies information from the props
const { tutorName, studentName, answer, timestamp } = props
if(tutorName){
    return (
        <Card className={classes.root}>
          <CardHeader 
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                T
              </Avatar>
            }
            title={tutorName}
            subheader={timestamp}
          />
    
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                {answer}
            </Typography>
          </CardContent>
        </Card>
      );
}

else if(studentName){
    return (
        <Card className={classes.root}>
          <CardHeader 
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                S
              </Avatar>
            }
            title={studentName}
            subheader={timestamp}
          />
    
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.pos}>
                {answer}
            </Typography>
          </CardContent>
        </Card>
      );
}
else{
    return(
        <div>

        </div>
    )
}
}
