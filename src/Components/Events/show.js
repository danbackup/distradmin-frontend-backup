import * as React from 'react';
import {
  Show,
  TextField,
  DateField,
  FunctionField,
  NumberField,
  TabbedShowLayout,
  Tab,
  Datagrid,
  BooleanField,
  useNotify,
  useRefresh,
  ReferenceField,
  DeleteButton,
  usePermissions,
} from 'react-admin';
import { Card } from '@mui/material';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { gapi } from 'gapi-script';
import { sendAuthorizedApiRequest } from '../../Google/requestAuthorization.js';
import {
  buildBatchUpdates,
  saveDocumentIdToDB,
} from '../../Google/docBuilder.js';
import { CreateRelationButton } from '../custom/createRelationButton.js';
import GoogleDocButton from './customEventComponents/googleDocButton.js';
import { getFromBackend } from '../../DataProvider/backendHelpers.js';

// const FilteredSetsList = () => {
//   const record = useRecordContext();
//   if (!record) return null;
//   return record.sets.length === 0 ? (
//     <Card>No linked sets!</Card>
//   ) : (
//     <Card>
//       <CustomReferenceManyField
//         reference='sets'
//         target='event.data.id'
//         resource='sets'
//       >
//         <Container>
//           <Typography variant='h6'>Sets</Typography>
//         </Container>
//         <Datagrid rowClick='show'>
//           <TextField source='name' />
//           <TextField source='start' />
//           <TextField source='end' />
//         </Datagrid>
//       </CustomReferenceManyField>
//     </Card>
//   );
// };

export const EventShow = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [isClicked, setIsClicked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const createNewGoogleDoc = async (record) => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    setLoading(true);

    const saveDocWrapper = async ({ documentId }) => {
      console.log('saving docId to db', documentId);
      try {
        const result = await saveDocumentIdToDB(record, documentId);
        if (result.status !== 200) {
          throw result.status;
        }
        refresh();
        setIsClicked(true);
        notify('Document created', { type: 'success' });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        notify(
          'There was an error when creating the google doc and linking it to this event',
          { type: 'error' }
        );
        console.error(error);
      }
    };

    const populateDocContent = async ({ id: googleDocId }) => {
      if (!googleDocId) {
        GoogleAuth.disconnect();
        setLoading(false);
        notify('There was an error, please try again!', { type: 'error' });
      }
      const formattedEventDate = new Date(record.date).toLocaleDateString();

      const jobs = await getFromBackend('jobs', record.jobs);

      const jobDetailsArray = jobs.data.map((job) => {
        const musician = job.attributes.musician.data.attributes;
        const instrument = job.attributes.instrument.data.attributes;

        let jobString = `${musician.fName} ${musician.lName} - ${instrument.name}`;
        console.log('IS MD? ', job.attributes.md);
        return job.attributes.md ? jobString + '/MD' : jobString;
      });

      const requests = buildBatchUpdates([
        {
          textToReplace: '{{eventType}}',
          content: record.type,
        },
        {
          textToReplace: '{{package}}',
          content: record.package.name,
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

      try {
        const requestDetails = {
          method: 'POST',
          path: `https://docs.googleapis.com/v1/documents/${googleDocId}:batchUpdate`,
          body: {
            requests,
          },
        };

        await sendAuthorizedApiRequest(
          requestDetails,
          GoogleAuth,
          saveDocWrapper,
          'https://www.googleapis.com/auth/drive'
        );
      } catch (error) {
        setLoading(false);
        console.error(error);
        notify(
          'There was an error poppulating the content of the Google Doc.',
          {
            type: 'error',
            undoable: false,
            autoHideDuration: 3000,
          }
        );
      }
    };

    try {
      const formattedEventDate = new Date(record.date).toLocaleDateString();
      const requestDetails = {
        method: 'POST',
        path: `https://www.googleapis.com/drive/v3/files/1_VQBWLCrHLSiy3j1TicaLt2O8PIDf3ayPHG5woemsVU/copy`,
        params: {
          supportsSharedDrives: true,
          fields: 'id',
        },
        body: {
          parents: ['10EXyxpVqTqHdJJB1S-MkVTTQS-usasgV'],
          name: `${record.client} - ${formattedEventDate}`,
        },
      };

      await sendAuthorizedApiRequest(
        requestDetails,
        GoogleAuth,
        populateDocContent,
        'https://www.googleapis.com/auth/drive'
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
      notify('There was an error creating the Google Doc.', {
        type: 'error',
        undoable: false,
        autoHideDuration: 3000,
      });
    }
  };

  const openGoogleDoc = (googleDocId) => {
    setLoading(true);
    const url = `https://docs.google.com/document/d/${googleDocId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setLoading(false);
  };

  const { isLoading, permissions } = usePermissions();
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <Show
      title={
        <FunctionField
          render={(record) => (record ? `${record.client}` : 'null')}
        />
      }
    >
      <TabbedShowLayout>
        <Tab label='Details'>
          <FunctionField
            render={(record) => {
              return (
                <GoogleDocButton
                  isLoading={loading}
                  googleDocId={record.googleDocId}
                  open={openGoogleDoc}
                  create={createNewGoogleDoc}
                  record={record}
                />
              );
            }}
          />
          <TextField source='package.data.attributes.name' label='Package' />
          <TextField source='type' emptyText='No event type assigned' />
          <TextField
            source='client'
            label='Client'
            emptyText='No client assigned'
          />
          <DateField source='date' emptyText='No date assigned' />
          <TextField source='location' emptyText='No location' />
          <TextField source='notes' emptyText='None' />
          {/* <FilteredSetsList /> */}
        </Tab>
        {permissions === 'Super Admin' && (
          <Tab label='Finance'>
            <NumberField
              label='Price'
              source='gross'
              options={{ style: 'currency', currency: 'GBP' }}
            />
            <NumberField
              source='deposit'
              options={{ style: 'currency', currency: 'GBP' }}
            />
            <NumberField
              source='amountDue'
              options={{ style: 'currency', currency: 'GBP' }}
            />
            <NumberField
              source='profit'
              options={{ style: 'currency', currency: 'GBP' }}
            />
          </Tab>
        )}
        <Tab label='Musicians'>
          <FunctionField
            render={(record) => {
              return record?.jobs?.length === 0 ? (
                <CreateRelationButton
                  resourceName='event'
                  path='/jobs/create'
                  buttonText='Add Musician'
                />
              ) : (
                <Card>
                  <CustomReferenceManyField
                    reference='jobs'
                    target='event.data.id'
                    resource='jobs'
                  >
                    <Datagrid
                      bulkActionButtons={false}
                      rowClick={(id, resource, record) =>
                        `/musicians/${record.musician.data.id}/show`
                      }
                    >
                      <BooleanField source='md' TrueIcon={MilitaryTechIcon} />
                      <FunctionField
                        label='Musician'
                        render={(record) =>
                          `${record.musician.data.attributes.fName} ${record.musician.data.attributes.lName}`
                        }
                      />
                      <TextField
                        source='instrument.data.attributes.name'
                        label='Instrument'
                      />
                      <BooleanField source='hotelRequired' />
                      {permissions === 'Super Admin' && (
                        <NumberField
                          label='Wage'
                          source='wage'
                          options={{ style: 'currency', currency: 'GBP' }}
                          emptyText={'Not agreed'}
                        />
                      )}
                      <DeleteButton redirect={false} />
                    </Datagrid>
                    <CreateRelationButton
                      resourceName='event'
                      path='/jobs/create'
                      buttonText='Add Musician'
                    />
                  </CustomReferenceManyField>
                </Card>
              );
            }}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
