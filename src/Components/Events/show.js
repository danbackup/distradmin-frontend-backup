import * as React from 'react';
import {
  Show,
  List,
  TextField,
  EmailField,
  DateField,
  FunctionField,
  ChipField,
  SingleFieldList,
  ReferenceManyField,
  ArrayField,
  NumberField,
  useRecordContext,
  TabbedShowLayout,
  Tab,
  Datagrid,
  BooleanField,
  ReferenceArrayField,
  ReferenceField,
  ReferenceOneField,
  WithRecord,
} from 'react-admin';
import { CustomReferenceManyField } from '../custom/CustomReferenceManyField.js';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export const EventShow = () => {
  return (
    <Show
      title={
        <FunctionField
          render={(record) =>
            record
              ? `${record.client} ${record.package.data.attributes.name}`
              : 'null'
          }
        />
      }
    >
      <TabbedShowLayout>
        <Tab label='Details'>
          <TextField label='Package' source='package.data.attributes.name' />
          <TextField source='client' label='Client' />
          <DateField source='date' />
          <TextField source='location' />
          <TextField source='notes' emptyText='None' />
        </Tab>
        <Tab label='Finance'>
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
        </Tab>
        <Tab label='Musicians'>
          <CustomReferenceManyField reference='jobs' target='event.data.id'>
            <Datagrid>
              <BooleanField source='md' TrueIcon={MilitaryTechIcon} />
              <FunctionField
                label='Musician'
                render={(record) =>
                  `${record.musician.data.attributes.fName} ${record.musician.data.attributes.lName}`
                }
              />
              <TextField
                source='instrument.data.attributes.name'
                label='Instrument'
              />
            </Datagrid>
          </CustomReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
