import React from 'react'
import { connect } from "react-redux";
import {setTableItems, setCurrentTable, setTables} from '../actions'
import TableComp from '../components/TableComp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import firebaseApp from '../firebase/init'
function Table({tableItems, currentTable, tables}) {

  const db = getFirestore();
  const docRef = doc(db, 'Tables', 'tables');
  console.log(currentTable, tables)
  const sendOrdersToDb = async () => {
    
  }
  return (
    <Box sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h2' sx={{fontWeight: 'bold'}} > 
        My Table
      </Typography>
      <TableComp tableItems={tableItems}></TableComp>
      <Button onClick={()=> console.log(tables, currentTable)} variant='contained' color='success' sx={{alignSelf: 'end', mt: 5}}>Order Now</Button>
    </Box>
  )
}


const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
    currentTable: state.currentTable,
    tables: state.tables
  };
};
export default connect(mapStateToProps, {
  setTableItems, setCurrentTable, setTables
})(Table);
