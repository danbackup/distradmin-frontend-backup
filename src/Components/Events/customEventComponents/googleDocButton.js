import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Button } from 'react-admin';

const GoogleDocButton = ({ isLoading, googleDocId, open, create, record }) => {
  console.log('Google Doc ID: ' + googleDocId);
  if (!record) return null;
  if (isLoading) return <CircularProgress />;
  if (!googleDocId) {
    return (
      <Button
        label='Create Document'
        alignIcon='left'
        variant='contained'
        color='secondary'
        sx={{ width: 200 }}
        onClick={() => create(record)}
      />
    );
  } else {
    return (
      <Button
        label='Open Document'
        alignIcon='left'
        variant='contained'
        color='secondary'
        sx={{ width: 200 }}
        onClick={() => open(googleDocId)}
      />
    );
  }
};

export default GoogleDocButton;
