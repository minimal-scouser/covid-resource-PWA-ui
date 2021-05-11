import React, { Component, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from '../common/RowColStyle';

export function VerifyVolunteer() {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const provider = new firebase.auth.GoogleAuthProvider();
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  function signInUsingGoogle() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        setUserDetails({
          token: credential.accessToken,
          userName: result.user.displayName,
        });
        setHasSignedIn(true);
        console.log("Umm yah");
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  }

  return (
    <div className="App">
      {hasSignedIn === false ? (
        <React.Fragment>
          <p>Please sign in with google to proceed.</p>
          <Button onClick={signInUsingGoogle}>Sign In</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Welcome {userDetails.userName}</p>
        </React.Fragment>
      )}
    </div>
  );
}
