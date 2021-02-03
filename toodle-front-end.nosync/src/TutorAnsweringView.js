import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AnswerThreadView from "./AnswerThreadView";
import TutorReplyBoxView from "./TutorReplyBoxView";
import DisplayOriginalQuestionPost from './DisplayOriginalQuestionPost';
import RecommendedResourceView from './RecommendedResourceView';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
    //STUDENT - QUESTION INFORMATION
  // const topic = localStorage.getItem("topic");
  // const description = localStorage.getItem("description");
  // const studentName = localStorage.getItem("studentName");
  const professor = localStorage.getItem("professor");
  const course = localStorage.getItem("courseName");
  // const timeStamp = localStorage.getItem('timeStamp');
  const status = localStorage.getItem('status');
  const questionID = localStorage.getItem('questionID');
  // const studentID = localStorage.getItem('student_ID');
  // console.log(studentID);
  // //TUTOR INFORMATION:
  // const tutorName = localStorage.getItem('tutor_name');
  // const tutor_id = localStorage.getItem('tutor_id');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Toodler In Action
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[questionID, course, status, professor].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          <div className>
            <h2>Similar Resources!</h2>
            <RecommendedResourceView />

          </div>
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <DisplayOriginalQuestionPost />
            <AnswerThreadView />
            <TutorReplyBoxView />
      </main>
    </div>
  );
}