import * as React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import ListExpand from './listExpand.js';

export const InstrumentsList = () => {
  return (
    <List>
      <Datagrid expand={ListExpand}>
        <TextField source='name' />
        <EditButton />
      </Datagrid>
    </List>
  );
};
