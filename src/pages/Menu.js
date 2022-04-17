import {React, useState} from 'react'
import MenuCard from '../components/MenuCard'
import SelectComponent from '../components/SelectComponent'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export default function Menu() {

  // let selectedMenu = 'mainDishes';
  const [selectedMenu, setSelectedMenu] = useState('mainDishes')
  function getData(data){
    console.log(data)
    setSelectedMenu(data);
  }
  return (
    <Box sx={{mt: 10}}>
      <Grid sx={{flexDirection: 'column'}} container>
        <Grid item sx={{mt: 10, ml: {lg: 30}}} xs={9}>
          <SelectComponent getData={getData}></SelectComponent>
        </Grid>
        <Grid item xs={9} sx={{mt: 5, ml: {lg: 30}}}>
          <MenuCard selectedMenu={selectedMenu}></MenuCard>
        </Grid>
      </Grid>
    </Box>
  )
}
