import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Create,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  DateInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
} from 'react-admin';

export const EventCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='client' validate={[required()]} />
        <DateInput source='date' validate={[required()]} />

        <ReferenceInput source='package' reference='packages'>
          <SelectInput
            validate={[required()]}
            optionText='name'
            optionValue='id'
            // translateChoice={false}
          />
        </ReferenceInput>

        <TextInput source='location' validate={[required()]} />
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

        <TextInput source='notes' />

        <ReferenceArrayInput
          label='Musicians'
          reference='musicians'
          source='musicians'
        >
          <AutocompleteArrayInput
            optionText='fName'
            optionValue='id'
            translateChoice={false}
            parse={(value) => value && value.map((v) => ({ id: v }))}
            format={(value) => value && value.map((v) => v.id)}
          />
        </ReferenceArrayInput>

        <TextInput source='team' />
      </SimpleForm>
    </Create>
  );
};
