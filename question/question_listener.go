//Go file that write user question from the front end and store it into a mongodb database

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/colbyktang/toodle/structs"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

// Answer is the replies to the main question the student asked
type Answer struct {
	AnswerID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	StudentID   string             `json:"studentID,omitempty" bson:"studentID,omitempty"`
	StudentName string             `json:"studentName,omitempty" bson:"studentName,omitempty"`
	TutorID     string             `json:"tutorID,omitempty" bson:"tutorID,omitempty"`
	TutorName   string             `json:"tutorName,omitempty" bson:"tutorName,omitempty"`
	// Username   string             `json:"username,omitempty" bson:"username,omitempty"`
	Answer     string `json:"answer,omitempty" bson:"answer,omitempty"`
	TimeStamp  string `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
	QuestionID string `json:"questionID,omitempty" bson:"questionID,omitempty"`
}

// Function to read and write user question from the front end
func getAndWriteQuestion(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var question Question
	var result structs.ResponseResult
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

//Function to create an answer object:
func createAnswerObject(response http.ResponseWriter, request *http.Request) {
	//setting the header:
	response.Header().Add("content-type", "application/json")
	var answer Answer
	var result structs.ResponseResult

	//decode the request and store the information into the database:
	json.NewDecoder(request.Body).Decode(&answer)
	//open up the collection and write data into the database
	//if there is not already a database, create a new databse and write it to the db
	collection := client.Database("answer").Collection("Answers")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return the error
	//write the answer object into the datbase:
	_, err := collection.InsertOne(ctx, answer)
	//error handling:
	if err != nil {
		result.Error = "Error while storing Answer, Try Again"
		json.NewEncoder(response).Encode(result)
		return
	}

	result.Result = "Question stored"
	json.NewEncoder(response).Encode(result)
	return
}

//Function to upate a question status:
func updateQuestionStatus(response http.ResponseWriter, request *http.Request) {
	//setting the header
	response.Header().Add("content-type", "application/json")
	// //Creating an instance of the question object
	// var result ResponseResult

	//get the question id from the parameters:
	params := mux.Vars(request)
	//getting the database info
	database := client.Database("question")
	quesCollection := database.Collection("Questions")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error

	id, _ := primitive.ObjectIDFromHex(params["question_id"])

	result_1, err := quesCollection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.D{
			{"$set", bson.D{{"status", params["status"]}}},
		},
	)
	if err != nil {
		log.Fatal(err)

	}

	fmt.Printf("Updated %v Documents! \n", result_1.ModifiedCount)
} //end of updateQuestionStatus()

//Function to return all active question currently stored in the database:
func getActiveQuestions(response http.ResponseWriter, request *http.Request) {
	//setting the header:
	response.Header().Add("content-type", "application/json")
	//create a list of all active question to be returned back to the front end
	var questions []Question
	//array of all possible active question status: new, open, pending
	statusArray := []string{"new", "open", "pending"}
	//connecting to the mongodb database clients:
	collection := client.Database("question").Collection("Questions")
	//waiting time until returns error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//finding the documents with active status:
	cursor, err := collection.Find(ctx, bson.M{"status": bson.M{"$in": statusArray}})
	//Error handling the database is unable to find the requested information
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err)
		return
	}

	defer cursor.Close(ctx)

	//loop through the mongodb objects that we have found and append them into a response objects that
	//would be sent out to the Front end:
	for cursor.Next(ctx) {
		var question Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}

	//error handling: unable to write objects into a response
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err)
		return
	}
	fmt.Println(questions)
	//if everything works out fine, send the package to the front end:
	json.NewEncoder(response).Encode(questions)
} //end of getActiveQuestions()

//Function to get all resolved question from the database:
func getAllResolvedQuestions(response http.ResponseWriter, request *http.Request) {
	//settting the header:
	response.Header().Add("content-type", "application/json")
	//creating an instance of the question object
	var questions []Question
	//mongodb connection:
	collection := client.Database("question").Collection("Questions")
	//wainting time until the returns a error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//finding the resolved documents in the db
	cursor, err := collection.Find(ctx, bson.M{"status": "closed"})
	//error handling if db cannot find the documents:
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err)
		return
	}
	defer cursor.Close(ctx)

	//loop through the mongodb objects and add them into an array as a server response
	for cursor.Next(ctx) {
		var question Question
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
} //end of getAllResolvedQuestions()

//Function to get all answers provided by the this tutor using the tutor_id
func getThisTutorAnswers(response http.ResponseWriter, request *http.Request) {
	//setting the header
	response.Header().Add("content-type", "application/json")
	//getting the paramter from the API enpoints
	params := mux.Vars(request)

	var answers []Answer

	//connecting to the database
	collection := client.Database("answer").Collection("Answers")
	//wating time until ready to return an error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//retrieve the answer collection that matches the tutor_id from the parameter
	cursor, err := collection.Find(ctx, bson.M{"tutorID": params["tutor_id"]})
	//error handling
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		fmt.Println(err.Error())
		return
	}

	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need to find
	//append them into a list of objects
	for cursor.Next(ctx) {
		var answer Answer
		cursor.Decode(&answer)
		answers = append(answers, answer)
	}

	//error handling
	if err := cursor.Err(); err != nil {
		fmt.Println(err.Error())
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	//if no further is found, then we will send this out to the Front End
	json.NewEncoder(response).Encode(answers)
}

//Function to get a list of quetsions based on the list of ids from the parameters
func getQuestionsFromQuestionIDS(response http.ResponseWriter, request *http.Request) {
	//setting the header for the databse
	response.Header().Add("content-type", "application/json")
	// fmt.Println(response, "Hello! Parameters: %v", request.URL.Query()["id"])
	params, err := request.URL.Query()["id"]
	if !err || len(params[0]) < 1 {
		fmt.Println("Url params key is missing")
		return
	}

	//creating a slice of question id from the array
	qIDs := make([]primitive.ObjectID, len(params))
	// convert the id string into the primitive objectID
	for i := range params {
		questionIDs, err := primitive.ObjectIDFromHex(params[i])
		fmt.Println(questionIDs)
		if err != nil {
			fmt.Println(err)
		}
		qIDs = append(qIDs, questionIDs)
	}

	//returning a list of questions based on the list of ids
	var questions []Question
	//connecting to the database and find the question collection
	collection := client.Database("question").Collection("Questions")
	//wait time until return error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//rettrieving any collections that matches the id sent in from the api
	//	cursor, err := collection.Find(ctx, bson.M{"status": bson.M{"$in": statusArray}})
	cursor, Err := collection.Find(ctx, bson.M{"_id": bson.M{"$in": qIDs}})

	//error handling if the databse cannot find the object
	if Err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + Err.Error() + `"}`))
		fmt.Println(Err.Error())
		return
	}

	defer cursor.Close(ctx)

	//appending the question objects found from the database and put them into the question slice
	for cursor.Next(ctx) {
		var question Question
		cursor.Decode(&question)
		questions = append(questions, question)
	}

	//Error handling:
	if append_err := cursor.Err(); append_err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + append_err.Error() + `"}`))
		fmt.Println(append_err.Error())
		return
	}
	//send the request to the front end
	json.NewEncoder(response).Encode(questions)
	fmt.Println(questions)

}

