import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton
} from 'react-admin';

const PackagesList = () => {
  return (
    <List>
      <Datagrid rowClick='show'>
       <TextField source='name' />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export default PackagesList