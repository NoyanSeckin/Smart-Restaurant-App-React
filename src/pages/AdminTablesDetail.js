import {useParams} from 'react-router-dom'
import { getFirestore, collection, updateDoc, arrayRemove, doc, onSnapshot, getDoc} from "firebase/firestore";
import {Box, Container} from '@mui/material'
import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'

export default function AdminTablesDetail() {

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);

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
     return <AdminTableData setDeletedItems={setDeletedItems} setIsDeleteTrue={setIsDeleteTrue} tableOrders={tableOrders} tableNum={tableNum}/>
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
    </Box>
  )
}
