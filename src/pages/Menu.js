import {React, useState, useEffect} from 'react'
import MenuCard from '../components/MenuCard'
import SelectComponent from '../components/SelectComponent'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import {setOccupiedTables} from '../actions'

function Menu({occupiedTables, setOccupiedTables}) {
  // get current table with id route parameter
  const { id } = useParams();
  
  useEffect(()=>{

    if(id){
      if(occupiedTables){
        setOccupiedTables([...occupiedTables, id])
      }else if(!occupiedTables){
        setOccupiedTables([id])
      }
    }   
  }, [])
  
  console.log(occupiedTables)
  
  const [selectedMenu, setSelectedMenu] = useState('mainDishes')
  // get selected item from SelectComponent 
  function getData(data){
    // set and send it to menucard
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

const mapStateToProps = (state) => {
  return {
    occupiedTables: state.occupiedTables,
  };
};
export default connect(mapStateToProps, {
  setOccupiedTables,
})(Menu);


