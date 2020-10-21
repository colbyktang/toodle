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

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Define data model:
type Student struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id.omitempty"`
	Username string             `json:"username,omitempty" bson:"username,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
	// Lastname string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
}

//create an instance for our mongodb
var client *mongo.Client

//Function to write new data into the database
func CreatePersonEnpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var student Student
	json.NewDecoder(request.Body).Decode(&student) //Assign the json body into the local variable person
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("students")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	result, _ := collection.InsertOne(ctx, student)
	json.NewEncoder(response).Encode(result)
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
	//define a path that would lead the function
	r.HandleFunc("/register", CreatePersonEnpoint).Methods("POST") //create a collection in the databse
	r.HandleFunc("/people", getPeopleEndpoint).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://206.189.194.211:8000"},
		AllowCredentials: true,
	})
	//listen on port 8000
	http.ListenAndServe(":8000", r)
}
