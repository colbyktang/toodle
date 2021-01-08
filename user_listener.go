/* Go file that would connect to a mongodb database and perform CRUD operation
JSON - for the browser to understand
BSON - for mongodb data to understand
Listens on port 8000, mongodb listens on 27017 */
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/colbyktang/toodle/structs"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Create an instance for Mongodb
var client *mongo.Client

// RegisterUser writes new user data into the database
func RegisterUser(response http.ResponseWriter, request *http.Request) {

	// Setting the header
	response.Header().Add("content-type", "application/json")
	var student structs.Student
	var result structs.ResponseResult
	json.NewDecoder(request.Body).Decode(&student) //Assign the json body into the local variable person

	// open up collection and write data
	// create a new database if it doesn't already exist
	collection := client.Database("users").Collection("students")

	// check to see if the data is already in the database or not
	err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&student)

	// Analyzing the error found:
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

	// if the user already exist, stop and do not write the user
	result.Result = "Username Already Exists!"
	json.NewEncoder(response).Encode(result)
	return
}

/* Function to update the user account based on the api request from the Front End */
func updateUserAccount(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var student structs.Student
	var res structs.ResponseResult
	json.NewDecoder(request.Body).Decode(&student)
	/* Getting the user id from the url and convert it into a hex id */
	params := mux.Vars(request)
	objID, err := primitive.ObjectIDFromHex(params["userID"])

	if err != nil {
		fmt.Println("Objectid from hex Error", err)
	} else {
		fmt.Println("Objectid from hex", objID)
	}

	/* Mongodb client connection */

	collection := client.Database("users").Collection("students")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	filter := bson.M{"_id": bson.M{"$eq": objID}} //find the document based on the id from the url param
	update := bson.M{"$set": bson.M{              //update the fields accordingly
		"username": student.Username,
		"email":    student.Email,
		"password": student.Password,
	},
	}

	// Call the driver's UpdateMany() method and pass filter and update to it
	result, err := collection.UpdateMany(
		ctx,
		filter,
		update,
	)

	//error checking:
	if err != nil {
		res.Error = "Error updating user info, please contact system administration"
		json.NewEncoder(response).Encode(res)
		fmt.Println("UpdateMany() error")
		return

	}

	fmt.Println("UpdateMany() result:", result)
	fmt.Println("UpdateMany() result TYPE:", reflect.TypeOf(result))
	fmt.Println("UpdateMany() result MatchedCount:", result.MatchedCount)
	fmt.Println("UpdateMany() result ModifiedCount:", result.ModifiedCount)
	fmt.Println("UpdateMany() result UpsertedCount:", result.UpsertedCount)
	fmt.Println("UpdateMany() result UpsertedID:", result.UpsertedID)
	res.Result = "Account Updated"
	json.NewEncoder(response).Encode(res)
	return

}

// GetUsers gets documents from collections
func GetUsers(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var students []structs.Student                            //creating a slice of the struct to store data from the database
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
		var student structs.Student
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

// LoginUser handles login/authentication of users
func LoginUser(w http.ResponseWriter, r *http.Request) {
	//setting header for the response
	w.Header().Add("content-type", "application/json")
	var student structs.Student
	json.NewDecoder(r.Body).Decode(&student) //Assign the json body into the local variable person
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("students")
	collectionTutor := client.Database("users").Collection("tutors")
	var result structs.Student
	var res structs.ResponseResult
	//check to see if the data is already in the databse or not (with username)
	err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
	errTutor := collectionTutor.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&result)
	//error handling: match the user login credentials with the database
	//if the user first is not a student, we'll check to see if they are a tutor
	if err != nil {
		//check if the user is a tutor:
		//if the user is a tutor:
		if errTutor == nil {
			//The tutor username is found in the database, now we will check the password
			errTutor = collectionTutor.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)
			//wrong password handling:
			if errTutor != nil {
				res.Error = "Invalid password"
				json.NewEncoder(w).Encode(res)
				return
			}

			//Creating a token after successful login for role based examination:
			//token for tutor:
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"username": result.Username,
				"id":       result.ID,
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
		"id":       result.ID,
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

func main() {
	fmt.Println("Starting the main application....")
	// //establish a connection to a mongodb client
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	fmt.Println("Established a connection to MongoDB on port 27017.")

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
	r.HandleFunc("/register", RegisterUser).Methods("POST") //create a collection in the databse
	r.HandleFunc("/login", LoginUser).Methods("POST")       //handling login request from the front-end.
	r.HandleFunc("/people", GetUsers).Methods("GET")
	r.HandleFunc("/updateUser/{userID}", updateUserAccount).Methods("POST")
	fmt.Println("Finished setting up!")
	fmt.Println("Listening on port 8000...")

	//listen on port 8000
	http.ListenAndServe(":8000", handlers.CORS(header, methods, origin)(r))

}
