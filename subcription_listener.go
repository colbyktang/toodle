/*
This service will handle basic CRUD operation on user's subscribe topic/courses that are being offered on Toodle
*/
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/colbyktang/toodle/structs"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Create an instance for Mongodb through mongodriver
var client *mongo.Client

//Function to add selected courses to the user data
func addSubscription(response http.ResponseWriter, request *http.Request) {
	//Setting header for the response type
	response.Header().Add("content-type", "application/json")
	var res structs.ResponseResult
	var subscription structs.User
	json.NewDecoder(request.Body).Decode(&subscription)
	fmt.Println(subscription)
	/* Getting the user id from the url and convert it into a hex id */
	params := mux.Vars(request)
	objID, err := primitive.ObjectIDFromHex(params["userID"])
	userType := params["user_type"]
	//Error handling: Error in generating object id from hex
	if err != nil {
		fmt.Println("Objectid from hex Error", err)
	} else {
		fmt.Println("Objectid from hex", objID)
	}
	fmt.Println(userType)
	/* Mongodb client connection */
	// open up collection and write data
	// create a new database if it doesn't already exist
	collection := client.Database("users").Collection("")

	if userType == "student" {
		collection = client.Database("users").Collection("students")
	} else if userType == "tutor" {
		collection = client.Database("users").Collection("tutors")
	} else if userType == "professor" {
		collection = client.Database("users").Collection("professors")
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	filter := bson.M{"_id": bson.M{"$eq": objID}} //find the document based on the id from the url param
	added := bson.M{"$set": bson.M{
		"subscription": subscription.Subscription,
	},
	}
	// Call the driver's UpdateOne() method and pass filter and update to it
	result, err := collection.UpdateOne(
		ctx,
		filter,
		added,
	)

	//Error handling: Unable to write the data correctly
	if err != nil {
		res.Error = "Error updating user info, please contact system administration"
		json.NewEncoder(response).Encode(res)
		fmt.Println("UpdateOne() error")
		fmt.Println(err)
		return
	}

	fmt.Println("UpdateOne() result:", result)
	fmt.Println("UpdateOne() result TYPE:", reflect.TypeOf(result))
	fmt.Println("UpdateOne() result MatchedCount:", result.MatchedCount)
	fmt.Println("UpdateOne() result ModifiedCount:", result.ModifiedCount)
	fmt.Println("UpdateOne() result UpsertedCount:", result.UpsertedCount)
	fmt.Println("UpdateOne() result UpsertedID:", result.UpsertedID)
	res.Result = "Subscription Successfully Added!"
	json.NewEncoder(response).Encode(res)
	return
}

//Function to get questions based on the user subscribed concepts
func getQuestionsBasedOnSubscription(response http.ResponseWriter, request *http.Request) {
	//Setting response header:
	response.Header().Add("content-type", "application/json")
	//we use this to store all questions found
	var questions []structs.Question
	//create a response
	// var res structs.ResponseResult
	//storing the subscription from request
	var subscription structs.User
	json.NewDecoder(request.Body).Decode(&subscription)
	fmt.Println(subscription)
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("question").Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	//finding the all question documents in the db
	cursor, err := collection.Find(ctx, bson.M{"course": bson.M{"$in": subscription.Subscription}})
	//error handling if db cannot find the documents:
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err)
		return
	}
	//close the connection to mongo, after we have found the objects
	defer cursor.Close(ctx)

	//loop through the mongodb response and assign it into a response array
	for cursor.Next(ctx) {
		var question structs.Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}

	//error handling if we cannot add the object into the responsce array
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err)
		return
	}
	//send the response array to the questions
	json.NewEncoder(response).Encode(questions)
}

//Main function to run this service
func main() {
	fmt.Println("Starting Subscription Service...")
	//Connecting to the mongodb client
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
	r.HandleFunc("/addSubscription/{userID}/{user_type}", addSubscription).Methods("POST")
	//Endpoints to get the questions that matches the topics:
	r.HandleFunc("/getMatchingTopics", getQuestionsBasedOnSubscription).Methods("GET")
	fmt.Println("Finished Setting Up!")
	fmt.Println("Service now running on port 8081")

	//Listen on port 8081
	http.ListenAndServe(":8081", handlers.CORS(header, methods, origin)(r))

}
