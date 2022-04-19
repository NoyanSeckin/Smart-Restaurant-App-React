import {React, useEffect, useState} from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore";
import firebaseApp from '../firebase/init'
import {Box, Grid, Typography} from '@mui/material'

export default function Admin() {
  const db = getFirestore();
  const colRef = collection(db, 'Tables');
  const [tables, setTables] = useState([]);
  useEffect(()=>{
    onSnapshot(colRef, snapshot => {
      const holderArray = [];
      snapshot.forEach(snap => {
        // console.log(snap.id);
        holderArray.push({[snap.id]: snap.data()});
      })
      console.log(holderArray)
      setTables(holderArray);
    })
  }, [])
  function renderTables(){
    
    return tables?.map((table, index) => {
      const ordersArray = Object.values(table).map(orders => {
        return  orders
      });
      // console.log(ordersArray)
      const orderArray = ordersArray.map(order => console.log(Object.values(order)));
      // orderArray.map(order => console.log(order))
      return(
        <Grid key={index} item> 
          <Typography variant="h1"> {index + 1} </Typography>
          {/* {console.log(Object.values(table).map(order => Object.values(order)))} */}
       
         </Grid>
      )
    })
  }
  return (
    <Box>
      {renderTables()}
    </Box>
  )
}
