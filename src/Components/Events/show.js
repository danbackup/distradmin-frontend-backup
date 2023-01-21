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
} from 'react-admin';
import {
  Card,
  Typography,
  Container,
  Button as MuiButton,
} from '@mui/material';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { gapi } from 'gapi-script';
import { sendAuthorizedApiRequest } from '../../Google/requestAuthorization.js';
import {
  buildParamsForNewGoogleDoc,
  saveDocumentIdToDB,
} from '../../Google/docBuilder.js';
import { Link } from 'react-router-dom';

const FilteredSetsList = () => {
  const record = useRecordContext();
  if (!record) return null;
  return record.sets.length === 0 ? (
    <Card>No linked sets!</Card>
  ) : (
    <Card>
      <CustomReferenceManyField
        reference='sets'
        target='event.data.id'
        resource='sets'
      >
        <Container>
          <Typography variant='h6'>Sets</Typography>
        </Container>
        <Datagrid rowClick='show'>
          <TextField source='name' />
          <TextField source='start' />
          <TextField source='end' />
        </Datagrid>
      </CustomReferenceManyField>
    </Card>
  );
};

const CreateRelatedJobButton = () => {
  const { id } = useRecordContext();
  return (
    <MuiButton
      component={Link}
      to={{
        pathname: '/jobs/create',
      }}
      state={{ record: { event: id } }}
    >
      Add Musician
    </MuiButton>
  );
};

export const EventShow = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [isClicked, setIsClicked] = React.useState(false);

  const createNewGoogleDoc = async (record) => {
    const saveDocWrapper = async (googleDocId) => {
      try {
        const result = await saveDocumentIdToDB(record, googleDocId);
        if (result.status !== 200) {
          throw result.status;
        }
        refresh();
        setIsClicked(true);
        notify('Document created', { type: 'success' });
      } catch (error) {
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
        saveDocWrapper
      );
    } catch (error) {
      console.log(JSON.stringify(error));
      notify('There was an error creating the Google Doc.', {
        type: 'error',
        undoable: false,
        autoHideDuration: 3000,
      });
    }
  };

  const openGoogleDoc = (googleDocId) => {
    const url = `https://docs.google.com/document/d/${googleDocId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
              return record.googleDocId || isClicked ? (
                <div>
                  <Button
                    label='Open Document'
                    size='small'
                    alignIcon='left'
                    variant='contained'
                    color='secondary'
                    sx={{ width: 200 }}
                    onClick={() => openGoogleDoc(record.googleDocId)}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    label='Create Document'
                    size='small'
                    alignIcon='left'
                    variant='contained'
                    color='secondary'
                    sx={{ width: 200 }}
                    onClick={() => createNewGoogleDoc(record)}
                  />
                </div>
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
                <div>None</div>
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
                    </Datagrid>
                    <CreateRelatedJobButton />
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
