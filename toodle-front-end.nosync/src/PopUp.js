/* A pop up template that display the form to fill out and a submit button to send the info to the BE */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
// import jwt_decode from "jwt-decode";

const username = localStorage.getItem("username")
const userID= localStorage.getItem("id")
const userEmail = localStorage.getItem("email")

export default function Popup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update your information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your basic information, please enter the fields below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="u-username"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="u-email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="u-o-password"
            label="Current Password (*required)"
            type="password"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="u-n-password"
            label="New Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* Function to send the updated info to the back end for modification */
function handleUpdate(e){
    e.preventDefault();

    //Form validation
    var updatedUsername = document.getElementById('u-username').value
    var updatedEmail = document.getElementById('u-email').value
    var oldPassword = document.getElementById('u-o-password').value
    var newPassword = document.getElementById('u-n-password').value

    if(oldPassword == ""){
        alert("You need to fill out your current password for us to verify your credentials before updating account")
    }


    else if(updatedUsername == "" && updatedEmail == "" && newPassword == ""){
      alert("No new information are added!")
    }

    else{
        /*Before updating the user account, we will need to check if the user making the changes is the same person by 
        performing a light validation using the stored cookie session */
        let validation = {
          username: username,
          password: document.getElementById('u-o-password').value
      }

      let request = validateForms(updatedUsername, updatedEmail, oldPassword, newPassword)
      /* Back end connection using axios */
      axios.post(`http://206.189.194.211:8000/login`, validation)
      .then(response => {
          var errorMessage = response.data.error

          //Unable to authenticate user request
          if(errorMessage === "Invalid password" || errorMessage === "Invalid Username"){
              alert(errorMessage)
          }

          else{
              axios.post(`http://206.189.194.211:8000/updateUser/${userID}`, request)
              // axios.post(`http://localhost:8000/updateUser/${userID}`, request)
              .then(res => {
                  //error handling
                  console.log(res)
                  var success = res.data.result
                  var failure = res.data.error
                  //alert information to the user
                  if(failure != ""){
                    alert(failure)
                  }

                  else{
                    alert(success)
                    window.location.reload(false);
                    
                  }

              })
              .catch(err => {
                  console.log(err);
                  console.log(request)
                  alert(err)
                  
              })

          }
      })
      .catch(err => {
          console.log(err);
          
      })

    }
}


/* Validate user input and return the appropriate request package to be 
send to the back end */ 
function validateForms(updatedUsername, updatedEmail, oldpassword, newpassword){
    let request = {}
    //if the user only wants to update the username
    if(updatedEmail == "" && newpassword == "") {
        request = {
        username: updatedUsername,
        email: userEmail,
        password: oldpassword
      }
    }

    //if the user only wants to update the email: 
    else if(updatedUsername == "" && newpassword == ""){
      request = {
        username: username,
        email: updatedEmail,
        password: oldpassword
      }

    }

    // //if the user wants to update the password
    else if(updatedUsername == "" && updatedEmail == ""){
      request = {
        username: username,
        email: userEmail,
        password: newpassword
      }

    }

    //if the user wants to update both the username and email address
    else if(newpassword == ""){
      request = {
        username: updatedUsername,
        email: updatedEmail,
        password: oldpassword
      }
    }

    //update username and password
    else if(updatedEmail == ""){
      request = {
        username: updatedUsername,
        email: userEmail,
        password: newpassword
      }
    }
    //update email and password
    else if(updatedUsername == ""){
      request = {
        username: username,
        email: updatedEmail,
        password: newpassword
      }
    }
    //update anything
    else if(updatedUsername != "" && updatedEmail != "" &&  newpassword != ""){
      request = {
        username: updatedUsername,
        email: updatedEmail,
        password: newpassword
      }
    } 

    return request
}