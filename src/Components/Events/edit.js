import * as React from 'react';
import { SimpleForm, required, Edit, DateInput, TextInput } from 'react-admin';

export const EventEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <DateInput source='date' validate={[required()]} />
        <TextInput source='type' />
        <TextInput source='client' validate={[required()]} />
        <TextInput source='location' />
        <TextInput source='notes' />
      </SimpleForm>
    </Edit>
  );
};
