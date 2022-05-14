import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography'
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
    <Box sx={{ width: '50%', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography sx={{color: 'textColor'}}>%{Math.round(progress)}</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{borderRadius: '8px', background: '#EAEAEA', width: '100%', my: 0.5} } />
      <Typography sx={{color: 'textColor', fontSize: '14px', ml: 1}}>Yükleniyor</Typography>
    </Box>
  );
}
