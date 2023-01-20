import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Create,
  BooleanInput,
} from 'react-admin';

export const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} />
        <TextInput source='email' validate={[required()]} />
        <BooleanInput source='isAdmin' validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
