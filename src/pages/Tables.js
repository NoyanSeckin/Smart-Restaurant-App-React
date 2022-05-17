import {Box, Button, Container, Grid, Typography, Paper} from '@mui/material'
import QRCodeReact from 'qrcode.react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getFirestore, onSnapshot, doc} from "firebase/firestore";

import {React, useEffect, useState} from 'react'

export default function Tables() {
  const db = getFirestore();
  const [occupiedTables, setOccupiedTables] = useState([]);
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')

  useEffect(()=> {
    const abortCont = new AbortController()
    onSnapshot(docRef, {signal: abortCont.signal}, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
      })
      return () => abortCont.abort();
    }, []) 
  
  function renderQrCodes(){
    const tables = [1,2,3,4,5,6,7,8,9];
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
      <Container maxWidth='xl' sx={{pt: 5}}>
        <Paper sx={{py: 5, borderRadius: '8px'}}>
          <Grid container sx={{justifyContent: 'center', mb: 2}}>
            <Grid item lg={10} md={10} sx={{display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', md: 'start'}}}>
            <Typography variant='h1'>Tables</Typography>
            <Typography sx={{width: {xs: '80%', md: '40%', lg: '30%'}, ml: {xs: 5, md: 1}}}>Scan available Qr codes with your mobile phone. This will automatically assign you to the scanned code's table and direct you to the menu. Green tick marks means table is occupied.</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{gap: 8, justifyContent: 'center'}}>
          {renderQrCodes()}
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
