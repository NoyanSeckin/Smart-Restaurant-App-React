import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({handlePreperationChange, id, value, style}) {
  return (
    <div>
      <FormControl sx={{minWidth: 120 }} 
          fullWidth
          >
        <Select
          id={id}
          name={id}
          value={value}
          onChange={handlePreperationChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='Right Away'>Right Away</MenuItem>
          <MenuItem value='3-5 minutes'>3-5 Minutes</MenuItem>
          <MenuItem value='5-10 minutes'>5-10 Minutes</MenuItem>
          <MenuItem value='10-15 minutes'>10-15 Minutes</MenuItem>
          <MenuItem value='15-20 minutes'>15-20 Minutes</MenuItem>
          <MenuItem value='20-25 minutes'>20-25 Minutes</MenuItem>
          <MenuItem value='25-30 minutes'>25-30 Minutes</MenuItem>
          <MenuItem value='30+ minutes'>30+ Minutes</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
