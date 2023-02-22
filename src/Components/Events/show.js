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
  DeleteButton,
  usePermissions,
} from 'react-admin';
import { Card } from '@mui/material';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { CreateRelationButton } from '../custom/createRelationButton.js';
import GoogleDocButton from './customEventComponents/googleDocButton.js';

import {
  createGoogleDocFromTemplate,
  populateDocContent,
  saveDocumentIdToDB,
} from '../../Google/docCreation';

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
  const [loading, setLoading] = React.useState(false);

  const createNewGoogleDoc = async (record) => {
    setLoading(true);
    const formattedEventDate = new Date(record.date).toLocaleDateString();
    try {
      //MAKE NEW GOOGLE DOC BY COPYING TEMPLATE TO CORRECT FOLDER
      const { id: newDocId } = await createGoogleDocFromTemplate(
        record,
        formattedEventDate
      );
      notify('Document created in google drive from template.', {
        type: 'success',
      });

      await saveDocumentIdToDB(record, newDocId);
      notify('Document saved to DB, now populating content', {
        type: 'success',
      });

      populateDocContent(record, newDocId, formattedEventDate);
      notify('Document successfully populated', { type: 'success' });

      refresh();
      setLoading(false);
    } catch (err) {
      console.error(err);
      notify('There was an error creating the document', { type: 'error' });
      setLoading(false);
      refresh();
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
