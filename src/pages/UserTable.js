import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { getFirestore, doc, updateDoc, onSnapshot} from "firebase/firestore";
import firebaseApp from '../firebase/init';

import {NavLink} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import { connect } from "react-redux";
import {setTableItems, setCurrentTable, setCurrentOrder} from '../actions';
import TableComp from '../components/TableComp';

function Table({tableItems, setTableItems, currentTable, currentOrder, setCurrentOrder }) {

  const activeTable = `table_${currentTable}` 
  const [orderedItems, setOrderedItems] = useState([]);
  const db = getFirestore();
  const tableRef = doc(db, 'Tables', activeTable);

  const sendOrdersToDb = async () => {
    const statusChangedArr = [];
    tableItems.forEach(item => {
      statusChangedArr.push({...item, status: 'Ordered'});
    })

    if(tableItems.length > 0){
      const orderNumber = `order_${currentOrder}`;
      updateDoc(tableRef, {
      [orderNumber]: statusChangedArr
      })
      console.log(orderNumber)
      setCurrentOrder(currentOrder + 1);
      setTableItems([]);
    }
  }
  function directToMenu(){
    return(
      <NavLink to={`/menu/${currentTable}`}>
        <Button onClick={()=> sendOrdersToDb()} variant='contained' color='success' sx={{mt: 5}}>Go To Menu</Button>
      </NavLink>
    )
  }
  useEffect(()=> {
    onSnapshot(tableRef, (snap)=>{
      setOrderedItems(snap.data())
    })
  }, [])
  return (
    <Box sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
   
      <TableComp directToMenu={directToMenu} sendOrdersToDb={sendOrdersToDb} orderedItems={orderedItems} tableItems={tableItems} ></TableComp>
     
    </Box>
  )
}


const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
    currentTable: state.currentTable,
    currentOrder: state.currentOrder
  };
};
export default connect(mapStateToProps, {
  setTableItems, setCurrentTable, setCurrentOrder
})(Table);
