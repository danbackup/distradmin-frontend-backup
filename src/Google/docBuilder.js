import { useGetMany } from "react-admin";

export const buildParamsForNewGoogleDoc = (record) => {
  return {};
};

export const saveDocumentIdToDB = async (record, googleDocId) => {
  console.log('REC', record);
  console.log('googleDocId', googleDocId);
  // Call strapi api to update event record with new google doc id in db
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/events/${record.id}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          googleDocId,
        },
      }),
    }
  );
  console.log('STRAPI res', response);
  return response; // parses JSON response into native JavaScript objects
};

export const buildBatchUpdates = (eventDetails) => {
  return eventDetails.map((detail) => {
    return {
      replaceAllText: {
        containsText: {
          text: detail.textToReplace,
          matchCase: true,
        },
        replaceText: detail.content,
      },
    };
  });
};
