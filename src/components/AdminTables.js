import {Button, Typography, Grid} from '@mui/material'
import {Card, CardActions, CardContent} from '@mui/material'
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import {useHistory} from 'react-router-dom'
import { getFirestore, doc, onSnapshot, updateDoc, arrayRemove} from "firebase/firestore";

import React, {useState, useEffect} from 'react'

const gridContainerStyle = {
  display: 'flex', 
  justifyContent: 'space-between', 
  gap: 4
}

export default function AdminTables() {
  
  const db = getFirestore();
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')
  const callsRef = doc(db, 'WaiterCalls', 'tables')
  const newOrdersRef = doc(db, 'NewOrders', 'newOrders');

  const [occupiedTables, setOccupiedTables] = useState([]);
  // new orders are table numbers to trigger alert
  const [newOrders, setNewOrders] = useState([]);
  const [waiterCalls, setWaiterCalls] = useState([]);
  const [waiterAlert, setWaiterAlert] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(true);

  // get occupied tables and waitercalls
  useEffect(()=> {
   if(isComponentMounted){
    onSnapshot(docRef, (doc) => {
      setOccupiedTables(doc.data().occupiedTables);
    })

   }
    onSnapshot(callsRef, (doc) => {
      setWaiterCalls(doc.data().calls);
    })

    onSnapshot(newOrdersRef, (doc) => {
      setNewOrders(doc.data().newOrders)
    })

    return () => setIsComponentMounted(false)
    }, []) 

  let history = useHistory();

  useEffect(()=>{
    setTimeout(() => {
      setWaiterAlert(!waiterAlert);
    }, 1000);
  }, [waiterAlert])

  async function revertTableToNormal(tableNum, colRef, field){
    updateDoc(colRef, {
      [field]: arrayRemove(tableNum)
    })
  }

  function renderTableText(tableNum){
    if(waiterCalls.includes(tableNum)){
      return 'Waiter called!'
    }
    else if(newOrders.includes(tableNum)){
      return 'New Order'
    }
    else if(occupiedTables.includes(tableNum)){
      return 'Active'
    }
    else return 'Empty'
  }

  function returnTableColor(tableNum){
    if(waiterCalls.includes(tableNum)){
      if(waiterAlert) return 'danger.main'
      else return 'warning.dark'
    }
    else if(newOrders.includes(tableNum)){
      return 'primary.light'
    }
    else if(occupiedTables.includes(tableNum)){
      return '#F58840'
    }
    else return '#F3F4ED'
  }

  function renderGoToTableBtn(tableNum){
      return (
      <Button variant='contained'
      onClick={()=> directToDetail(tableNum)}
      sx={{
        visibility: !occupiedTables.includes(tableNum) && 'hidden',
        color: '#000', 
        flexGrow: 1,
        background: '#FCFFE7',
        '&:hover':{background: '#F2F2F2'}
        }}>
        Go to Table
      </Button>)
  }

  function renderTables(){
    const tables = [1,2,3,4,5,6,7,8,9]
    return tables.map(table =>  
    <Grid key={table} item lg={3} md={3}> 
      <Card elevation={5} 
      sx={{
        backgroundColor: returnTableColor(table), 
        px: 1, 
        pb: 1,
        position: 'relative'}}>
          {waiterCalls.includes(table) && 
          <Button endIcon={<AlarmOffIcon/>} 
          onClick={()=> revertTableToNormal(table, callsRef, 'calls')}
          sx={{
            color: '#000',
            position: 'absolute', 
            right: '5px', 
            top: '5px', 
            '&:hover': {cursor: 'pointer'}}}> Turn Off </Button>}
        <CardContent sx={{textAlign: 'center', mt: 2}}>
           <Typography variant='h4'>
             {table}
           </Typography>
           <Typography sx={{mt: 3}}>
            {renderTableText(table)}
           </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex'}}>
        {renderGoToTableBtn(table)}
        </CardActions>
      </Card>
    </Grid>)
  }

  function directToDetail(tableNum){
    history.push(`/admintablesdetail/${tableNum}`)
    revertTableToNormal(tableNum, callsRef, 'calls');
    revertTableToNormal(tableNum, newOrdersRef, 'newOrders');
  }

  return (
    <Grid container sx={gridContainerStyle}>
     {renderTables()}
    </Grid>
  )
}
