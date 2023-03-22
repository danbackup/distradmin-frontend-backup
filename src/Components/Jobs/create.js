import * as React from 'react';
import {
  SimpleForm,
  required,
  Create,
  NumberInput,
  SelectInput,
  ReferenceInput,
  BooleanInput,
  useNotify,
  useRedirect,
  usePermissions,
} from 'react-admin';
import { getFromBackend } from '../../DataProvider/backendHelpers';

const getMusicians = () => {
  const {data: musicians} = getFromBackend("musicians");
  return musicians;
}

export const JobCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { isLoading, permissions } = usePermissions();
  const musicianChoices = getMusicians();

  const onSuccess = (data) => {
    const redirectPath = permissions === "Super Admin" ? `events/${data.event}/show/2` : `/events/${data.event}/show/1`;
    redirect(redirectPath);
    notify('Musician added!', { type: 'success' });
  };
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <Create mutationOptions={{ onSuccess }}>
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

        <BooleanInput source='md' label='MD' />
          <SelectInput
            validate={[required()]}
            optionText={(record) => `${record.attributes.fName} ${record.attributes.lName}`}
            optionValue='id'
            choices={musicianChoices}
            // translateChoice={false}
          />
        <ReferenceInput source='instrument' reference='instruments'>
          <SelectInput
            validate={[required()]}
            optionText='name'
            optionValue='id'
            // translateChoice={false}
          />
        </ReferenceInput>
        <BooleanInput source='hotelRequired' label='Hotel Required' />
        {permissions === 'Super Admin' && <NumberInput source='wage' />}
      </SimpleForm>
    </Create>
  );
};
