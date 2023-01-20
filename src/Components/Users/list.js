import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  BooleanField,
} from 'react-admin';

const UsersList = () => {
  return (
    <List>
      <Datagrid rowClick='show'>
        <TextField source='name' />
        <TextField source='email' />
        <BooleanField source='isAdmin' label='Admin?' />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UsersList;
