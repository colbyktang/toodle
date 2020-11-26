package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

// Student data model:
type Student struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`

	//Creating a user token
	Token string `json:"token"`
}

// Response data model
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}
