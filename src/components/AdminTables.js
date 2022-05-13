import {Box, Button, Container, Typography, Grid} from '@mui/material'
import {Card, CardActions, CardContent} from '@mui/material'
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import {useHistory} from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, updateDoc} from "firebase/firestore";

import React, {useState, useEffect} from 'react'
export default function AdminTables({tables}) {
  
  const db = getFirestore();
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')
  const callsRef = doc(db, 'WaiterCalls', 'tables')

  const [occupiedTables, setOccupiedTables] = useState([]);
  const [waiterCalls, setWaiterCalls] = useState([]);
  const [waiterAlert, setWaiterAlert] = useState(true);

  // get occupied tables and waitercalls
  useEffect(()=> {
    onSnapshot(docRef, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
      })

      onSnapshot(callsRef, (doc) => {
        setWaiterCalls(doc.data().calls);
      })
    }, []) 

  let history = useHistory();

  useEffect(()=>{
    setTimeout(() => {
      setWaiterAlert(!waiterAlert);
    }, 1000);
  }, [waiterAlert])

  async function turnOffTableAlert(tableNum){
    const filteredAlerts = waiterCalls.filter(call => call !== tableNum);
    console.log(filteredAlerts)
    updateDoc(callsRef, {
      calls: filteredAlerts
    })
  }

  function returnAlertColor(){
    if(waiterAlert){
      return '#E3170A';
    }else return 'orange'
  }

  function renderTables(){
    const tables = [1,2,3,4,5,6,7,8,9]
    return tables.map(table =>  
    <Grid key={table} item lg={3} md={3}> 
      <Card elevation={5} 
      sx={{
        background: `${waiterCalls.includes(table) ? returnAlertColor() : '#F7B32B'}`, 
        px: 1, 
        pb: 1,
        position: 'relative'}}>
          {waiterCalls.includes(table) && 
          <AlarmOffIcon onClick={()=> turnOffTableAlert(table)}
          sx={{
            position: 'absolute', 
            right: '5px', 
            top: '5px', 
            '&:hover': {cursor: 'pointer'}}}/>}
        <CardContent sx={{textAlign: 'center', mt: 2}}>
           <Typography variant='h4'>
             {table}
           </Typography>
           <Typography sx={{mt: 3}}>
            {occupiedTables.includes(table) ? 
            'Table is Active' : 'Table is Empty'}
           </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex'}}>
          <Button variant='contained'
          onClick={()=> directToDetail(table)}
          sx={{
            color: 'primary.main', 
            flexGrow: 1,
            background: '#F2F2F2'
            }}>
            Go to Table
          </Button>
        </CardActions>
      </Card>
    </Grid>)
  }

  function directToDetail(tableNum){
    history.push(`/admintablesdetail/${tableNum}`)
    turnOffTableAlert(tableNum);
  }

  return (
    <Grid container sx={{display: 'flex', justifyContent: 'space-between', gap: 4}}>
     {renderTables()}
    </Grid>
  )
}
