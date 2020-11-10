package main

import (
	"context"
	"log"
	"fmt"
	"time"
	"go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/mongo/readpref"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


//main function to establish a connection with a mongodb database
func main() {
	//establish a connection to a mongodb client
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	//error handling: 
	if err != nil{
		//if there is an error connecting to the mongodb database, print out that error
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second) //waiting time until return an error
	err = client.Connect(ctx)
	if err != nil{
		//print out the error
		log.Fatal(err)
	}
	//disconnect from the database
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil{
		log.Fatal(err)
	}

	//checking for what kind of database that we have in the server
	database, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil{
		log.Fatal(err)
	}
	fmt.Println(database)
}


