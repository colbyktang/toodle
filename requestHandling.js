console.log("Running requestHandling.js!");

//Sends a json object to the backend using a dictionary
function send_login_demand(login_dictionary){
    //API key for connection to the server
    console.log("Sending user crendentials for authentication...")
    var url = 'api/cs/login'; 
    var jsonObject = JSON.stringify(login_dictionary);

    //Open a connection to the server
    var request = new XMLHttpRequest();
    //Initializing request to the web server
    request.open('POST', url, true);
    //Setting the header of the API request
    request.setRequestHeader("Content-type", "application/json");

    //Processed the data being sent in
    request.onload = function(){
        console.log("Request onloading...")

        //good response
        if(request.status >= 200 && request.status < 400){
            console.log("Request send out!"); 
            console.log("Response is sent!");
            console.log(request.statusText);
            // var names_dictionary = JSON.parse(request.response);
            // load_page("https://demand.team12.softwareengineeringii.com/dashboard.html");
        }

        //bad response: 
        else{
            console.log(request.status) //debugging purposes
            alert("Login error: " + request.status + " (" + request.response + " ) ");
        }
    }

    //Send the JSON object to the BE
    request.send(jsonObject);

}//end of program
