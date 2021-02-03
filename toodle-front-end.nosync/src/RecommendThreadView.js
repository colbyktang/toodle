import React from "react";
import RecQuestionThreadView from "./RecQuestionThreadView"
import RecAnswerThreadView from "./RecAnswerThreadView"

class RecommendThreadView extends React.Component{
    render(){
        return(
            <div className="showInfo">
                <RecQuestionThreadView />
                <RecAnswerThreadView />
            </div>
        )
    }
}


export default RecommendThreadView;