import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  FunctionField,
  BooleanField,
} from 'react-admin';

export const JobList = () => {
  return (
    <List>
      <Datagrid>
        <DateField source='event.data.attributes.date' label='Date' />
        <FunctionField
          label='Musician'
          render={(record) =>
            `${record.musician.data.attributes.fName} ${record.musician.data.attributes.lName}`
          }
        />
        <TextField source='md' label='MD' />
        <TextField
          source='instrument.data.attributes.name'
          label='Instrument'
        />
        <NumberField
          label='Wage'
          source='wage'
          options={{ style: 'currency', currency: 'GBP' }}
          emptyText={'Not agreed'}
        />
        <BooleanField source='hotelRequired' />
      </Datagrid>
    </List>
  );
};
