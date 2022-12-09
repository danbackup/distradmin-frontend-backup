import React from 'react';
import { Login } from 'react-admin';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from '../Components/custom/styledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/#/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const SignInScreen = () => {
  return (
    <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
  );
};

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
