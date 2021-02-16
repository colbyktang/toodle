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
	"golang.org/x/crypto/bcrypt"

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

//Function to hash and salt a password
//What is salt? A cryptographic salt is made up of random bits added to each password instance before its hashing. Salts create unique passwords even in the instance of two users choosing the same passwords
//What is hasing? When a password has been “hashed” it means it has been turned into a scrambled representation of itself. A user's password is taken and – using a key known to the site – the hash value is derived from the combination of both the password and the key, using a set algorithm.
func hashAndSalt(pwd []byte) string {
	//Use GenerateFromPassword to hash and salt a pwd
	//MinCost is just an interger constant provided by the bycrypt
	//package along with DefaultCost and MaxCost.
	//The cost can be any value and it should not be lower than MinCost(4)

	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	//error handling
	if err != nil {
		log.Println(err)
	}

	//GenerateFromPassword returns a byte slice so we need to
	//convert the bytes into the a string and return it
	return string(hash)
}

// // Function to verify password:
// //CompareHashAndPassword compares a bcrypt hashed password with its possible plaintext equivalent. Returns nil on success, or an error on failure.
// //Using CompareHashAndPassword we can create a function that returns a boolean to let us know whether or not the passwords match.
// func comparePassword(hashedPwd string, plainPwd []byte) bool {
// 	//Since we will be getting the hashed password from the DB
// 	//will be a string so we will need to convert it into a byte slice
// 	byteHash := []byte(hashedPwd)

// 	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
// 	//error handling
// 	if err != nil {
// 		log.Println(err)
// 		return false
// 	}