//function to get the answer objects using a question_id
func getAnswerFromParams(response http.ResponseWriter, request *http.Request) {
	//setting the header for the database:
	response.Header().Add("content-type", "application/json")
	//getting the question parameters from the api url
	params := mux.Vars(request)
	//creating a list to store all element of answer from the database
	var answers []Answer
	//connecting the database
	collection := client.Database("answer").Collection("Answers")
	//waiting time until ready to return error
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//retrieve any collection that matchs the question id sent in from the API url
	cursor, err := collection.Find(ctx, bson.M{"questionID": params["question_id"]})
	//error handling if the database cannot find the answer object
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need to find
	//append them into a list of objects
	for cursor.Next(ctx) {
		var answer Answer
		cursor.Decode(&answer)
		answers = append(answers, answer)
	}
	//error handling
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	//send the request to the front end
	json.NewEncoder(response).Encode(answers)

} //end of getAnswerFromParams

//create an instance for our mongodb
var client *mongo.Client

//main function to handle API enpoints and connect services to handle the request
func main() {

	fmt.Println("Starting the question/answer listener...")

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
	r.HandleFunc("/question", getAndWriteQuestion).Methods("POST") //create a collection in the databse
	// r.HandleFunc("/login", LoginHandler).Methods("POST")           //Authenticate users already registered in the database
	r.HandleFunc("/getAllQuestions", getAllQuestions).Methods("GET")
	r.HandleFunc("/getThisQuestion/{studentID}", getQuestionFromParams).Methods("GET") //Function to retrieve a question based on the user_id.
	//Function to write the answer object into the database
	r.HandleFunc("/answer", createAnswerObject).Methods("POST")
	//Endpoints to get a particular questions using a question ID
	r.HandleFunc("/getThisAnswer/{question_id}", getAnswerFromParams).Methods("GET")
	//Endpoints to update the status of the questions using a question ID
	r.HandleFunc("/updateQuestionStatus/{question_id}/{status}", updateQuestionStatus).Methods("POST")
	//Endpoints to get just active question and display them onto the front end
	r.HandleFunc("/getAllActiveQuestion", getActiveQuestions).Methods("GET")
	//Endpoints to get all resolved question:
	r.HandleFunc("/getAllResolvedQuestions", getAllResolvedQuestions).Methods("GET")
	//Endpoints to return all answer provided by the tutor
	r.HandleFunc("/getAnswersByThisTutor/{tutor_id}", getThisTutorAnswers).Methods("GET")
	//Endpoints to return all questions with a question ID
	r.HandleFunc("/getQuestionsFromQuestionID", getQuestionsFromQuestionIDS).Methods("GET")
	//listen on port 8080
	fmt.Println("Finished setting up!")
	fmt.Println("Listening on port 8080...")

	http.ListenAndServe(":8080", handlers.CORS(header, methods, origin)(r))
}
