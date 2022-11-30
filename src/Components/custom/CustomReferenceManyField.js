import React from 'react';
import { ReferenceManyField, useRecordContext } from 'react-admin';

export const CustomReferenceManyField = ({ reference, target, children }) => {
  const record = useRecordContext();
  if (!record) return null;
  console.log('record', record);
  return (
    <ReferenceManyField
      reference={reference}
      target={target}
      filter={{ id: record.jobs }}
      children={children}
    />
  );
};

export default CustomReferenceManyField;
