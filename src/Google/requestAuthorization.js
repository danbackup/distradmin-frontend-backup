import { gapi } from 'gapi-script';

export const sendAuthorizedApiRequest = async (
  requestDetails,
  GoogleAuth,
  saveDocumentIdToDB
) => {
  if (isAuthorized(GoogleAuth, 'https://www.googleapis.com/auth/documents')) {
    const request = gapi.client.request(requestDetails);
    return request.execute((response) =>
      saveDocumentIdToDB(response.documentId)
    );
  } else {
    GoogleAuth.signIn();
  }
};

const isAuthorized = (GoogleAuth, requestScope) => {
  if (GoogleAuth.currentUser.get().xc.scope.includes(requestScope)) {
    return true;
  }
  console.error('User does not have the correct scopes');
  return false;
};
