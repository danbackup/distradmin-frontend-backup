import React from 'react';
import { Login } from 'react-admin';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from './Components/custom/styledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/#/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Optional callbacks in order to get Access Token from Google
  // callbacks: {
  //   signInSuccessWithAuthResult: (result) => {
  //     const credential = result.credential;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     const accessToken = credential.accessToken;
  //     console.log({result, user, accessToken});
  //   }
  // }
};

const SignInScreen = () => (
  <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
);

const CustomLoginForm = (props) => (
  <div>
    <SignInScreen />
  </div>
);

const CustomLoginPage = (props) => (
  <Login {...props}>
    <CustomLoginForm {...props} />
  </Login>
);

export default CustomLoginPage;
