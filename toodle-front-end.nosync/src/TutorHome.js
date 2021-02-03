import React from 'react';
import TutorProfilePage from './TutorProfilePage';
import TutorBasicInfoPage from './TutorBasicInfoPage';
import { Route, Switch } from "react-router-dom";
import Drawer from './TutorHomePageNavBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex'

    }
})
export default function TutorHome(){
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <Drawer />
            <Switch>
                {/* <Route path="/TutorProfilePage" exact component={TutorProfilePage} /> */}
                <Route path="/TutorBasicInfoPage" exact component={TutorBasicInfoPage} />
                <Route exact path="/TutorProfilePage" render={props => <TutorProfilePage {...props}/>} />

            </Switch>
        </div>
    )
}

