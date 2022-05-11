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
        console.log(snap.id, snap.data());
        // holderArray.push({[snap.id]: snap.data()});
      })
      // console.log(holderArray)
      // setTables(holderArray);
    })
  }, [])
  function renderTables(){
    
    return tables?.map((table, index) => {
   
      // const tableOrders = table[Object.keys(table)];
      // const tableOrdersArr = Object.entries(tableOrders)
      // console.log(tableOrdersArr)
      // tableOrdersArr.map(orders => {
      //   for(const order of orders[1]){
      //     console.log(Object.entries(order))
      //   }
      //   console.log(orders[0], '//', orders[1])
      // })
     
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
