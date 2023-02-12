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
} from 'react-admin';
import { CircularProgressWithLabel } from '../custom/circularProgress';
import ColouredDateField from './customEventComponents/colouredDateField';

export const EventList = () => {
  const { isLoading, permissions } = usePermissions();
  return isLoading ? (
    <div>Checking permissions...</div>
  ) : (
    <List sort={{ field: 'date', order: 'DESC' }}>
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
          <>
            <NumberField
              source='profit'
              options={{ style: 'currency', currency: 'GBP' }}
            />
            <FunctionField
              label='Paid'
              render={(record) => {
                const progress = 100 - (record.amountDue / record.gross) * 100;
                return <CircularProgressWithLabel value={progress} />;
              }}
            />
          </>
        )}
        <EditButton />
      </Datagrid>
    </List>
  );
};
