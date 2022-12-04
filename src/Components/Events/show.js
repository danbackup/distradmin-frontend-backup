import * as React from 'react';
import {
  Show,
  TextField,
  DateField,
  FunctionField,
  NumberField,
  TabbedShowLayout,
  Tab,
  Datagrid,
  BooleanField,
  Button,
} from 'react-admin';
import { Card } from '@mui/material';
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
          <div>
            <Button
              label='Google Document'
              size='small'
              alignIcon='left'
              variant='contained'
              color='secondary'
              sx={{ width: 200 }}
            />
          </div>
          <TextField label='Package' source='package.data.attributes.name' />
          <TextField source='client' label='Client' />
          <DateField source='date' />
          <TextField source='location' />
          <TextField source='notes' emptyText='None' />
          <Card>
            <CustomReferenceManyField
              reference='sets'
              target='event.data.id'
              resource='sets'
            >
              Sets
              <Datagrid rowClick='show'>
                <TextField source='name' />
                <TextField source='start' />
                <TextField source='end' />
              </Datagrid>
            </CustomReferenceManyField>
          </Card>
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
          <CustomReferenceManyField
            reference='jobs'
            target='event.data.id'
            resource='jobs'
          >
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
              <BooleanField source='hotelRequired' />
              <NumberField
                label='Wage'
                source='wage'
                options={{ style: 'currency', currency: 'GBP' }}
                emptyText={'Not agreed'}
              />
            </Datagrid>
          </CustomReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
