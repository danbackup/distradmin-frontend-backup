import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Create,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  BooleanInput,
} from 'react-admin';

export const MusicianCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='fName' validate={[required()]} />
        <TextInput source='lName' validate={[required()]} />
        <TextInput source='location' validate={[required()]} />
        <TextInput source='Notes' />
        <BooleanInput source='canMD' label='Can MD?' />

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
    </Create>
  );
};
