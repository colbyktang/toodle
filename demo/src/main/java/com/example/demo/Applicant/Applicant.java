package com.example.demo.Applicant;

import javax.persistence.Entity;
import javax.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Entity
//Applicant data model:
@Document(collection = "applicants")
public class Applicant {
    //applicant data attributes
    @Id
    private String ID;
    private String ApplicantName;
    private String ApplicantEmail;
    private String ApplicantPhone;
    private String Position;
    private String ApplicantLinkedin;
    private String ApplicantTwitter;
    private String ApplicantPortfolio;
    private String OtherInformation;
    private String ExtraComment;
    private String ApplicantStatus;

    //constructor:
    public Applicant(String ID, String ApplicantName, String ApplicantEmail, String ApplicantPhone, String Position, String ApplicantLinkedin, String ApplicantTwitter, String ApplicantPortfolio, String OtherInformation, String ExtraComment, String ApplicantStatus) {
        this.ID = ID;
        this.ApplicantName = ApplicantName;
        this.ApplicantEmail = ApplicantEmail;
        this.ApplicantPhone = ApplicantPhone;
        this.Position = Position;
        this.ApplicantLinkedin = ApplicantLinkedin;
        this.ApplicantTwitter = ApplicantTwitter;
        this.ApplicantPortfolio = ApplicantPortfolio;
        this.OtherInformation = OtherInformation;
        this.ExtraComment = ExtraComment;
        this.ApplicantStatus = ApplicantStatus;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getApplicantName() {
        return ApplicantName;
    }

    public void setApplicantName(String applicantName) {
        ApplicantName = applicantName;
    }

    public String getApplicantEmail() {
        return ApplicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        ApplicantEmail = applicantEmail;
    }

    public String getApplicantPhone() {
        return ApplicantPhone;
    }

    public void setApplicantPhone(String applicantPhone) {
        ApplicantPhone = applicantPhone;
    }

    public String getPosition() {
        return Position;
    }

    public void setPosition(String position) {
        Position = position;
    }

    public String getApplicantLinkedin() {
        return ApplicantLinkedin;
    }

    public void setApplicantLinkedin(String applicantLinkedin) {
        ApplicantLinkedin = applicantLinkedin;
    }

    public String getApplicantTwitter() {
        return ApplicantTwitter;
    }

    public void setApplicantTwitter(String applicantTwitter) {
        ApplicantTwitter = applicantTwitter;
    }

    public String getApplicantPortfolio() {
        return ApplicantPortfolio;
    }

    public void setApplicantPortfolio(String applicantPortfolio) {
        ApplicantPortfolio = applicantPortfolio;
    }

    public String getOtherInformation() {
        return OtherInformation;
    }

    public void setOtherInformation(String otherInformation) {
        OtherInformation = otherInformation;
    }

    public String getExtraComment() {
        return ExtraComment;
    }

    public void setExtraComment(String extraComment) {
        ExtraComment = extraComment;
    }

    public String getApplicantStatus() {
        return ApplicantStatus;
    }

    public void setApplicantStatus(String applicantStatus) {
        ApplicantStatus = applicantStatus;
    }

    @Override
    public String toString(){
        return "Applicant{" +
                "id=" + ID +
                ", name='" + ApplicantName + '\'' +
                ", email='" + ApplicantEmail + '\'' +
                ", phone=" + ApplicantPhone +
                ", position=" + Position +
                ", ApplicantLinkedin=" + ApplicantLinkedin +
                ", ApplicantTwitter=" + ApplicantTwitter +
                ", ApplicantPortfolio=" + ApplicantPortfolio +
                ", OtherInformation=" + OtherInformation +
                ", ExtraComment=" + ExtraComment +
                ", ApplicantStatus=" + ApplicantStatus +
                '}';

    }
}
