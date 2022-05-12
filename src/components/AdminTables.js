import {Box, Button, Container, Typography, Grid} from '@mui/material'
import {Card, CardActions, CardContent} from '@mui/material'
import {useHistory} from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot} from "firebase/firestore";

import React, {useState, useEffect} from 'react'
export default function AdminTables({tables}) {
  
  const db = getFirestore();
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')
  
  const [occupiedTables, setOccupiedTables] = useState([]);
  
  useEffect(()=> {
    onSnapshot(docRef, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
      })
    }, []) 

  let history = useHistory();

  function renderTables(){
    const tables = [1,2,3,4,5,6,7,8,9]
    return tables.map(table =>  
    <Grid key={table} item lg={2} sx={{flexGrow: 1}}> 
      <Card elevation={5} sx={{background: 'orange'}}>
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
          sx={{
            color: '#ff1744', 
            flexGrow: 1,
            background: '#F2F2F2'
            }}>
            Close Table
          </Button>
          <Button variant='contained'
          sx={{flexGrow: 1}}
          onClick={()=> directToDetail(table)}>
            Go to Table
          </Button>
        </CardActions>
      </Card>
    </Grid>)
  }

  function directToDetail(tableNum){
    history.push(`/admintablesdetail/${tableNum}`)
  }

  return (
    <Grid container sx={{gap: 4}}>
     {renderTables()}
    </Grid>
  )
}
