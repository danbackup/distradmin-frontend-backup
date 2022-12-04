import React from 'react';
import {
  ArrayField,
  CardContentInner,
  ChipField,
  SingleFieldList,
} from 'react-admin';
import CustomReferenceManyField from '../custom/CustomReferenceManyField';

const ListExpand = () => {
  return (
    <CardContentInner>
      <ArrayField label='Instruments' source='musicians'>
        <SingleFieldList linkType='show' resource='musicians'>
          <ChipField source='fName' />
        </SingleFieldList>
      </ArrayField>
    </CardContentInner>
  );
};

export default ListExpand;
