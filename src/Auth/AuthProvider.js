import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export const AuthProvider = async (type, params) => {
  if (
    window.location.href.includes(
      `${process.env.REACT_APP_FRONTEND_URL}/connect/google/redirect?`
    )
  ) {
    return Promise.resolve();
  }
  if (type === AUTH_LOGIN) {
    return '/events';
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    localStorage.removeItem('token');
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};
