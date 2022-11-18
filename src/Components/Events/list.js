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
} from 'react-admin';

export const EventList = () => {
  return (
    <List>
      <Datagrid rowClick='show'>
        <DateField source='date' />
        <TextField source='package.data.attributes.name' label='Package' />
        <TextField source='client' label='Client' />
        <TextField source='location' label='Location' />
        <TextField source='team' label='Team' />
        <NumberField
          label='Price'
          source='gross'
          options={{ style: 'currency', currency: 'GBP' }}
        />
        <NumberField
          source='profit'
          options={{ style: 'currency', currency: 'GBP' }}
        />

        {/* <ReferenceArrayField source="teachers" reference="teachers" sortable={false}>
                <ArrayField label="Teachers" source="teachers">
                    <SingleFieldList linkType="show">
                        <ChipField source="fName" />
                    </SingleFieldList>
                </ArrayField>
            </ReferenceArrayField> */}
        {/* <ReferenceArrayField source="rooms" reference="rooms" sortable={false}>
                <ArrayField label="Rooms" source="rooms">
                    <SingleFieldList linkType="list">
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
            </ReferenceArrayField> */}
        <EditButton />
      </Datagrid>
    </List>
  );
};
