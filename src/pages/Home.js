import {React, useEffect, useState} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QRCodeReact from 'qrcode.react';
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc} from "firebase/firestore";
import firebaseApp from '../firebase/init'

export default function Home() {

  const db = getFirestore();
  const [occupiedTables, setOccupiedTables] = useState([]);
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')
  useEffect(()=> {
    onSnapshot(docRef, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
        // const occupiedTableNums = [];
        // doc.data().tables.forEach(table => occupiedTableNums.push(table.tableNumber));
        // setOccupiedTables(occupiedTableNums);
      })
    }, []) 
    console.log("state tables", occupiedTables)
  function renderQrCodes(){
    const tables = [1,2,3,4,5,6];
    return tables.map(table => {
      if(occupiedTables?.includes(table)){
        return (
          <Grid key={table} item sx={{display: 'flex', gap: 5}}>
            <Typography variant='h1'>{table}</Typography>
            <CheckCircleIcon sx={{fontSize: '110px', color: '#357a38'}}></CheckCircleIcon>
         </Grid>
        )
      }
     else return(
      <Grid key={table} item sx={{display: 'flex', gap: 5}}>
        <Typography variant='h1'>{table}</Typography>
        <QRCodeReact value={`http://localhost:3000/menu/${table}`}></QRCodeReact>
      </Grid>
      )
    })
  }
  return (
    <Box sx={{width: '50%', mx: 'auto'}}>
      <Typography variant='h1'>Tables</Typography>
      <Grid sx={{display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', mt: 10}}>
        {renderQrCodes()}
      </Grid>
    </Box>
  )
}
