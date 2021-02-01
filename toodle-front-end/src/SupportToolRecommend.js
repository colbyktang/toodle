import React from 'react'
import "./SupportToolRecommend.css"
import SupportToolCard from './SupportToolCard'
import { Grid } from "@material-ui/core";

//Creating an objec of data to be put into the cards view
const serviceData = [
    {
        title: 'Knowledge Base',
        path: 'https://stedwards.box.com/s/k53jxnhsdgnnosmaik69b091je59uw53',
        description: 'Articles detailing best practices to help with your learning effort'
    },
    {
        title: 'Trusted Advisor',
        path: '/trustedAdv',
        description: 'Show previous tutors that you would like to work with in the future'
    },
    {
        title: 'Other Resources',
        path: '/otherQuestion',
        description: 'Show other Toodle questions that may align with your learning interest'
    },
]
class SupportToolRecommend extends React.Component{
    render(){
        const getToolObject = tool => {
            return(
                <Grid item xs={12} sm={4}>
                    <SupportToolCard {...tool} />
                </Grid>
            )
        }
        return(
            <div className="support-tool-resources-container">
                <div className="support-tool-header">
                    <span>Support tools</span>
                </div>
                <div className="support-tool-card-view">
                <Grid container spacing={4} style={{paddingLeft: "40px", paddingRight: "40px", paddingTop: "10px"}}>
                    {serviceData.map(tool => getToolObject(tool))}
                </Grid>
                </div>
            </div>
        )
    }

}

export default SupportToolRecommend;