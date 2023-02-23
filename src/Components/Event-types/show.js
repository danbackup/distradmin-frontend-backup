import * as React from 'react';
import {
  Show,
  TextField,
  DateField,
  TabbedShowLayout,
  Tab,
  Datagrid,
  useRecordContext,
} from 'react-admin';
import { Card } from '@mui/material';
import CustomReferenceManyField from '../custom/CustomReferenceManyField';

const Title = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>{record.name}</span>;
};

const FilteredEventList = () => {
  const record = useRecordContext();
  console.log('YOOOO', record);
  if (!record) return null;
  return (
    <Card>
      <CustomReferenceManyField
        reference='events'
        target='event-type.data.id'
        resource='events'
      >
        <Datagrid rowClick={'show'} bulkActionButtons={false}>
          <DateField source='date' />
          <TextField source='client' />
          <TextField source='team' />
        </Datagrid>
      </CustomReferenceManyField>
    </Card>
  );
};

export const EventTypeShow = () => {
  return (
    <Show title={<Title />}>
      <TabbedShowLayout>
        <Tab label='Events'>
          <FilteredEventList />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
