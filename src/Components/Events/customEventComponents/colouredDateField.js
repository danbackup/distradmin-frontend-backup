import React from 'react';
import { DateField, useRecordContext } from 'react-admin';

const ColouredDateField = (props) => {
  const record = useRecordContext();
  const now = new Date().getTime();
  const nowDateUkLocale = new Date().toLocaleDateString('en-UK');
  const recordDateUkLocale = new Date(record.date).toLocaleDateString('en-UK');
  const dateIsToday = nowDateUkLocale === recordDateUkLocale;

  return dateIsToday ? (
    'TODAY'
  ) : (
    <DateField
      source={props.source}
      sx={{
        color: dateIsToday
          ? 'blue'
          : new Date(record.date).getTime() < now
          ? 'gray'
          : null,
      }}
      {...props}
    />
  );
};

export default ColouredDateField;
