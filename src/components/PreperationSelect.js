import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({handlePreperationChange, id, value}) {

  function renderMenuItems(){
    const menuItems = ['Right Away', '3-5 minutes', '5-10 minutes', '10-15 minutes', '15-20 minutes', '20-25 minutes', '25-30 minutes', '30+ minutes']

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
