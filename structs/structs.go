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
