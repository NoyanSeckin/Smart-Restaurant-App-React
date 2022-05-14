import {Box, Button, Container, Paper, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useParams} from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { getFirestore,  updateDoc,  doc, onSnapshot, getDoc} from "firebase/firestore";

import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'
import Modal from '../components/Modal'

export default function AdminTablesDetail() {

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  
  const db = getFirestore();
  const tableRef = doc(db, 'Tables', `table_${tableNum}`)
  
  async function fetchTable(){
    const tableSnap = await getDoc(tableRef)
    
    if(tableSnap.exists()){
      // recived db data is an object, reduce it to an array
      const recievedData = tableSnap.data();
      console.log(recievedData)
      const ordersArray = Object.values(tableSnap.data()).reduce((total, currentValue) => {
      const valueHolder =[];
       currentValue.forEach(value => valueHolder.push(value))
      return [...total, ...valueHolder]  
       
      }, [])
      setTableOrders(ordersArray)
    }
  }

  async function deleteSelectedItems(){
    if(isDeleteTrue){
      const deletingItems = tableOrders.filter(orderItem => deletedItems.includes(orderItem.id));
      const stayingItems = tableOrders.filter(orderItem => !deletedItems.includes(orderItem.id));

      deletingItems.forEach(item => {
       const orderNumber = `order_${item.orderNumber}`;
       
       const ordersToUpload = stayingItems.filter(stayingItem => stayingItem.orderNumber === item.orderNumber)

      updateDoc(tableRef, {
        [orderNumber]: ordersToUpload
      })
     })
    }
  }

  // delete selected items from db
  useEffect(() => {
    deleteSelectedItems();
    fetchTable();
    // console.log(deletedItems)
    setIsDeleteTrue(false);
  }, [isDeleteTrue])

  function renderTable(){
    if(tableOrders.length > 0){
     return <AdminTableData setDeletedItems={setDeletedItems} deletedItems={deletedItems} setIsDeleteTrue={setIsDeleteTrue} tableOrders={tableOrders} tableNum={tableNum} setIsCheckoutModal={setIsCheckoutModal} setIsCancelModal={setIsCancelModal}/>
    }else{
      return(
        <Paper sx={{borderRadius: '8px', pt: 4, pb: 2, px: 2, minHeight: '20vh'}}>
          <Typography variant='h5' sx={{fontWeight: 'bold'}}>
            Table has not ordered yet!
          </Typography>
          <NavLink to='/admin'>
            <Button  startIcon={<ArrowBackIcon/>}
            sx={{mt: 3}}>
              Back to tables
            </Button>
          </NavLink>
        </Paper>
      )
    }
  }

  useEffect(()=> {
    fetchTable()
  }, [])
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt:4}}>
      {renderTable()}
    </Container>
    <Modal isModal={isCheckoutModal} setIsModal={setIsCheckoutModal} header='Checking Out' content='Press proceed to checkout.' bgColor='#4B9CE2'/>
    <Modal isModal={isCancelModal} setIsModal={setIsCancelModal} header='Canceling Table' content='Press proceed to cancel table activity.' bgColor='#ff1744' />
    </Box>
  )
}
