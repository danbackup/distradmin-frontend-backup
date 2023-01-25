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
} from 'react-admin';

export const JobCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    redirect(`/events/${data.event}/show/2`);
    notify('Musician added!', { type: 'success' });
  };
  return (
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
        <NumberInput source='wage' validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
