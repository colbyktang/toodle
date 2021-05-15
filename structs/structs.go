package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

// User data model:
type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`

	// Access level
	Level uint8 `json:"level,omitempty" bson:"level,omitempty"`

	//Creating a user token
	Token string `json:"token"`
	//Subscribed topics/courses that user want to follow
	Subscription []string `json:"subscription,omitempty" bson:"subscription,omitempty"`
}

// Response data model
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}

// Question is the main question the student asked
type Question struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Topic       string             `json:"topic,omitempty" bson:"topic,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Course      string             `json:"course,omitempty" bson:"course,omitempty"`
	Professor   string             `json:"professor,omitempty" bson:"professor,omitempty"`
	Status      string             `json:"status,omitempty" bson:"status,omitempty"`
	TimeStamp   string             `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	StudentName string             `json:"studentName,omitempty" bson:"studentName,omitempty"`
	StudentID   string             `json:"student_ID,omitempty" bson:"student_ID,omitempty"`
}

//Applicant data model:
type Applicant struct {
	ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ProfessorID        string             `json:"professor_id,omitempty" bson:"professor_id,omitempty"`
	ApplicantName      string             `json:"applicantName,omitempty" bson:"applicantName,omitempty"`
	ApplicantEmail     string             `json:"applicantEmail,omitempty" bson:"applicantEmail,omitempty"`
	ApplicantPhone     string             `json:"applicantPhone,omitempty" bson:"applicantPhone,omitempty"`
	Position           string             `json:"position,omitempty" bson:"position,omitempty"`
	ApplicantLinkedin  string             `json:"applicantLinkedin,omitempty" bson:"applicantLinkedin,omitempty"`
	ApplicantTwitter   string             `json:"applicantTwitter,omitempty" bson:"applicantTwitter,omitempty"`
	ApplicantGitHub    string             `json:"applicantGitHub,omitempty" bson:"applicantGitHub,omitempty"`
	ApplicantPortfolio string             `json:"applicantPortfolio,omitempty" bson:"applicantPortfolio,omitempty"`
	OtherInformation   string             `json:"applicantOther,omitempty" bson:"applicantOther,omitempty"`
	ExtraComment       string             `json:"extraComment,omitempty" bson:"extraComment,omitempty"`
	ApplicantStatus    string             `json:"status,omitempty" bson:"status,omitempty"`
}

//Course data model:
type Course struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CourseName        string             `json:"courseName,omitempty" bson:"courseName,omitempty"`
	CourseDescription string             `json:"courseDescription,omitempty" bson:"courseDescription,omitempty"`
	Professors        []string           `json:"professors,omitempty" bson:"professors,omitempty"` //who is current teaching this course
	Schools           []string           `json:"schools,omitempty" bson:"schools,omitempty"`       //Which schools is offering this course
	Semesters         []string           `json:"semesters,omitempty" bson:"semesters,omitempty"`   //Semester offered
}
