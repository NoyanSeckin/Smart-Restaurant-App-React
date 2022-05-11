import {Box, Button,Container, Typography, Paper} from '@mui/material';
import { getFirestore, doc, updateDoc, onSnapshot} from "firebase/firestore";
import firebaseApp from '../firebase/init';

import {NavLink} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import { connect } from "react-redux";
import {setTableItems, setCurrentTable, setCurrentOrder} from '../actions';
import TableComp from '../components/TableComp';
import UserBasket from '../components/UserBasket';

function Table({tableItems, setTableItems, currentTable, currentOrder, setCurrentOrder }) {

  const [orderedItems, setOrderedItems] = useState([]);
  const [activePage, setActivePage] = useState('New Order')
  const activeTable = `table_${currentTable}` 
  const db = getFirestore();
  const tableRef = doc(db, 'Tables', activeTable);
  
  const tableHeaders = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Meal/Beverage'}, {id: 'quantity', numeric: false, disablePadding: true, label: 'Quantity'},
    {id: 'price', numeric: false, disablePadding: true, label: 'Price'},
    {id: 'subtotal', numeric: false, disablePadding: true, label: 'Subtotal'},
    {id: 'status', numeric: false, disablePadding: true, label: 'Order Status'}];

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
        <Button onClick={()=> sendOrdersToDb()} variant='contained' sx={{mt: 3, background: '#ff9800'}}>Go To Menu</Button>
      </NavLink>
    )
  }
  useEffect(()=> {
    onSnapshot(tableRef, (snap)=>{
      setOrderedItems(snap.data())
    })
  }, [])

  function renderNavs(){
    const navs = ['New Order', 'Previous Orders'];
    return navs.map(nav => 
    <Typography sx={{
      fontSize: {xs: '0.9rem', md: '1.125rem'},
      fontWeight: '700',
      '&:hover': {
        cursor: 'pointer'
      }
    }} 
      onClick={()=> setActivePage(nav)}
      className={activePage === nav && 'active-nav' }>
        {nav}
      </Typography>)
  }
  function renderActivePage(){
    if(activePage === 'New Order'){
      return <UserBasket newHeaders={tableHeaders} tableItems={tableItems} setTableItems={setTableItems}/>
    } else return <TableComp directToMenu={directToMenu} sendOrdersToDb={sendOrdersToDb} orderedItems={orderedItems} tableItems={tableItems} ></TableComp>
  }
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh'}}>
      <Container maxWidth='xl'>
      <Box sx={{
        background: '#fff',
        display: 'flex',
        gap: {xs: 5, lg: '5rem'},
        pt: 5,
        pb: 3,
        px: 5, 
        }}>
        {renderNavs()}
      </Box>
      {renderActivePage()}
     
    </Container>
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
