import React from 'react';
import "./TutorJobPosting.css"
import logo from './img/favicon.ico'

class TutorJobPosting extends React.Component{
    render(){
        return(
            <div>
                <div className="toodle-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <a href="/">Toodle</a>
                </div>

                <div className="content-wrapper-posting-page">
                    <div className="section-page">
                        <div className="posting-headline">
                            <h2>Tutor, Computer Science & Math</h2>
                            <div className="category">
                                Austin, Texas / TEACHING / REMOTE
                            </div>
                        </div>

                        <div className="apply-btn-wrapper">
                            <a href="/TutorApplyFormPage">Apply for this job</a>
                        </div>
                    </div>
                </div>


                <div className="content-wrapper-job-description">
                    <div className="job-description">
                        <div className="disclaimer">
                            <b>
                                Toodle is continuing to hire with all interviewing and on-boarding done virtually due to COVID-19. All new and existing Atlassians will continue to work from home until it’s safe to return to our offices. When our offices re-open, every Atlassian will have the choice to work from an office or from home.
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b>
                                Toodle is looking for a backend software engineer to join our Enterprise and Migrations team. You’ll be joining a team focused on building features for our enterprise-scale customers to enable better governance, trust, and security. Our team has a direct impact on the growth of Atlassian and is the proud owner of the Atlassian Access product. We are enabling cross-product experiences, and are committed to removing all blockers for adoption of cloud for enterprise customers.
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b style={{fontSize: "18px", fontWeight: "bold"}}>
                                More about you
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b>
                                As a backend software engineer on this team, you will work with a talented team of Product Managers, Designers, and Architects to build application-layer services encompassing backend development, monitoring, scaling and optimizing to make the administration of Atlassian products simple at Enterprise scale.                            
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b>
                                You will be empowered to drive innovation by coming up with new and exciting ideas to creatively solve issues, as well as actively look for opportunities to improve the design, interface, and architecture of Atlassian's products on the cloud.                            
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b style={{fontSize: "18px", fontWeight: "bold"}}>
                                Requirement
                            </b>
                            <ul className="posting-requirement-plain-list">
                                <ul>
                                    <li>
                                        + Bachelor's degree in Engineering, Computer Science, or equivalent
                                    </li>
                                    <li>
                                        + Experience crafting and implementing highly scalable and performant RESTful micro-services
                                    </li>
                                    <li>
                                        + Proficiency in any modern object-oriented programming language (e.g., Java, Scala, Python, Javascript, etc.)
                                    </li>
                                    <li>
                                        + Real passion for collaboration and strong interpersonal and communication skills
                                    </li>
                                    <li>
                                        + BacBroad knowledge and understanding of SaaS, PaaS, IaaS industry with hands-on experience of public cloud offerings (AWS, GAE, Azure)
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b style={{fontSize: "18px", fontWeight: "bold"}}>
                                More about Toodle
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b>
                                Creating software that empowers everyone from small startups to the who’s who of tech is why we’re here. We build tools like Jira, Confluence, Bitbucket, and Trello to help teams across the world become more nimble, creative, and aligned—collaboration is the heart of every product we dream of at Atlassian. From Amsterdam and Austin, to Sydney and San Francisco, we’re looking for people who want to write the future and who believe that we can accomplish so much more together than apart.                             
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b style={{fontSize: "18px", fontWeight: "bold"}}>
                                Additional Information
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>
                        <div className="description">
                            <b>
                                We believe that the unique contributions of all Atlassians is the driver of our success. To make sure that our products and culture continue to incorporate everyone's perspectives and experience we never discriminate on the basis of race, religion, national origin, gender identity or expression, sexual orientation, age, or marital, veteran, or disability status.                            
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>

                        <div className="description">
                            <b>
                                All your information will be kept confidential according to EEO guidelines.                            
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>

                        <div className="apply-button">
                            <b>
                                <a href="/TutorApplyFormPage">Apply for this job</a>                            
                            </b>
                        </div>
                        <div>
                            <br></br>
                        </div>

                    </div>

                    
                </div>
            </div>
        )
    }

}


export default TutorJobPosting