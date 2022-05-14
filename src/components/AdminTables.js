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
  const [waiterAlert, setWaiterAlert] = useState(false);

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
    }else return '#F58840'
  }

  function renderTableText(tableNum){
    if(waiterCalls.includes(tableNum)){
      return 'Waiter is needed!'
    }
    else if(occupiedTables.includes(tableNum)){
      return 'Active'
    }
    else return 'Empty'
  }
  function renderTableColor(tableNum){
    if(occupiedTables.includes(tableNum)){
      return '#F58840'
    }else return '#F3F4ED'
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
        background: `${waiterCalls.includes(table) ? returnAlertColor() : renderTableColor(table)}`, 
        px: 1, 
        pb: 1,
        position: 'relative'}}>
          {waiterCalls.includes(table) && 
          <Button endIcon={<AlarmOffIcon/>} 
          onClick={()=> turnOffTableAlert(table)}
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
    turnOffTableAlert(tableNum);
  }

  return (
    <Grid container sx={{display: 'flex', justifyContent: 'space-between', gap: 4}}>
     {renderTables()}
    </Grid>
  )
}
