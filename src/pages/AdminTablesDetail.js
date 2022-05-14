import {useParams} from 'react-router-dom'
import { getFirestore,  updateDoc,  doc, onSnapshot, getDoc} from "firebase/firestore";
import {Box, Button, Container, Paper, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'
import Modal from '../components/Modal'

export default function AdminTablesDetail() {

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);
  const [isModal, setIsModal] = useState(false);

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

  useEffect(() => {
    if(isDeleteTrue){
      const deletingItems = tableOrders.filter(orderItem => deletedItems.includes(orderItem.id));
      const stayingItems = tableOrders.filter(orderItem => !deletedItems.includes(orderItem.id));

      deletingItems.forEach(item => {
       const orderNumber = `order_${item.orderNumber}`;
       
       const ordersToUpload = stayingItems.filter(stayingItem => stayingItem.orderNumber === item.orderNumber)
       console.log(ordersToUpload)

      updateDoc(tableRef, {
        [orderNumber]: ordersToUpload
      })
     })
    }
    fetchTable();
    // console.log(deletedItems)
    setIsDeleteTrue(false);
  }, [isDeleteTrue])

  function renderTable(){
    if(tableOrders.length > 0){
     return <AdminTableData setDeletedItems={setDeletedItems} deletedItems={deletedItems} setIsDeleteTrue={setIsDeleteTrue} tableOrders={tableOrders} tableNum={tableNum} setIsModal={setIsModal}/>
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
    <Modal isModal={isModal} setIsModal={setIsModal}/>
    </Box>
  )
}
