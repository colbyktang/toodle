import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


export default function TutorQuestionTableView(props) {
  const classes = useStyles();
    const {_id, course, topic, professor, timestamp, description, studentName, status} = props //deconstructing the question object
    return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question ID</TableCell>
            <TableCell align="right">Student</TableCell>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Course</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Professor</TableCell>
            <TableCell align="right">Date Received</TableCell>
            <TableCell align="right">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key={_id}>
            <TableCell component="th" scope="row">
            {_id}
            </TableCell>
            <TableCell align="right">{studentName}</TableCell>
            <TableCell align="right">{topic}</TableCell>
            <TableCell align="right">{course}</TableCell>
            <TableCell align="right">{description}</TableCell>
            <TableCell align="right">{professor}</TableCell>
            <TableCell align="right">{timestamp}</TableCell>
            <TableCell align="right">{status}</TableCell>
        
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}