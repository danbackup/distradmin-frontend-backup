import { useRedirect } from 'react-admin';

export const GoogleRedirect = async () => {
  console.log('In the google redirect');
  const url = new URL(window.location.href);
  const accessToken = url.href.split('access_token=')[1];
  const redirect = useRedirect();
  let gUser = null;
  const result = await fetch(
    `http://localhost:1337/api/auth/google/callback?access_token=${accessToken}`
  );

  result
    .json()
    .then(({ jwt, user }) => {
      console.log('user: ', user);
      localStorage.setItem('token', jwt);
      redirect('http://localhost:3000');
    })
    .catch((e) => console.log(e));

  return null;
};
