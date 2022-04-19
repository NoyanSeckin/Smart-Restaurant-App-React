import {React, useState} from 'react'
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

  const [counter, setCounter] = useState(1);
  const activeTable = `table-${currentTable}` 
  const db = getFirestore();
  const docRef = doc(db, 'Tables', `table-${currentTable}`);
  console.log(currentTable, tables)
  const sendOrdersToDb = async () => {
    // const docSnap = await getDoc(docRef);
    // const tableOrders = docSnap.data().orders;
    // console.log(tableOrders);
    const orderNumber = `order${counter}`;

    updateDoc(docRef, {
      [orderNumber]: tableItems
    });


  }

  return (
    <Box sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h2' sx={{fontWeight: 'bold'}} > 
        My Table
      </Typography>
      <TableComp tableItems={tableItems} ></TableComp>
      <Button onClick={()=> sendOrdersToDb()} variant='contained' color='success' sx={{mt: 5}}>Order Now</Button>
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
