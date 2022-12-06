import * as React from 'react';
import {
  ChipField,
  Datagrid,
  ReferenceArrayField,
  Show,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin';
import CustomReferenceManyField from '../custom/CustomReferenceManyField';

const Title = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      {record.event.data.attributes.client} - {record.name}
    </span>
  );
};

export const SetShow = () => {
  return (
    <Show title={<Title />}>
      <TabbedShowLayout>
        <Tab label='Details'>
          <TextField source='name' />
          <TextField source='start' />
          <TextField source='end' />
          <TextField source='notes' emptyText='None set' />
          <ReferenceArrayField source='musicians' reference='musicians'>
            <SingleFieldList>
              <ChipField source='fName' />
            </SingleFieldList>
          </ReferenceArrayField>
        </Tab>

        <Tab label='Songs'>
          <CustomReferenceManyField
            reference='songs'
            target='set.data.id'
            resource='songs'
          >
            <Datagrid rowClick='show'>
              <TextField source='name' />
              <TextField source='artist' />
              <TextField source='notes' />
            </Datagrid>
          </CustomReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
