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
  usePermissions,
} from 'react-admin';

export const EventCreate = () => {
  const { isLoading, permissions } = usePermissions();
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <Create>
      <SimpleForm>
        <TextInput source='client' validate={[required()]} />
        <DateInput source='date' validate={[required()]} />
        <TextInput source='type' validate={[required()]} />

        <ReferenceInput source='package' reference='packages'>
          <SelectInput
            validate={[required()]}
            optionText='name'
            optionValue='id'
            // translateChoice={false}
          />
        </ReferenceInput>

        <TextInput source='location' validate={[required()]} />
        {permissions === 'Super Admin' && (
          <>
            <NumberInput source='gross' />
            <NumberInput source='deposit' />
            <NumberInput source='amountDue' />
            <NumberInput source='profit' />
          </>
        )}

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

        {/* <ReferenceArrayInput
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
        </ReferenceArrayInput> */}

        <TextInput source='team' />
      </SimpleForm>
    </Create>
  );
};
