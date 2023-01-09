import React from 'react';
import { useRedirect } from 'react-admin';

const CustomLoginPage = (props) => {
  const redirect = useRedirect();
  const redirectToGoogle = () => {
    redirect(`${process.env.REACT_APP_BACKEND_URL}/api/connect/google`);
  };
  return <button onClick={() => redirectToGoogle()}>LOG IN</button>;
};

export default CustomLoginPage;
