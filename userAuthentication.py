#This python program will handle the user authentication from the front end
#Taking a user input of username and password from the front end and then match if the input credentials 
#is valid or not. Display an error message if the credentials are wrong or send the user to a success page if the credential works

import http.server
from http.server import BaseHTTPRequestHandler
import json
import requests
import urllib.parse

class RequestListner(BaseHTTPRequestHandler):
    def do_POST(self):
        #function to listen for a POST request from the Front-end
        path = self.path
        print(self.headers)
        #Displaying the header of the path being sent in
        print("Headers: ", self.headers, "")
        print("Domain: ", self.headers['host'])

        #Displaying the type of the content in the request
        print("Content-Type: ", self.headers['Content-type'])

        #Collecting the length of the body read the characters that are contained in the body
        length = int(self.headers['Content-length'])
        body = self.rfile.read(length)

        #convert the body of the requets into a dictionary for easier handling
        incoming_dictionary = json.loads(body)
        #for debugging
        print("Incoming Dictionary: " + str(incoming_dictionary))
        print("Path: " + str(path))
        #handling a registration from POST
        if path == "/api/cs/login":
            print("Login API:")
            #the function will return a response back if the user crendential match
            response = self.authenticateUser(incoming_dictionary)
            #if there is a response back: 
            if response:
                self.respond_convert_json_object(200, response)

            else: 
                self.respond_code(403, "Credentials were not found")
        #connection error and no request of this connection were found
        else:
            #if the path did not match any request
            # a 404 Not found error is thrown
            print("api/cs failed")
            self.respond_code(404, 'Path did not match any known request!')

    # Converts python dictionary into a json object and sends it with a code
    def respond_convert_json_object (self, code, dictionary):
        # Define the response code and the headers
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header("Access-Control-Allow-Origin", "*")

        # Signify that you are done sending the headers:
        self.end_headers()
        
        # convert python dictionary into a JSON object
        # encode json_object into utf_8
        self.wfile.write(json.dumps(dictionary).encode(encoding='utf_8'))
    
    # Responds with a simple code and response
    def respond_code (self, code, response):
        self.send_response(code)
        self.end_headers()
        bytesStr = response.encode('utf-8')
        self.wfile.write(bytesStr)

    #function to take in a dictionary of user credentials and authenticate it.
    def authenticateUser(self, dictionary):
        # #Dictionary to store a list of valid username and password
        users = {"tonyHawk98": "iAmIronMan", 
                "John_Doe": "thisIsME09",
                "Thor69": "password"}
        #getting the username and password out from the dictionary
        username = dictionary["username"]
        password = dictionary["password"]
        if username in users.keys() and password in users.values():
            return True
        return False

        # if username == "tonyHawk98" and password == "iAmIronMan":
        #     print("Valid Credential")
        
        # elif username == "John_Doe" and password == "thisIsME09":
        #     print("Valid Credential")

        # elif username == "Thor69" and password == "Changeme04!":
        #     print("Valid Credential")

        # else: 
        #     print("Invalid Credentials")


#main function to execute and run the server
def main():
    #Server port
    port = 8080

    #Create server
    httpServer = http.server.HTTPServer(('', port), RequestListner)
    print("Request Listener is running on port", port)

    #start server, and shut it off by key interuption
    try: 
        httpServer.serve_forever()
    except KeyboardInterrupt:
        httpServer.server_close()
        print("Request handler has closed!")

if __name__ == "__main__":
    main()
