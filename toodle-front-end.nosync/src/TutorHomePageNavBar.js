import React from "react";
import { Drawer as MUIDrawer, ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {withRouter} from 'react-router-dom';
const useStyles = makeStyles({
    drawer: {
        width: '100px'

    }
})
const Drawer = props => {
    const {history} = props;
    const classes = useStyles();
    const itemList = [
        {   
            text: 'Cases',
            icon: <InboxIcon />,
            onClick: () => history.push('/TutorLandingPage')
        }, 
        {
            text: 'Personal Information',
            icon: <MailIcon />,
            onClick: () => history.push('/TutorBasicInfoPage')
        }, 
        {
            text: 'Statistic',
            icon: <MailIcon />,
            onClick: () => history.push('/TutorProfilePage')
        }, 
        {
            text: 'About',
            icon: <MailIcon />,
            onClick: () => history.push('/About')
        }
    ]
    return(
        <MUIDrawer variant="permanent" className={classes.drawer}>
            <List>
                {itemList.map((item, index) => {
                    const { text, icon, onClick } = item;
                    return(
                    <ListItem button key={text} onClick={onClick}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        
                        <ListItemText primary={text} />
                    </ListItem>
                    )}
            )}
            </List>        
        </MUIDrawer>
    )
}

export default withRouter(Drawer);