import {Box, Button, Container, Grid, Typography, Paper} from '@mui/material'
import QRCodeReact from 'qrcode.react';
import { initializeApp } from "firebase/app";
import firebaseApp from '../firebase/init'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getFirestore, onSnapshot, doc} from "firebase/firestore";

import {React, useEffect, useState} from 'react'

export default function Tables() {
  const db = getFirestore();
  const [occupiedTables, setOccupiedTables] = useState([]);
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')

  useEffect(()=> {
    onSnapshot(docRef, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
      })
    }, []) 
  
  function renderQrCodes(){
    const tables = [1,2,3,4,5,6];
    return tables.map(table => (
          <Grid item key={table} lg={3}  sx={{display: 'flex', gap: 5}}>
            <Typography variant='h1'>{table}</Typography>
            {occupiedTables?.includes(table) 
            ? 
              <CheckCircleIcon sx={{fontSize: '110px', color: '#357a38'}}></CheckCircleIcon>
            : <QRCodeReact value={`http://localhost:3000/menu/${table}`}>
              </QRCodeReact>}
         </Grid>
    ))
  }
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh'}}>
      <Container sx={{pt: 5}}>
        <Paper sx={{py: 5}}>
          <Typography sx={{ml: 9, mb: 5}} variant='h1'>Tables</Typography>
          <Grid container sx={{gap: 8, justifyContent: 'center'}}>
          {renderQrCodes()}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
