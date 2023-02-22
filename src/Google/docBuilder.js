import { useGetMany } from "react-admin";

export const buildParamsForNewGoogleDoc = (record) => {
  return {};
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
