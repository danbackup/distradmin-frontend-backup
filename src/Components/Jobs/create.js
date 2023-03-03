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

export const JobCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { isLoading, permissions } = usePermissions();

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
        {permissions === 'Super Admin' && <NumberInput source='wage' />}
      </SimpleForm>
    </Create>
  );
};
