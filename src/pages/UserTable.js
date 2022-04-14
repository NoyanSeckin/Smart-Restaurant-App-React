import React from 'react'
import { connect } from "react-redux";
import {setTableItems} from '../actions'
import TableComp from '../components/TableComp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
function Table(props) {
  const renderPage = () =>{
    props.tableItems.map()
  }
  
  return (
    <Box sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h2' sx={{fontWeight: 'bold'}} > 
        My Table
      </Typography>
      <TableComp tableItems={props.tableItems}></TableComp>
    </Box>
  )
}


const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(Table);
