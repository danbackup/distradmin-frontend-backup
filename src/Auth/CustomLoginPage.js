import React from 'react';
import { useRedirect } from 'react-admin';

const CustomLoginPage = (props) => {
  const redirect = useRedirect();
  const redirectToGoogle = () => {
    redirect('http://localhost:1337/api/connect/google');
  };
  return <button onClick={() => redirectToGoogle()}>LOG IN</button>;
};

export default CustomLoginPage;
