import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Create
} from 'react-admin';

export const PackageCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};