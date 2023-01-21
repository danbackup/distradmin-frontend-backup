import * as React from 'react';
import { SimpleForm, TextInput, required, Edit } from 'react-admin';

export const PackageEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
