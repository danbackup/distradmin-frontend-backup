import React from 'react';
import { Button } from 'react-admin';
import CircularProgress from '@mui/material/CircularProgress';

const GoogleDocButton = ({ isLoading, googleDocId, open, create, record }) => {
  console.log('Google Doc ID: ' + googleDocId);
  if (!record) return null;
  if (isLoading) return <CircularProgress />;
  if (!googleDocId) {
    return (
      <Button
        label='Create Document'
        size='small'
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
        size='small'
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
