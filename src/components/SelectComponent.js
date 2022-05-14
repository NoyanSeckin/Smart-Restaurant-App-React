import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({getSelectedMenu, handleAddMenuChange, value}) {
  const [menu, setMenu] = React.useState('mainDishes');

  const handleChangeEvent = (event) => {
    setMenu(event.target.value);
    // send data
    getSelectedMenu(event.target.value)
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: '300px' }}>
      <FormControl fullWidth>
        <InputLabel 
          id="demo-simple-select-label">Menu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id='category'
          name='category'
          value={value || menu}
          label="Menu"
          onChange={handleAddMenuChange || handleChangeEvent}
        >
          <MenuItem value={'mainDishes'}>Main Dishes</MenuItem>
          <MenuItem value={'sideDishes'}>Side Dishes</MenuItem>
          <MenuItem value={'soups'}>Soups</MenuItem>
          <MenuItem value={'desserts'}>Desserts</MenuItem>
          <MenuItem value={'beverages'}>Beverages</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}