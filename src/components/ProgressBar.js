import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography'

const containerStyle = { 
  alignItems: 'center',
  borderRadius: '8px', 
  display: 'flex', 
  flexDirection: 'column', 
  width: '50%', 
}

const progressBarStyle = {
  borderRadius: '8px', 
  background: '#EAEAEA', 
  my: 0.5,
  width: '100%'
} 

const loadingTextStyle = {
  color: 'textColor', 
  fontSize: '14px', 
  ml: 1
}

export default function ProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 60);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={containerStyle}>
      <Typography sx={{color: 'textColor'}}>%{Math.round(progress)}</Typography>
      <LinearProgress variant="determinate" value={progress} sx={progressBarStyle} />
      <Typography sx={loadingTextStyle}>Loading</Typography>
    </Box>
  );
}
