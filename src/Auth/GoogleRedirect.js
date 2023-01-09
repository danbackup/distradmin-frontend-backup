import { useRedirect } from 'react-admin';

export const GoogleRedirect = async () => {
  console.log('In the google redirect');
  const url = new URL(window.location.href);
  const accessToken = url.href.split('access_token=')[1];
  const redirect = useRedirect();

  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/auth/google/callback?access_token=${accessToken}`
  );

  result
    .json()
    .then(({ jwt, user }) => {
      console.log('user: ', user);
      localStorage.setItem('token', jwt);
      redirect(process.env.REACT_APP_FRONTEND_URL);
    })
    .catch((e) => console.log(e));

  return null;
};
