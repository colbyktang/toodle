//This go file will listen for a path to register and authenticate user into a database
//The file will use mux module to handle api endpoints and connections
package main

//import new packages
import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

//Initialize a Student object
type User struct {
	ID        string `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Email     string `json:"email"`
	Courses   string `json:"courses"`
}

//Create an instance of the object class
var users []User

//function to get all user from the database
func getAllUser(w http.ResponseWriter, r *http.Request) {
	//setting the header with content type
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

//Function to get a single user:
func getUserFrom_ID(w http.ResponseWriter, r *http.Request) {
	//setting the header with content type
	w.Header().Set("Content-Type", "application/json")
	//Extract the ID stored in the path to find the user
	params := mux.Vars(r) //get the params
	//Loop through the database to find the user based on the id
	for _, item := range users {
		//if the user is found, the out put them to the screen
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	//output the list of user that we found from the id
	json.NewEncoder(w).Encode(&User{})
}

//Function to register or sign a user into the database:
func registerUser(w http.ResponseWriter, r *http.Request) {
	//setting the header with content type
	w.Header().Set("Content-Type", "application/json")
	//initialize a new instance of the user object
	var user User
	//read the information from the request body and assign it
	//to the local variable user for database injection
	_ = json.NewDecoder(r.Body).Decode(&user)
	//set a user_id
	user.ID = strconv.Itoa(rand.Intn(10000000)) //Mock ID - not safe - we'll find a better method later
	users = append(users, user)
	//output the newly created user
	json.NewEncoder(w).Encode(user)
}

//function to delete a user:
func deleteUser(w http.ResponseWriter, r *http.Request) {
	//setting the header with content type
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	//find the book to update based on the ID
	for index, item := range users {
		if item.ID == params["id"] {
			users = append(users[:index], users[index+1:]...)
			break
		}
	}
	//output the book found from ID
	json.NewEncoder(w).Encode(users)

}

//main function to execute the server:
func main() {
	//init the mux router
	r := mux.NewRouter()

	//Router handler(Endpoints for API)
	r.HandleFunc("/api/deleteUser{id}", deleteUser).Methods("DELETE")
	r.HandleFunc("/api/getAllUser", getAllUser).Methods("GET")
	r.HandleFunc("/api/register", registerUser).Methods("POST")
	// r.HandleFunc("/api/login", authenticateUser).Methods("GET")
	// r.HandleFunc("/api/updateUser", updateUser).Methods("PUT")
	r.HandleFunc("/api/getAllUser{id}", getUserFrom_ID).Methods("GET")

	fmt.Println("Running server...")
	//run the server on port 8000
	log.Fatal(http.ListenAndServe(":8000", r))

}
