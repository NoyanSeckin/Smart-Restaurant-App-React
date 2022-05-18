import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({handlePreperationChange, id, value}) {

  function renderMenuItems(){
    const menuItems = ['Right Away', '3-5 Minutes', '5-10 Minutes', '10-15 Minutes', '15-20 Minutes', '20-25 Minutes', '25-30 Minutes', '30+ Minutes']

    return menuItems.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
  }

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
          {renderMenuItems()}
        </Select>
      </FormControl>
    </div>
  );
}
