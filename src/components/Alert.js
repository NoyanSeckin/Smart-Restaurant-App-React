import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts({isAlert, setIsAlert}) {
  return (
    <div>
      {isAlert && 
      <Stack sx={{ width: '350px', position: 'absolute', top: '65px', right: 0 }} spacing={2}>
      <Alert onClose={() => setIsAlert(false)} severity="success">
        <AlertTitle>Success</AlertTitle>
        Items added to your basket — <strong>Happy meals!</strong>
      </Alert>
    </Stack>}
    </div>
    
  );
}