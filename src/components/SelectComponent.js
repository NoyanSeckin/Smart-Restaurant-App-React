import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({getData}) {
  const [menu, setMenu] = React.useState('mainDishes');

  const handleChange = (event) => {
    setMenu(event.target.value);
    getData(event.target.value)
  };


  return (
    <Box sx={{ minWidth: 120, maxWidth: '300px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Menu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={menu}
          label="Menu"
          onChange={handleChange}
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