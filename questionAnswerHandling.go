//Go file that write user question from the front end and store it into a mongodb databse
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//A class structure for question
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

// Struct for Answer
type Answer struct {
	answerID   primitive.ObjectID
	Username   string `json:"username,omitempty" bson:"username,omitempty"`
	Answer     string `json:"answer,omitempty" bson:"answer,omitempty"`
	TimeStamp  string `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	QuestionID string `json:"questionID,omitempty" bson:"questionID,omitempty"`
}

//Server reponse format:
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}

//Function to read and write user question from the front end
func getAndWriteQuestion(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var question Question
	var result ResponseResult
	//Decode the request information and assign it into a local variable
	json.NewDecoder(request.Body).Decode(&question)
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("question").Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	// cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
	//check to see if the data is already in the databse or not
	// err := collection.FindOne(context.TODO(), bson.D{{"username", student.Username}}).Decode(&student)
	//Write question into the database:
	_, err := collection.InsertOne(ctx, question)
	//error handling:
	if err != nil {
		result.Error = "Error while Storing Question, Try Again"
		json.NewEncoder(response).Encode(result)
		return
	}

	result.Result = "Question Stored"
	json.NewEncoder(response).Encode(result)
	return

}

//Function to get all question currently stored in the database:
func getAllQuestions(response http.ResponseWriter, request *http.Request) {
	fmt.Println("getAllQuestions()")
	response.Header().Add("content-type", "application/json") //setting the header
	//creating a list of class object to store all element from the databse into a list
	var questions []Question
	//connecting to the databse and its collection to pull data from
	collection := client.Database("question").Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
	//Error handling the database is unable to find the requested information
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need
	//append them into a list of objects
	for cursor.Next(ctx) {
		var question Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}
	//error handling:
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	//send them to the front end:
	json.NewEncoder(response).Encode(questions)
}

//Function to get all questions from a user:
func getAllUserQuestions(response http.ResponseWriter, request *http.Request, username string) {
	fmt.Println("getAllUserQuestions()")
	response.Header().Add("content-type", "application/json") //setting the header

	//creating a list of class object to store all element from the databse into a list
	var questions []Question

	//connecting to the database and its collection to pull data from
	collection := client.Database("question").Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	cursor, err := collection.Find(ctx, bson.M{"username": username})   //return everything in our collections

	//Error handling the database is unable to find the requested information
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)

	//loop through the mongodb data objects and look for the data that we need
	//append them into a list of objects
	for cursor.Next(ctx) {
		var question Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}

	//error handling:
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	//send them to the front end:
	json.NewEncoder(response).Encode(questions)
}

//Function to get a question type based on the user id from the database:
func getQuestionFromParams(response http.ResponseWriter, request *http.Request) {
	//Setting the header:
	response.Header().Add("content-type", "application/json")
	params := mux.Vars(request)
	//creating a list of class object to store all element from the databse into a list
	var questions []Question
	//connecting to the databse and its collection to pull data from
	collection := client.Database("question").Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	//rettrieve any collections that matchs the student_id that was sent in from the url parameter
	cursor, err := collection.Find(ctx, bson.M{"student_ID": params["studentID"]})
	//Error handling the database is unable to find the requested information
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need to find
	//append them into a list of objects
	for cursor.Next(ctx) {
		var question Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}
	//error handling:
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	//send them to the front end:
	json.NewEncoder(response).Encode(questions)

}

//create an instance for our mongodb
var client *mongo.Client

//main function to handle API enpoints and connect services to handle the request
func main() {
	fmt.Println("Starting the question/answer listener...")
	// //establish a connection to a mongodb client
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
	r.HandleFunc("/question", getAndWriteQuestion).Methods("POST") //create a collection in the databse
	// r.HandleFunc("/login", LoginHandler).Methods("POST")           //Authenticate users already registered in the database
	r.HandleFunc("/getAllQuestions", getAllQuestions).Methods("GET")
	r.HandleFunc("/getThisQuestion/{studentID}", getQuestionFromParams).Methods("GET") //Function to retrieve a question based on the user_id.
	//listen on port 8000
	http.ListenAndServe(":8080", handlers.CORS(header, methods, origin)(r))
}
