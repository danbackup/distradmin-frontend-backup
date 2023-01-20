import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  BooleanInput,
} from 'react-admin';

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} disabled />
        <TextInput source='email' validate={[required()]} disabled />
        <BooleanInput source='isAdmin' validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
