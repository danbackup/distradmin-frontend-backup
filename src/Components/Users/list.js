import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

const UsersList = () => {
  return (
    <List>
      <Datagrid rowClick='show'>
        <TextField source='name' />
        <TextField source='email' />
        <TextField source='role' />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UsersList;
