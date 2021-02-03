import React from "react";
import "./TutorApplyFormPage.css";
import logo from './img/favicon.ico'
import axios from 'axios';
class TutorApplyFormPage extends React.Component{

    state = {
        //Initially, no file is selected
        selectedFile: null
    }

    onFileChange = event => {
        //Update the state: 
        this.setState({ selectedFile: event.target.files[0] });
    };

    //Click the upload button: 
    onFileUpload = () => {
        //create an object of form data
        const formData = new FormData();

        //Update the form data object
        formData.append("applicantResume",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        //Details of the uploaded file:
        // console.log(this.state.selectedFile);
        // console.log(formData.get('applicantResume'))
        // basic error handling, the field must be filled out:
        const applicantName = document.getElementById('applicantName').value
        const applicantEmail = document.getElementById('applicantEmail').value
        const applicantPhone = document.getElementById('applicantPhone').value
        const applicantLinkedin = document.getElementById('applicantLinkedin').value
        const applicantTwitter = document.getElementById('applicantTwitter').value
        const applicantGitHub = document.getElementById('applicantGitHub').value
        const applicantPortfolio = document.getElementById('applicantPortfolio').value
        const applicantOther = document.getElementById('applicantOther').value
        const extraComment = document.getElementById('extraComment').value
        const applicantResume = formData.get('applicantResume')
    
        if(applicantName == ""){
            alert("Name must be filled out!");
            return false;
        }
        if(applicantEmail == ""){
            alert("Email must be filled out!");
            return false;
        }
        if(applicantPhone == ""){
            alert("Phone must be filled out!");
            return false;
        }
        // if(applicantLinkedin == ""){
        //     alert("Name must be filled out!");
        //     return false;
        // }
        // if(applicantTwitter == ""){
        //     alert("Name must be filled out!");
        //     return false;
        // }
        // if(applicantGitHub == ""){
        //     alert("Name must be filled out!");
        //     return false;
        // }
        // if(applicantPortfolio == ""){
        //     alert("Name must be filled out!");
        //     return false;
        // }
        // if(applicantOther == ""){
        //     alert("Name must be filled out!");
        //     return false;
        // }
        // if(extraComment == ""){
        //     alert("Name must be filled out!");
        //     return false;
        
        //if all forms has been filled, send the information out using axio
        let request = {
            applicantName: applicantName,
            applicantEmail: applicantEmail,
            applicantPhone: applicantPhone,
            applicantLinkedin: applicantLinkedin,
            applicantTwitter: applicantTwitter,
            applicantGitHub: applicantGitHub,
            applicantPortfolio: applicantPortfolio,
            applicantOther: applicantOther,
            extraComment: extraComment,
            applicantResume: applicantResume,
            status: "application_in_transit"
        }
        // axios.post('http://206.189.194.211:8080/question', request
        axios.post('http://localhost:8001/sendJobApplication', request)
        .then(response => {
            console.log(request)
            alert("Your application has been successfully submitted, our team will reach out to you once we have found a match with a team.")
        })
    
        //error handling: 
        .catch(err => {
            console.log(request);
            alert(err);
        })
    };
    //File content to be displayed after 
    //file upload is complete
    fileDate = () =>{
        if(this.state.selectedFile){
            return(
                <div> 
                    <h2>File Details:</h2> 
                    <p>File Name: {this.state.selectedFile.name}</p> 
                    <p>File Type: {this.state.selectedFile.type}</p> 
                    <p> 
                    Last Modified:{" "} 
                    {this.state.selectedFile.lastModifiedDate.toDateString()} 
                    </p> 
              </div> 
            )
        } else {
            return(
                <div>
                    <br></br>
                </div>
            )
        }
    }
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
                    </div>
                </div>

                <div className="form-content-main-wrapper">
                        <br></br>
                        <h4>Submit your application</h4>
                        <ul>
                            <li className="application-question-resume">
                                <label>
                                    <div className="application-label">
                                        Resume/CV
                                        <span className="required">*</span>
                                        <div className="resume-submit-btn">
                                            <input type="file" onChange={this.onFileChange} />
                                            {/* <button onClick={this.onFileUpload}>Upload</button> */}
                                        </div>
                                    </div>
                                    {/* <div>
                                        <br>
                                        </br>
                                    </div> */}
                                    <div className="application-field">
                                        <a href="#" className="posting-resume-btn"></a>
                                    </div>
                                </label>
                            </li>

                            <li className="application-question">
                                <label>
                                    <div className="application-label">
                                        Full Name
                                        <span className="required">*</span>
                                        <div className="application-field">
                                            <input type="text" className="applicant-input-field" id="applicantName" />
                                        </div>
                                    </div>

                                </label>
                            </li>
                            <li className="application-question">
                                <label>
                                    <div className="application-label">
                                        Email
                                        <span className="required">*</span>
                                        <div className="application-field">
                                            <input type="text" className="applicant-input-field" id="applicantEmail" />
                                        </div>
                                    </div>

                                </label>
                            </li>
                            <li className="application-question">
                                <label>
                                    <div className="application-label">
                                        Phone
                                        <span className="required">*</span>
                                        <div className="application-field">
                                            <input type="text" className="applicant-input-field" id="applicantPhone" />
                                        </div>
                                    </div>

                                </label>
                            </li>
                        </ul>

                        <div className="applicant-links">
                            <h4>Links</h4>
                            <ul>
                                <li className="application-question">
                                    <label>
                                        <div className="application-label">
                                            Linkedin URL
                                            <span className="required">*</span>
                                            <div className="application-field">
                                                <input type="text" className="applicant-input-field" id="applicantLinkedin" />
                                            </div>
                                        </div>
                                    </label>                              

                                </li>
                                <li className="application-question">
                                    <label>
                                        <div className="application-label">
                                            Twitter URL
                                            <span className="required">*</span>
                                            <div className="application-field">
                                                <input type="text" className="applicant-input-field" id="applicantTwitter" />
                                            </div>
                                        </div>
                                    </label>                              
                                </li>
                                <li className="application-question">
                                    <label>
                                        <div className="application-label">
                                            GitHub URL
                                            <span className="required">*</span>
                                            <div className="application-field">
                                                <input type="text" className="applicant-input-field" id="applicantGitHub" />
                                            </div>
                                        </div>
                                    </label>                              

                                </li>
                                <li className="application-question">
                                    <label>
                                        <div className="application-label">
                                            Portfolio URL
                                            <span className="required">*</span>
                                            <div className="application-field">
                                                <input type="text" className="applicant-input-field" id="applicantPortfolio" />
                                            </div>
                                        </div>

                                    </label>                              
                                </li>
                                <li className="application-question">
                                    <label>
                                        <div className="application-label">
                                            Other Website
                                            <span className="required">*</span>
                                            <div className="application-field">
                                                <input type="text" className="applicant-input-field" id="applicantOther" />
                                            </div>
                                        </div>
                                    </label>                              
                                </li>
                            </ul>
                        </div>

                        <div className="additional-info">
                            <h4>Additional Information</h4>
                            <textarea placeholder="Add a cover letter or anything else that want to share." className="extra-comments" id="extraComment"></textarea>
                        </div>

                        <div className="apply-btn-wrapper">
                            <button type="submit" className="btn" onClick={this.onFileUpload}>APPLY</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default TutorApplyFormPage;