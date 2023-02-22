import { AuthProvider } from '../Auth/AuthProvider';

export const sendAuthorizedApiRequest = async (
  method,
  body,
  params,
  endpoint
) => {
  if (!localStorage.getItem('accessToken')) AuthProvider.logout();
  const res = await fetch(endpoint, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    params,
    body,
  });
  return res.json();
};
