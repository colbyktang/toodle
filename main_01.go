//Go file that would connect to a mongodb databse and perform CRUB operation
//JSON-for the browser to understand
//BSON - for mongodb data to understand
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Define data model:
type Student struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
	// Lastname string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
	//Creating a user token
	Token string `json:"token"`
}

//Reponse data model
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}

//create an instance for our mongodb
var client *mongo.Client

//Function to write new data into the database
func CreatePersonEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var student Student
	var result ResponseResult
	json.NewDecoder(request.Body).Decode(&student) //Assign the json body into the local variable person
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("students")
	//check to see if the data is already in the databse or not
	err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&student)
	//Analyzing the error found:
	if err != nil {
		//the information has not been registered in the database
		if err.Error() == "mongo: no documents in result" {
			//insert the user into our database
			ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
			// result, _ := collection.InsertOne(ctx, student)
			_, err = collection.InsertOne(ctx, student)
			if err != nil {
				result.Error = "Error while Creating User, Try Again"
				json.NewEncoder(response).Encode(result)
				return
			}
			result.Result = "Registration Successful"
			json.NewEncoder(response).Encode(result)
			return
		}
		result.Error = err.Error()
		json.NewEncoder(response).Encode(result)
		return
	}
	//if the user already exist, stop and do not write the user
	result.Result = "Username Already Exists!"
	json.NewEncoder(response).Encode(result)
	return
}

//function to getting documents from the collections
func getPeopleEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var students []Student                                    //creating a slice of the struct to store data from the database
	collection := client.Database("acme").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need
	for cursor.Next(ctx) {
		var student Student
		cursor.Decode(&student)
		students = append(students, student)

	}

	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(response).Encode(students)
}

//Function to handle login/authentication of users
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	//setting header for the response
	w.Header().Add("content-type", "application/json")
	var student Student
	json.NewDecoder(r.Body).Decode(&student) //Assign the json body into the local variable person
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("students")
	collection_TUTOR := client.Database("users").Collection("tutors")
	var result Student
	var res ResponseResult
	//check to see if the data is already in the databse or not (with username)
	err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
	err_TUTOR := collection_TUTOR.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
	//error handling: match the user login credentials with the database
	//if the user first is not a student, we'll check to see if they are a tutor
	if err != nil {
		//check if the user is a tutor:
		//if the user is a tutor:
		if err_TUTOR == nil {
			//The tutor username is found in the database, now we will check the password
			err_TUTOR = collection_TUTOR.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)
			//wrong password handling:
			if err_TUTOR != nil {
				res.Error = "Invalid password"
				json.NewEncoder(w).Encode(res)
				return
			}

			//Creating a token after successful login for role based examination:
			//token for tutor:
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"username": result.Username,
				"email":    result.Email,
				"tutor":    true})

			tokenString, errToken := token.SignedString([]byte("secret"))
			//error handling for token false
			if errToken != nil {
				res.Error = "Error while generating token,Try again"
				json.NewEncoder(w).Encode(res)
				return
			}

			//if user enter correct username and password combination:
			// res.Result = "Your information is correct!"
			//if every is correct, let the user in and generate a token
			res.Result = tokenString
			json.NewEncoder(w).Encode(res)
			return
		}
		res.Error = "Invalid Username"
		json.NewEncoder(w).Encode(res)
		return
	}

	//checking if password is valid:
	err = collection.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)

	if err != nil {
		res.Error = "Invalid password"
		json.NewEncoder(w).Encode(res)
		return
	}

	//Creating a token after successful login for role based examination:
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": result.Username,
		"email":    result.Email,
		"student":  true})

	tokenString, err := token.SignedString([]byte("secret"))

	if err != nil {
		res.Error = "Error while generating token,Try again"
		json.NewEncoder(w).Encode(res)
		return
	}

	//if user enter correct username and password combination:
	// res.Result = "Your information is correct!"
	//if every is correct, let the user in and generate a token
	res.Result = tokenString
	json.NewEncoder(w).Encode(res)
	return
}

