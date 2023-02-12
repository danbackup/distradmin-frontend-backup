import * as React from 'react';
import {
  SimpleForm,
  required,
  Edit,
  DateInput,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  usePermissions,
} from 'react-admin';

export const EventEdit = () => {
  const { isLoading, permissions } = usePermissions();
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
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
        {permissions === 'Super Admin' && (
          <>
            <NumberInput source='gross' validate={[required()]} />
            <NumberInput source='deposit' validate={[required()]} />
            <NumberInput source='amountDue' validate={[required()]} />
            <NumberInput source='profit' validate={[required()]} />
          </>
        )}
      </SimpleForm>
    </Edit>
  );
};
