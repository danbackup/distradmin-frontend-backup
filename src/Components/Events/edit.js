import * as React from 'react';
import {
  SimpleForm,
  required,
  Edit,
  DateInput,
  TextInput,
  NumberInput,
} from 'react-admin';

export const EventEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <DateInput source='date' validate={[required()]} />
        <TextInput source='type' />
        <TextInput source='client' validate={[required()]} />
        <TextInput source='location' />
        <TextInput source='notes' />
        <NumberInput source='gross' validate={[required()]} />
        <NumberInput source='deposit' validate={[required()]} />
        <NumberInput source='amountDue' validate={[required()]} />
        <NumberInput source='profit' validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
