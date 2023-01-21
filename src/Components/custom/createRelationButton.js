import { useRecordContext } from 'react-admin';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const CreateRelationButton = ({ resourceName, path, buttonText }) => {
  const { id } = useRecordContext();

  const state = { record: {} };
  state.record[resourceName] = id;

  return (
    <Button
      component={Link}
      to={{
        pathname: path,
      }}
      state={{ record: { event: id } }}
      sx={{ margin: 0.5 }}
    >
      {buttonText}
    </Button>
  );
};