// 	return true
// }
//Function to create an admin
func createAdmin(response http.ResponseWriter, request *http.Request) {
	//setting the header:
	response.Header().Add("content-type", "application/json")
	//creating an instance of User data model and response data model
	var admin structs.User
	var result structs.ResponseResult
	//Assign the request body into a local variable to then write the data into the mongodb
	json.NewDecoder(request.Body).Decode(&admin)
	// fmt.Println(admin.Username)
	// fmt.Println(admin.Password)
	//Encrypt the admin password
	admin.Password = hashAndSalt([]byte(admin.Password))
	//open up the collection and write data
	//create a new database if the current database does not exist
	collection := client.Database("users").Collection("admin")
	//check to see if the data already exist
	err := collection.FindOne(context.TODO(), bson.D{{"username", admin.Username}}).Decode(&admin)
	//error handling
	if err != nil { //no document with the same username found
		//the information has not been registered in the database
		if err.Error() == "mongo: no documents in result" {
			//insert the user into our database
			ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
			// result, _ := collection.InsertOne(ctx, student)
			_, err = collection.InsertOne(ctx, admin)
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

// addUser writes new user data into the database
func addUser(response http.ResponseWriter, request *http.Request) {

	// Setting the header
	response.Header().Add("content-type", "application/json")
	var user structs.User
	var result structs.ResponseResult
	json.NewDecoder(request.Body).Decode(&user) //Assign the json body into the local variable person
	//Encrypt the password using Salt and Hashes
	user.Password = hashAndSalt([]byte(user.Password))

	// open up collection and write data
	// create a new database if it doesn't already exist
	if user.Level < 0 || user.Level > 2 {
		result.Error = "User level is not within 0-2, Try Again"
		json.NewEncoder(response).Encode(result)
		return
	}

	collection := client.Database("users").Collection("students")
	if user.Level == 1 {
		collection = client.Database("users").Collection("tutors")
	} else if user.Level == 2 {
		collection = client.Database("users").Collection("professors")
	}

	// check to see if the data is already in the database or not
	err := collection.FindOne(context.TODO(), bson.D{{"username", user.Username}}).Decode(&user)

	// Analyzing the error found:
	if err != nil {
		//the information has not been registered in the database
		if err.Error() == "mongo: no documents in result" {
			//insert the user into our database
			ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
			// result, _ := collection.InsertOne(ctx, student)
			_, err = collection.InsertOne(ctx, user)
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

// Deleting a single user from the database
func deleteUser(response http.ResponseWriter, request *http.Request) {
	// Setting the header
	response.Header().Add("content-type", "application/json")
	var user structs.User
	var result structs.ResponseResult
	json.NewDecoder(request.Body).Decode(&user) //Assign the json body into the local variable person

	// open up collection and write data
	// create a new database if it doesn't already exist
	collection := client.Database("users").Collection("students")
	if user.Level == 1 {
		collection = client.Database("users").Collection("tutors")
	} else if user.Level == 2 {
		collection = client.Database("users").Collection("professors")
	}

	// specify the SetCollation option to provide a collation that will ignore case for string comparisons
	opts := options.Delete().SetCollation(&options.Collation{
		Locale:    "en_US",
		Strength:  1,
		CaseLevel: false,
	})

	res, err := collection.DeleteOne(context.TODO(), bson.D{{"username", user.Username}}, opts)

	if err != nil {
		result.Error = "Cannot find user"
		log.Fatal(err)
		return
	}

	result.Result = fmt.Sprintf("Removed %s: %d", user.Username, res.DeletedCount)
	return
}

/* user_type should be: STUDENT, TUTOR, PROFESSOR */
// Deleting all the users from a collection
func clearUserCollection(response http.ResponseWriter, request *http.Request) {
	// Setting the header
	response.Header().Add("content-type", "application/json")
	var result structs.ResponseResult
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	/* Getting the user_type from the url */
	params := mux.Vars(request)
	usertype := params["user_type"]

	// open up collection and write data
	// create a new database if it doesn't already exist
	collection := client.Database("users").Collection("")

	if usertype == "STUDENT" {
		collection = client.Database("users").Collection("students")
	} else if usertype == "TUTOR" {
		collection = client.Database("users").Collection("tutors")
	} else if usertype == "PROFESSOR" {
		collection = client.Database("users").Collection("professors")
	}

	if err := collection.Drop(ctx); err != nil {
		log.Fatal(err)
	}

	result.Result = fmt.Sprintf("Removed %s: ", params["user_type"])
	return
}

/* user_type should be: STUDENT, TUTOR, PROFESSOR */
/* Function to update the user account based on the api request from the Front End */
func updateUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var user structs.User
	var res structs.ResponseResult
	json.NewDecoder(request.Body).Decode(&user)
	/* Getting the user id from the url and convert it into a hex id */
	params := mux.Vars(request)
	objID, err := primitive.ObjectIDFromHex(params["userID"])
	userType := params["user_type"]

	if err != nil {
		fmt.Println("Objectid from hex Error", err)
	} else {
		fmt.Println("Objectid from hex", objID)
	}
	//Encrypt the password using Salt and Hashes
	user.Password = hashAndSalt([]byte(user.Password))

	/* Mongodb client connection */
	// open up collection and write data
	// create a new database if it doesn't already exist
	collection := client.Database("users").Collection("")

	if userType == "STUDENT" {
		collection = client.Database("users").Collection("students")
	} else if userType == "TUTOR" {
		collection = client.Database("users").Collection("tutors")
	} else if userType == "PROFESSOR" {
		collection = client.Database("users").Collection("professors")
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	filter := bson.M{"_id": bson.M{"$eq": objID}} //find the document based on the id from the url param
	update := bson.M{"$set": bson.M{              //update the fields accordingly
		"username": user.Username,
		"email":    user.Email,
		"password": user.Password,
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

//Helper method to get the students data information
func getAllStudentDataUtils() []structs.User {
	// return a struct object
	var students []structs.User
	//connecting to the STUDENT database:
	collection := client.Database("users").Collection("students")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
	if err != nil {
		fmt.Println("Unable to find the STUDENTS object")
		log.Fatal(err)
		return students
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need
	//assuming we were able to collect all data from the back end.
	for cursor.Next(ctx) {
		var student structs.User
		cursor.Decode(&student)
		students = append(students, student)
	}
	//unable to append the students slice for the return value
	if err := cursor.Err(); err != nil {
		fmt.Println("Unable to append STUDENT collection into the return value")
		log.Fatal(err)
		return students
	}
	return students
} //end of utils to get all students for admin

//Helper method to get the tutor data information
func getAllTutorDataUtils() []structs.User {
	// return a struct object
	var tutors []structs.User
	//connecting to the STUDENT database:
	collection := client.Database("users").Collection("tutors")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
	if err != nil {
		fmt.Println("Unable to find the TUTORS object")
		log.Fatal(err)
		return tutors
	}
	defer cursor.Close(ctx)
	//loop through the mongodb data objects and look for the data that we need
	//assuming we were able to collect all data from the back end.
	for cursor.Next(ctx) {
		var tutor structs.User
		cursor.Decode(&tutor)
		tutors = append(tutors, tutor)
	}
	//unable to append the students slice for the return value
	if err := cursor.Err(); err != nil {
		fmt.Println("Unable to append TUTORS collection into the return value")
		log.Fatal(err)
		return tutors
	}
	return tutors

}

// //Helper method to get the professors data information
// func getAllProfessorsDataUtils() []structs.User {
// 	// return a struct object
// 	var professors []structs.User
// 	//connecting to the STUDENT database:
// 	collection := client.Database("users").Collection("professors")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
// 	cursor, err := collection.Find(ctx, bson.M{})                       //return everything in our collections
// 	if err != nil {
// 		fmt.Println("Unable to find the professors object")
// 		log.Fatal(err)
// 		return professors
// 	}
// 	defer cursor.Close(ctx)
// 	//loop through the mongodb data objects and look for the data that we need
// 	//assuming we were able to collect all data from the back end.
// 	for cursor.Next(ctx) {
// 		var professor structs.User
// 		cursor.Decode(&professor)
// 		professors = append(professors, professor)
// 	}
// 	//unable to append the students slice for the return value
// 	if err := cursor.Err(); err != nil {
// 		fmt.Println("Unable to append STUDENT collection into the return value")
// 		log.Fatal(err)
// 		return professors
// 	}
// 	return professors
// }

// GetUsers gets documents from collections
func GetAllUserData(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json") //setting the header
	var students []structs.User                               //creating a slice of the struct to store data from the database
	var tutors []structs.User
	var res structs.ResponseResult
	// var professors []structs.User
	students = getAllStudentDataUtils()
	tutors = getAllTutorDataUtils()
	//Creating a token after successful login for role based examination:
	userDataToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"students": students,
		"tutors":   tutors})

	userDataTokenStr, err := userDataToken.SignedString([]byte("secret"))

	if err != nil {
		res.Error = "Error while generating token,Try again"
		json.NewEncoder(response).Encode(res)
		return
	}
	res.Result = userDataTokenStr
	json.NewEncoder(response).Encode(res)
}

//Function to authenticate the admin into the admin portal
func LoginAdmin(w http.ResponseWriter, r *http.Request) {
	//Setting header:
	w.Header().Add("content-type", "application/json")
	var admin structs.User
	json.NewDecoder(r.Body).Decode(&admin)
	// fmt.Println(admin.Username)
	// fmt.Println(admin.Password)
	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("admin")
	var result structs.User
	var res structs.ResponseResult
	//check to see if the data is already in the database or not, check the username first
	currentResult := collection.FindOne(context.TODO(), bson.D{{"username", admin.Username}}).Decode(&result)
	//error handling: match the user login credentials with the database
	if currentResult != nil {
		res.Error = "Invalid username"
		json.NewEncoder(w).Encode(res)
		return
	}
	//check the password by hashing the plain text and match it with the hashed in the datatbase
	currentResult = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(admin.Password))
	if currentResult != nil {
		res.Error = "Invalid password"
		json.NewEncoder(w).Encode(res)
		return
	}

	//after authentication is successful, we will send back a token to the front end
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": result.Username,
		"id":       result.ID,
		"userType": "admin"})

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
	// fmt.Println(result.Username)
	return
}

// LoginUser handles login/authentication of users
func LoginUser(w http.ResponseWriter, r *http.Request) {
	//setting header for the response
	w.Header().Add("content-type", "application/json")
	var student structs.User
	json.NewDecoder(r.Body).Decode(&student) //Assign the json body into the local variable person

	//open up our collection and write data into the databse
	//if there is not a databse like this, then we will create a new ones
	collection := client.Database("users").Collection("students")
	collectionTutor := client.Database("users").Collection("tutors")
	var result structs.User
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
			// errTutor = collectionTutor.FindOne(context.TODO(), bson.D{{"password", student.Password}}).Decode(&result)
			errTutor = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(student.Password))
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
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(student.Password))

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
	fmt.Println(result.Username)
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
	r.HandleFunc("/getAllUserData", GetAllUserData).Methods("GET")
	r.HandleFunc("/updateUser/{userID}", updateUserAccount).Methods("POST")

	r.HandleFunc("/registerAdmin", createAdmin).Methods("POST")
	r.HandleFunc("/loginAdmin", LoginAdmin).Methods("POST")

	fmt.Println("Finished setting up!")
	fmt.Println("Listening on port 8000...")

	//listen on port 8000
	http.ListenAndServe(":8000", handlers.CORS(header, methods, origin)(r))

}
