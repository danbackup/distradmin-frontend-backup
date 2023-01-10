import * as React from 'react';
import {
  SimpleForm,
  required,
  Create,
  NumberInput,
  SelectInput,
  ReferenceInput,
  BooleanInput,
} from 'react-admin';

export const JobCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source='event' reference='events'>
          <SelectInput
            validate={[required()]}
            optionText={(record) =>
              `${record.date}, ${record.client}, ${record.location}`
            }
            optionValue='id'
          />
        </ReferenceInput>

        <BooleanInput source='canMD' label='MD' />
        <ReferenceInput source='musician' reference='musicians'>
          <SelectInput
            validate={[required()]}
            optionText='fName'
            optionValue='id'
            // translateChoice={false}
          />
        </ReferenceInput>
        <ReferenceInput source='instrument' reference='instruments'>
          <SelectInput
            validate={[required()]}
            optionText='name'
            optionValue='id'
            // translateChoice={false}
          />
        </ReferenceInput>
        <BooleanInput source='hotelRequired' label='Hotel Required' />
        <NumberInput source='wage' validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
