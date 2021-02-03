import React from 'react';
import './Promotion.css';
import PromotionCard from './PromotionCard'
import { Grid } from "@material-ui/core";
import img1 from './img/Best-Programming-Languages-to-Start-Learning-Today.jpg';
import img2 from './img/Competitive-Programming-1.jpg'
import img3 from './img/download.jpeg'
import img4 from './img/cloud-knowledge.jpeg'
//Creating an objec of data to be put into the cards view
const promotionData = [
    {
        title: 'Knowledge base',
        img: img4,
        description: 'Help Toodle customers get access to quick and accurate information about any topics.',
        path: 'https://stedwards.box.com/s/k53jxnhsdgnnosmaik69b091je59uw53'
    },
    {
        title: 'Programming Languages',
        img: img1,
        description: 'A programming language lets you express computational tasks in certain ways.',
        path: 'https://stedwards.box.com/s/gj1h350qt7yzhe6sf4o1cgirdb30biau'
    },
    {
        title: 'Computer Algorithm',
        img: img2,
        description: 'Understanding the solutions to standard problem gives more coding power.',
        path: 'https://stedwards.box.com/s/b7og95w3wxjaslt5jounq9za16ty8sbg'
    },
    {
        title: 'Sciences',
        img: img3,
        description: 'Learning about other sciences and getting quick helps with your homework.',
        path: 'https://stedwards.box.com/s/25db2ciy0hu7gjewiqikt8qwqxig3v3v'
    },

    
]
class Promotion extends React.Component{
    render(){
        const getPromotionObject = promo => {
            return(
                <Grid item xs={12} sm={3}>
                    <PromotionCard {...promo} />
                </Grid>
            )
        }
        return(
            <div className="Contents">

                <div className="Header">
                    <h1>What do you want to ask?</h1>
                    <p>You can get free tutor helps on your homework. Tutor are available to answer your question the moment you sent to us</p>
                </div>
                
                <div className="PromotionCard">
                    <Grid container spacing={1} style={{paddingLeft: "40px",paddingTop: "10px"}}>
                        {promotionData.map(promo => getPromotionObject(promo))}

                    </Grid>
                </div>
            </div>

        );
    };
};

//Export the components: 
export default Promotion;