import {Box, Button,Container, Typography, Paper} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";

import {NavLink} from 'react-router-dom'
import {React, useState} from 'react';
import { connect } from "react-redux";
import {setTableItems, setCurrentTable, setCurrentOrder} from '../actions';
import PrevOrders from '../components/PrevOrders';
import UserBasket from '../components/UserBasket';

const navsContainerStyle = {
  background: '#fff',
  display: 'flex',
  gap: {xs: 5, lg: 5},
  }

function Table({tableItems, setTableItems, currentTable, currentOrder, setCurrentOrder }) {

  const [activePage, setActivePage] = useState('New Order')
  const activeTable = `table_${currentTable}` 
  const db = getFirestore();
  const tableRef = doc(db, 'Tables', activeTable);
  // orderstosend includes the selected item names in userbasket
  const [ordersToSend, setOrdersToSend] = useState();
  const [orderErrorMessage, setOrderErrorMessage] = useState('')

  const extraTableHeader = [{id: 'status', numeric: false, disablePadding: true, label: 'Order Status'}];

  // use session storage to display users ordered items
  function setItemsToSessionStorage(itemsArray){
    const existingOrders = sessionStorage.getItem('orders');
    if(existingOrders){
     const mergedArray = JSON.parse(existingOrders).concat(itemsArray);
     sessionStorage.setItem('orders', JSON.stringify(mergedArray)) ;
    }
    else{
      sessionStorage.setItem('orders', JSON.stringify(itemsArray))
    }
  }

  async function updateNewOrdersList(){
    const listRef = doc(db, 'NewOrders', 'newOrders')
    updateDoc(listRef, {
      newOrders: arrayUnion(Number(currentTable))
    })

  }

  const sendOrdersToDb = async () => {
    const orderedItems = [];
    const itemsToSessionStorage = [];
    
    tableItems?.forEach(item => {
      if(ordersToSend.includes(item.name)){
        const sessionItem = {...item, orderNumber: currentOrder};
        itemsToSessionStorage.push(sessionItem);
        delete item.image;
        orderedItems.push({...item, orderNumber: currentOrder, id: uuidv4()});
        console.log(orderedItems)
      }
    })

    if(orderedItems.length > 0){
      const orderNumber = `order_${currentOrder}`;
      updateDoc(tableRef, {
      [orderNumber]: orderedItems
      })
      setCurrentOrder(currentOrder + 1);
      
      const notOrderedItems = tableItems.filter(item => !ordersToSend.includes(item.name));
      setTableItems(notOrderedItems);
      
      updateNewOrdersList();
      setOrderErrorMessage('');
      setItemsToSessionStorage(itemsToSessionStorage);
    }else setOrderErrorMessage('Please choose items')
  }
  
  function directToMenuButton(){
    return(
      <NavLink to={`/menu/${currentTable}`}>
        <Button onClick={()=> sendOrdersToDb()} variant='contained' sx={{mt: 2, backgroundColor: 'warning.dark', '&:hover': {backgroundColor: 'warning.main'}}}>Go To Menu</Button>
      </NavLink>
    )
  }

  function renderDirectToMenu(){
    if(activePage === 'New Order'){
      return(
        <Paper elevation={0} sx={{mt: 2}}>
          <Typography variant='h5' sx={{mb: 1}}>Nothing to order!</Typography> 
          {<Typography>Check your previous orders.</Typography>}
          {directToMenuButton()}
        </Paper>
        ) 
    }else{
      return(
        <Paper elevation={0} sx={{mt: 2}}>
          <Typography variant='h5' sx={{mb: 1}}>No previous orders!</Typography> 
          {<Typography>Check our menu.</Typography>}
          {directToMenuButton()}
        </Paper>
      )
    }
}

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
      if(tableItems.length > 0){
        return <UserBasket tableItems={tableItems} setTableItems={setTableItems} sendOrdersToDb={sendOrdersToDb} setOrdersToSend={setOrdersToSend} orderErrorMessage={orderErrorMessage} setOrderErrorMessage={setOrderErrorMessage}/>
      }else{
        return renderDirectToMenu();
      }
    } 
    else return <PrevOrders renderDirectToMenu={renderDirectToMenu} tableItems={tableItems} />
  }
  return (
    <Box sx={{background: '#F2F2F2'}}>
       <Paper elevation={4} 
        sx={{py: 3, px: {xs: 1, sm: 4, md: 5}}}>
          <Box
          sx={navsContainerStyle}>
          {renderNavs()}
        </Box>
        {renderActivePage()}
        </Paper>
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
