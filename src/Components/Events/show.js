import * as React from 'react';
import {
  Show,
  TextField,
  SimpleShowLayout,
  EmailField,
  DateField,
  FunctionField,
  ChipField,
  SingleFieldList,
  ReferenceArrayField,
  ArrayField,
  NumberField,
} from 'react-admin';

export const EventShow = () => (
  <Show
    title={
      <FunctionField
        render={(record) =>
          `${record.client} ${record.package.data.attributes.name}`
        }
      />
    }
  >
    <SimpleShowLayout>
      <TextField label='Package' source='package.data.attributes.name' />
      <TextField source='client' label='Client' />
      <DateField source='date' />
      <TextField source='location' />
      <NumberField
        label='Price'
        source='gross'
        options={{ style: 'currency', currency: 'GBP' }}
      />
      <NumberField
        source='deposit'
        options={{ style: 'currency', currency: 'GBP' }}
      />
      <NumberField
        source='amountDue'
        options={{ style: 'currency', currency: 'GBP' }}
      />
      <NumberField
        source='profit'
        options={{ style: 'currency', currency: 'GBP' }}
      />

      <ReferenceArrayField
        label='Instruments Required'
        source='instruments'
        reference='instruments'
      >
        <ArrayField source='instruments'>
          <SingleFieldList linkType='show'>
            <ChipField source='name' />
          </SingleFieldList>
        </ArrayField>
      </ReferenceArrayField>

      <TextField source='notes' emptyText='None' />

      <ReferenceArrayField
        label='Musicians'
        source='musicians'
        reference='musicians'
      >
        <ArrayField source='musicians'>
          <SingleFieldList linkType='show'>
            <ChipField source='fName' />
          </SingleFieldList>
        </ArrayField>
      </ReferenceArrayField>
      <TextField source='team' />

      {/* <TextField source='lName' label='Last Name' />
      <EmailField source='email' label='Email' />
      <DateField source='createdAt' label='Joined' />
      <DateField source='updatedAt' label='Last edited' showTime={true} />
      <ReferenceArrayField label='Pupils' source='pupils' reference='pupils'>
        <ArrayField source='pupils'>
          <SingleFieldList linkType='show'>
            <ChipField source='fName' />
          </SingleFieldList>
        </ArrayField>
      </ReferenceArrayField> */}
    </SimpleShowLayout>
  </Show>
);
