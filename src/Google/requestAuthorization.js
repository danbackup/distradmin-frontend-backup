export const sendAuthorizedApiRequest = async (
  requestDetails,
  GoogleAuth,
  callback,
  scope
) => {
  if (isAuthorized(GoogleAuth, scope)) {
    // const request = gapi.client.request(requestDetails);
    // return request.execute((response) => callback(response));
  } else {
    GoogleAuth.signIn();
  }
};

const isAuthorized = (GoogleAuth, requestScope) => {
  console.log(GoogleAuth.currentUser.get());
  try {
    if (GoogleAuth.currentUser.get().xc.scope.includes(requestScope)) {
      return true;
    }
    throw new Error('User does not have the correct scopes');
  } catch (e) {
    GoogleAuth.disconnect();
    console.error(e);
    return false;
  }
};
