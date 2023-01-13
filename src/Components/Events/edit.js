import * as React from 'react';
import {
  SimpleForm,
  required,
  Edit,
  DateInput,
  TextInput,
  NumberInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

export const EventEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <DateInput source='date' validate={[required()]} />
        <TextInput source='type' />

        <ReferenceInput
          source='package.id'
          reference='packages'
          sortable={false}
        >
          <SelectInput label='Package' validate={[required()]} />
        </ReferenceInput>

        <TextInput source='client' validate={[required()]} />
        <TextInput source='location' />
        <TextInput source='notes' />
        <NumberInput source='gross' validate={[required()]} />
        <NumberInput source='deposit' validate={[required()]} />
        <NumberInput source='amountDue' validate={[required()]} />
        <NumberInput source='profit' validate={[required()]} />
        <ReferenceArrayInput
          label='Instruments Required'
          reference='instruments'
          source='instruments'
        >
          <AutocompleteArrayInput
            optionText='name'
            optionValue='id'
            translateChoice={false}
            parse={(value) => value && value.map((v) => ({ id: v }))}
            format={(value) => value && value.map((v) => v.id)}
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
