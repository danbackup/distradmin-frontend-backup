import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
  ReferenceArrayField,
  DateField,
  NumberField,
  FunctionField,
} from 'react-admin';

export const MusicianList = () => {
  return (
    <List>
      <Datagrid>
        <FunctionField
          render={(record) => `${record.fName} ${record.lName}`}
          label='Name'
        />
        <TextField source='location' />
        <ReferenceArrayField
          source='instruments'
          reference='musicians'
          sortable={false}
        >
          <ArrayField label='Instruments' source='instruments'>
            <SingleFieldList linkType='show'>
              <ChipField source='name' />
            </SingleFieldList>
          </ArrayField>
        </ReferenceArrayField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
