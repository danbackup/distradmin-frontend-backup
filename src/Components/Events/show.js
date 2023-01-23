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
  Button,
  useRecordContext,
  useNotify,
  useRefresh,
  ReferenceField,
  DeleteButton,
} from 'react-admin';
import { Card, Typography, Container } from '@mui/material';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { gapi } from 'gapi-script';
import { sendAuthorizedApiRequest } from '../../Google/requestAuthorization.js';
import {
  buildParamsForNewGoogleDoc,
  saveDocumentIdToDB,
} from '../../Google/docBuilder.js';
import { CreateRelationButton } from '../custom/createRelationButton.js';
import GoogleDocButton from './customEventComponents/googleDocButton.js';

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
  const [isLoading, setLoading] = React.useState(false);

  const createNewGoogleDoc = async (record) => {
    setLoading(true);
    const moveDocToSharedDrive = async (response) => {
      const docId = response.documentId;
      console.log('made it to move Doc to shared drive, docId: ', docId);

      const requestDetails = {
        method: 'PATCH',
        path: `https://www.googleapis.com/drive/v3/files/${docId}`,
        params: {
          addParents: '10EXyxpVqTqHdJJB1S-MkVTTQS-usasgV',
          enforceSingleParent: true,
          supportsAllDrives: true,
        },
      };

      const GoogleAuth = gapi.auth2.getAuthInstance();

      await sendAuthorizedApiRequest(
        requestDetails,
        GoogleAuth,
        saveDocWrapper
      );
    };

    const saveDocWrapper = async (response) => {
      console.log('saving docId to db', response);
      try {
        const result = await saveDocumentIdToDB(record, response.id);
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

    try {
      const requestDetails = {
        method: 'POST',
        path: 'https://docs.googleapis.com/v1/documents',
        params: buildParamsForNewGoogleDoc(record),
      };

      const GoogleAuth = gapi.auth2.getAuthInstance();

      await sendAuthorizedApiRequest(
        requestDetails,
        GoogleAuth,
        moveDocToSharedDrive
      );
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error));
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

  return (
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
                  isLoading={isLoading}
                  googleDocId={record.googleDocId}
                  open={openGoogleDoc}
                  create={createNewGoogleDoc}
                  record={record}
                />
              );
            }}
          />
          <ReferenceField
            source='package.id'
            reference='packages'
            sortable={false}
            label='Package'
          >
            <TextField source='name' />
          </ReferenceField>
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
                    <Datagrid bulkActionButtons={false}>
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
                      <NumberField
                        label='Wage'
                        source='wage'
                        options={{ style: 'currency', currency: 'GBP' }}
                        emptyText={'Not agreed'}
                      />
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
