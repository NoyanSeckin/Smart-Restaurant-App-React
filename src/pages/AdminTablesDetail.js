import {useParams} from 'react-router-dom'
import { getFirestore, collection, updateDoc, arrayUnion, doc, onSnapshot, getDoc} from "firebase/firestore";
import {Box, Container} from '@mui/material'
import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'

export default function AdminTablesDetail() {

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const db = getFirestore();

  async function fetchTable(){
    const tableRef = doc(db, 'Tables', `table_${tableNum}`)
    const tableSnap = await getDoc(tableRef)
    
    if(tableSnap.exists()){
      // recived db data is an object, reduce it to an array
      const ordersArray = Object.values(tableSnap.data()).reduce((total, currentValue) => {
      const valueHolder =[];
       currentValue.forEach(value => valueHolder.push(value))
      return [...total, ...valueHolder]  
       
      }, [])
      setTableOrders(ordersArray)
    }
  }

  function renderTable(){
    if(tableOrders.length > 0){
     return <AdminTableData tableOrders={tableOrders} tableNum={tableNum}/>
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
