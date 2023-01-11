import React from 'react';
import { ReferenceManyField, useRecordContext } from 'react-admin';

export const CustomReferenceManyField = ({
  reference,
  target,
  children,
  resource,
}) => {
  const record = useRecordContext();
  if (!record) return null;
  if (!record[resource] || !record[resource].length) return null;
  return (
    <ReferenceManyField
      reference={reference}
      target={target}
      filter={{ id: record[resource] }}
      children={children}
    />
  );
};

export default CustomReferenceManyField;
