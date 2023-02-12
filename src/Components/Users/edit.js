import * as React from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  SelectInput,
  usePermissions,
} from 'react-admin';

export const UserEdit = () => {
  const { isLoading, permissions } = usePermissions();
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <Edit>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} disabled />
        <TextInput source='email' validate={[required()]} disabled />
        {permissions === 'Super Admin' && (
          <SelectInput
            source='role'
            validate={[required()]}
            choices={[
              { id: 'Musician', name: 'Musician' },
              { id: 'Admin', name: 'Admin' },
              { id: 'Super Admin', name: 'Super Admin' },
            ]}
          />
        )}
      </SimpleForm>
    </Edit>
  );
};
