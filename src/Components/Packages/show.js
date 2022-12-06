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
} from 'react-admin';
import { Card } from '@mui/material';
import CustomReferenceManyField from '../custom/CustomReferenceManyField';


const Title = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      {record.name}
    </span>
  );
};

export const PackageShow = () => {
  return (
    <Show title={<Title />}>
      <TabbedShowLayout>
        <Tab label='Events'>
          <Card>
            <CustomReferenceManyField
              reference='events'
              target='package.data.id'
              resource='events'
            >
              <Datagrid rowClick={'show'}>
                <DateField source='date'/>
                <TextField source='client'/>
                <TextField source='team' />

              </Datagrid>
            </CustomReferenceManyField>
          </Card>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