// //Function to handle login/authentication of users
// func LoginHandler(w http.ResponseWriter, r *http.Request) {
// 	//setting header for the response
// 	w.Header().Add("content-type", "application/json")
// 	var student Student
// 	json.NewDecoder(r.Body).Decode(&student) //Assign the json body into the local variable person
// 	//open up our collection and write data into the databse
// 	//if there is not a databse like this, then we will create a new ones
// 	collection := client.Database("users").Collection("students")
// 	collection_TUTOR := client.Database("users").Collection("tutors")
// 	var result Student
// 	var res ResponseResult
// 	//check to see if the data is already in the databse or not (with username)
// 	err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
// 	err_TUTOR := collection_TUTOR.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
// 	//error handling: match the user login credentials with the database
// 	//if the user first is not a student, we'll check to see if they are a tutor
// 	if err != nil {
// 		//check if the user is a tutor:
// 		//if the user is a tutor:
// 		if err_TUTOR == nil {
// 			//The tutor username is found in the database, now we will check the password
// 			err_TUTOR = collection_TUTOR.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)
// 			//wrong password handling:
// 			if err_TUTOR != nil {
// 				res.Error = "Invalid password"
// 				json.NewEncoder(w).Encode(res)
// 				return
// 			}
// 			//Creating a token after successful login for role based examination:
// 			//token for tutor:
// 			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 				"username": result.Username,
// 				"email":    result.Email,
// 				"tutor":    true})

// 			tokenString, errToken := token.SignedString([]byte("secret"))
// 			//error handling for token false
// 			if errToken != nil {
// 				res.Error = "Error while generating token,Try again"
// 				json.NewEncoder(w).Encode(res)
// 				return
// 			}

// 			//if user enter correct username and password combination:
// 			// res.Result = "Your information is correct!"
// 			//if every is correct, let the user in and generate a token
// 			res.Result = tokenString
// 			json.NewEncoder(w).Encode(res)
// 			return
// 		}
// 		res.Error = "Invalid Username"
// 		json.NewEncoder(w).Encode(res)
// 		return
// 	}
// 	//checking if password is valid:
// 	err = collection.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)

// 	if err != nil {
// 		res.Error = "Invalid password"
// 		json.NewEncoder(w).Encode(res)
// 		return
// 	}
// 	//Creating a token after successful login for role based examination:
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"username": result.Username,
// 		"email":    result.Email,
// 		"student":  true})

// 	tokenString, err := token.SignedString([]byte("secret"))

// 	if err != nil {
// 		res.Error = "Error while generating token,Try again"
// 		json.NewEncoder(w).Encode(res)
// 		return
// 	}

// 	//if user enter correct username and password combination:
// 	// res.Result = "Your information is correct!"
// 	//if every is correct, let the user in and generate a token
// 	res.Result = tokenString
// 	json.NewEncoder(w).Encode(res)
// 	return
// }

//Function to create a
func main() {
	fmt.Println("Starting the application...")
	// //establish a connection to a mongodb client
	// client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	// //error handling:
	// if err != nil {
	// 	//if there is an error connecting to the mongodb database, print out that error
	// 	log.Fatal(err)
	// }
	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//establish a connection to a mongodb client
	// client, _ = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	// // //error handling:
	// // if err != nil {
	// // 	//if there is an error connecting to the mongodb database, print out that error
	// // 	log.Fatal(err)
	// // }

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	// err = client.Connect(ctx)
	// if err != nil {
	// 	//print out the error
	// 	log.Fatal(err)
	// }
	//disconnect from the database
	// defer client.Disconnect(ctx)

	// err = client.Ping(ctx, readpref.Primary())
	// if err != nil {
	// 	log.Fatal(err)
	// }

	//checking for what kind of database that we have in the server
	database, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(database)

	r := mux.NewRouter() //intialize an instance of the mux router to listen for API request
	//Setting attributes to whitelist an access
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origin := handlers.AllowedOrigins([]string{"*"})

	//define a path that would lead the function
	r.HandleFunc("/register", CreatePersonEndpoint).Methods("POST") //create a collection in the databse
	r.HandleFunc("/login", LoginHandler).Methods("POST")            //handling login request from the front-end.
	r.HandleFunc("/people", getPeopleEndpoint).Methods("GET")

	//listen on port 8000
	http.ListenAndServe(":8000", handlers.CORS(header, methods, origin)(r))
}
