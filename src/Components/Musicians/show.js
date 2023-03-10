import * as React from 'react';
import {
  Show,
  TextField,
  DateField,
  FunctionField,
  ChipField,
  SingleFieldList,
  NumberField,
  TabbedShowLayout,
  Tab,
  Datagrid,
  BooleanField,
  useRecordContext,
  ArrayField,
  ReferenceArrayField,
  usePermissions,
} from 'react-admin';
import { Card, Container, Typography } from '@mui/material';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const Title = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      {record.fName} {record.lName}
    </span>
  );
};

const FilteredEventList = () => {
  const { permissions, isLoading } = usePermissions();
  const record = useRecordContext();
  if (!record) return null;
  return isLoading ? (
    <div>Checking Permissions...</div>
  ) : record.jobs.length === 0 ? (
    <Card>
      <Container>
        <Typography variant='h5'>No Events</Typography>
      </Container>
    </Card>
  ) : (
    <Card>
      <CustomReferenceManyField
        reference='jobs'
        target='musician.data.id'
        resource='jobs'
      >
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id, resource, record) =>
            `/events/${record.event.data.id}/show`
          }
        >
          <DateField
            label='Date'
            source='event.data.attributes.date'
            sortable={false}
          />
          <TextField
            label='Location'
            source='event.data.attributes.location'
            sortable={false}
          />
          <TextField
            label='Instrument'
            source='instrument.data.attributes.name'
            sortable={false}
          />

          {permissions === 'Super Admin' && (
            <NumberField
              label='Wage'
              source='wage'
              options={{ style: 'currency', currency: 'GBP' }}
              emptyText={'Not agreed'}
            />
          )}
          <BooleanField source='md' />
        </Datagrid>
      </CustomReferenceManyField>
    </Card>
  );
};

export const MusicianShow = () => {
  return (
    <Show title={<Title />}>
      <TabbedShowLayout>
        <Tab label='Details'>
          <FunctionField
            label='Name'
            render={(record) => `${record.fName} ${record.lName}`}
          />
          <TextField source='location' />
          <TextField source='notes' emptyText='None' />
          <BooleanField
            source='canMD'
            label='Can MD'
            TrueIcon={MilitaryTechIcon}
          />

          <ReferenceArrayField source='instruments' reference='instruments'>
            <SingleFieldList linkType='show'>
              <ChipField source='name' />
            </SingleFieldList>
          </ReferenceArrayField>
        </Tab>
        <Tab label='Events'>
          <FilteredEventList />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
