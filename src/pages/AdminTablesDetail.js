import {Box, Button, Container, Paper, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useParams} from 'react-router-dom'
import { NavLink } from "react-router-dom";
import {useHistory} from 'react-router-dom'
import { getFirestore,  updateDoc,  doc, getDoc, deleteField, arrayRemove} from "firebase/firestore";

import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'
import Modal from '../components/Modal'

export default function AdminTablesDetail() {
  let history = useHistory();

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);

  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isCancelTable, setIsCancelTable] = useState(false);
  
  const db = getFirestore();
  const tableRef = doc(db, 'Tables', `table_${tableNum}`)

  useEffect(()=> {
    fetchTable()
  }, [])
  
  async function fetchTable(){
    const tableSnap = await getDoc(tableRef)
    
    if(tableSnap.exists()){
      // recived db data is an object, reduce it to an array
      const recievedData = tableSnap.data();
      const ordersArray = Object.values(recievedData).reduce((total, currentValue) => {
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
     fetchTable();
     setIsDeleteTrue(false);
    }
  }

  async function removeOccupiedTable(){
    const occupiedTableRef = doc(db, 'OccupiedTables', 'occupiedTables');
    await updateDoc(occupiedTableRef, {
      occupiedTables: arrayRemove(Number(tableNum))
    })
    console.log(typeof tableNum)
  }

  async function cancelTable(){
      const fields = tableOrders.reduce((accumulator, currentOrder) => [...accumulator, currentOrder.orderNumber], []);
      const uniqueFields = [...new Set(fields)]
      
      uniqueFields.forEach(field => {
        const orderNum = `order_${field}`
        updateDoc(tableRef, {
          [orderNum]: deleteField()
        })
      })

      removeOccupiedTable()
      history.push('/admin');
      setIsCancelTable(false);
  }

  // cancel table
  useEffect(()=>{
    if(isCancelTable){
      cancelTable();
    }
  }, [isCancelTable])

  // delete selected items from db
  useEffect(() => {
    deleteSelectedItems();
    
  }, [isDeleteTrue])

  function renderTable(){
    if(tableOrders.length > 0){
     return <AdminTableData setDeletedItems={setDeletedItems} deletedItems={deletedItems} setIsDeleteTrue={setIsDeleteTrue} tableOrders={tableOrders} tableNum={tableNum} setIsCheckoutModal={setIsCheckoutModal} setIsCancelModal={setIsCancelModal}/>
    }else{
      return(
        <Paper sx={{
          borderRadius: '8px', 
          pt: 4, 
          pb: 2, 
          px: 2, 
          minHeight: '20vh'
          }}>
          <Typography variant='h5' sx={{fontWeight: 'bold'}}>
            Table has not ordered yet!
          </Typography>
          <Box sx={{display: 'flex', mt: 3}}>
            <NavLink to='/admin'>
              <Button  startIcon={<ArrowBackIcon/>}>
                Back to tables
              </Button>
            </NavLink>
            <Button variant='contained'
            onClick={cancelTable}
              sx={{
                color: '#ff1744', 
                background: '#F2F2F2',
                ml: 2,
                height: '30px',
                '&:hover': {background: '#F2F2F2'}
                }}>
            Cancel Table
          </Button>
          </Box>
        </Paper>
      )
    }
  }

 
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh'}}>
      <Container maxWidth='xl' sx={{pt:4}}>
      {renderTable()}
    </Container>
    <Modal isModal={isCheckoutModal} setIsModal={setIsCheckoutModal} header='Checking Out' content='Press proceed to checkout.' bgColor='#4B9CE2'/>
    <Modal isModal={isCancelModal} setIsModal={setIsCancelModal} header='Canceling Table' content='Press proceed to cancel table activity.' bgColor='#ff1744' proceedAction={setIsCancelTable}/>
    </Box>
  )
}
