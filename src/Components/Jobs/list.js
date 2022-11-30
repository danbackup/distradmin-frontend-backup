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

export const JobList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source='md' label='MD' />
        <TextField
          source='instrument.data.attributes.name'
          label='Instrument'
        />
        <FunctionField
          label='Musician'
          render={(record) =>
            `${record.musician.data.attributes.fName} ${record.musician.data.attributes.lName}`
          }
        />
      </Datagrid>
    </List>
  );
};
