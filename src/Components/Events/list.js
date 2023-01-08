import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
  ReferenceArrayField,
  DateField,
  NumberField,
  FunctionField,
} from 'react-admin';
import { CircularProgressWithLabel } from '../custom/circularProgress';

export const EventList = () => {
  return (
    <List>
      <Datagrid rowClick='show'>
        <DateField source='date' />
        <TextField source='type' />
        <TextField source='package.data.attributes.name' label='Package' />
        <TextField source='client' label='Client' />
        <TextField source='location' label='Location' />
        <TextField source='team' label='Team' />
        {/* <NumberField
          label='Price'
          source='gross'
          options={{ style: 'currency', currency: 'GBP' }}
        /> */}
        <NumberField
          source='profit'
          options={{ style: 'currency', currency: 'GBP' }}
        />
        <FunctionField
          label='Paid'
          render={(record) => {
            const progress = 100 - (record.amountDue / record.gross) * 100;
            return <CircularProgressWithLabel value={progress} />;
          }}
        />
        <EditButton />
      </Datagrid>
    </List>
  );
};
