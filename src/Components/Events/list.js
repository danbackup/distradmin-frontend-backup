import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  FunctionField,
  ReferenceField,
  usePermissions,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  DateInput,
  TextInput,
  NumberInput,
} from 'react-admin';
import { CircularProgressWithLabel } from '../custom/circularProgress';
import ColouredDateField from './customEventComponents/colouredDateField';

export const EventList = () => {
  const standardFilters = [
    <TextInput label='Client Name' source='client_containsi' alwaysOn />,
    <TextInput label='Location' source='location_containsi' />,
    <TextInput label='Team' source='team_containsi' />,
    <ReferenceArrayInput
      label='Package'
      source='package.id'
      reference='packages'
    >
      <AutocompleteArrayInput label='Package' />
    </ReferenceArrayInput>,
    <DateInput label='Date from' source='date_gte' />,
  ];
  const superAdminFilters = [
    ...standardFilters,
    <NumberInput label='Profit' source='profit_gte' />,
  ];

  const { isLoading, permissions } = usePermissions();

  const filters =
    permissions === 'Super Admin' ? superAdminFilters : standardFilters;

  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <List filters={filters} sort={{ field: 'date', order: 'DESC' }}>
      <Datagrid rowClick='show'>
        <ColouredDateField source='date' />
        <TextField source='type' />
        <ReferenceField
          source='package.data.id'
          reference='packages'
          sortable={false}
          label='Package'
        >
          <TextField source='name' />
        </ReferenceField>
        <TextField source='client' label='Client' />
        <TextField source='location' label='Location' />
        <TextField source='team' label='Team' />

        {permissions === 'Super Admin' && (
          <NumberField
            source='profit'
            options={{ style: 'currency', currency: 'GBP' }}
          />
        )}
        {permissions === 'Super Admin' && (
          <FunctionField
            label='Paid'
            render={(record) => {
              const progress = 100 - (record.amountDue / record.gross) * 100;
              return <CircularProgressWithLabel value={progress} />;
            }}
          />
        )}
        <EditButton />
      </Datagrid>
    </List>
  );
};
