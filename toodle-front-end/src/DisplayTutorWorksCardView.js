import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: 'flex',
      padding: spacing(2),
      minWidth: 288,
      borderRadius: 12,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 20,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 15,
      color: palette.grey[600],
      letterSpacing: '1px',
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});



export const DisplayTutorWorksCardView = React.memo(function DisplayTutorWorksCard(props) {
  
  const styles = useStyles();
  //deconstructing the question object
  console.log(props)            

  return (
    <Card className={cx(styles.card)} elevation={0}>
      <Avatar src={'https://i.pravatar.cc/300'} className={styles.avatar} />
      <Box>
        <h3 className={styles.heading}>Sarah Onella</h3>
        <p className={styles.subheader}>23 y.o • Canada</p>
      </Box>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
});



export default DisplayTutorWorksCardView;