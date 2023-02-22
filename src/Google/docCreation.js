import {
  callBackend,
  getFromBackendFilterById,
} from '../DataProvider/backendHelpers';
import { buildBatchUpdates } from './docBuilder';
import { sendAuthorizedApiRequest } from './requestAuthorization';

export const createGoogleDocFromTemplate = async (record, formattedEventDate) =>
  await sendAuthorizedApiRequest(
    'POST',
    JSON.stringify({
      parents: ['10EXyxpVqTqHdJJB1S-MkVTTQS-usasgV'],
      name: `${record.client} - ${formattedEventDate}`,
    }),
    JSON.stringify({
      supportsSharedDrives: true,
      fields: 'id',
    }),
    `https://www.googleapis.com/drive/v3/files/1_VQBWLCrHLSiy3j1TicaLt2O8PIDf3ayPHG5woemsVU/copy`
  );

export const saveDocumentIdToDB = async (record, googleDocId) => {
  // Call strapi api to update event record with new google doc id in db
  const method = 'PUT';
  const endpoint = `/api/events/${record.id}`;
  const body = JSON.stringify({
    data: {
      googleDocId,
    },
  });

  const data = callBackend(method, endpoint, null, body);
  return data;
};

export const populateDocContent = async (record, id, formattedEventDate) => {
  if (!id) throw new Error('Could not get document ID');

  const jobs = await getFromBackendFilterById('jobs', record.jobs);

  const jobDetailsArray = convertJobsToStrings(jobs);

  const requests = buildBatchUpdates([
    {
      textToReplace: '{{eventType}}',
      content: record.type,
    },
    {
      textToReplace: '{{package}}',
      content: record.package.data.attributes.name,
    },
    {
      textToReplace: '{{client}}',
      content: record.client,
    },
    {
      textToReplace: '{{date}}',
      content: formattedEventDate,
    },
    {
      textToReplace: '{{jobs}}',
      content: jobDetailsArray.join('\n'),
    },
    {
      textToReplace: '{{address}}',
      content: record.location,
    },
    {
      textToReplace: '{{notes}}',
      content: record.notes,
    },
  ]);
  await sendAuthorizedApiRequest(
    'POST',
    JSON.stringify({ requests }),
    null,
    `https://docs.googleapis.com/v1/documents/${id}:batchUpdate`
  );
};

const convertJobsToStrings = (jobs) =>
  jobs.data.map((job) => {
    const musician = job.attributes.musician.data.attributes;
    const instrument = job.attributes.instrument.data.attributes;

    let jobString = `${musician.fName} ${musician.lName} - ${instrument.name}`;
    console.log('IS MD? ', job.attributes.md, ' for: ', jobString);
    return job.attributes.md ? jobString + '/MD' : jobString;
  });
