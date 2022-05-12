import {useParams} from 'react-router-dom'
import { getFirestore, collection, updateDoc, arrayUnion, doc, onSnapshot, getDoc} from "firebase/firestore";

import React, {useEffect, useState} from 'react'
import AdminTableData from '../components/AdminTableData'

export default function AdminTablesDetail() {

  const {tableNum} = useParams()
  const [tableOrders, setTableOrders] = useState([]);
  const db = getFirestore();

  const extraTableHeader = [{id: 'status', numeric: false, disablePadding: true, label: 'Order Number'}];
  
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
     return <AdminTableData tableOrders={tableOrders}/>
    }
  }

  useEffect(()=> {
    fetchTable()
  }, [])
  return (
    <div>
      {renderTable()}
    </div>
  )
}
