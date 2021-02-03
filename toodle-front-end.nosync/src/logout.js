import React from 'react';
import { Redirect } from 'react-router-dom';

class logout extends React.Component{
    render(){
        localStorage.clear();
        return <Redirect to='/' />
    }
}


export default logout