package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

// User data model:
type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`

	// Access level
	Level uint8 `json:"level,omityempty" bson:"level,omitempty"`

	//Creating a user token
	Token string `json:"token"`
}

// Response data model
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}
