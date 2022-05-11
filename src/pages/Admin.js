import {React, useEffect, useState} from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, arrayUnion, doc, onSnapshot} from "firebase/firestore";
import firebaseApp from '../firebase/init'
import {Box, Container, Grid, Typography} from '@mui/material'
import AdminTables from '../components/AdminTables'
export default function Admin() {
  const db = getFirestore();
  const colRef = collection(db, 'Tables');
  const [tables, setTables] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables')
  useEffect(()=> {
    onSnapshot(docRef, (doc) => {
        setOccupiedTables(doc.data().occupiedTables);
      })
    }, []) 
  
  useEffect(()=>{
    onSnapshot(colRef, snapshot => {
      const holderArray = [];
      snapshot.forEach(snap => {
        console.log(snap.id, snap.data());
        holderArray.push({tableNumber: snap.id, tableOrders: snap.data()})
      })
      setTables(holderArray);
    })
  }, [])
 
  return (
    <Box sx={{background: '#F2F2F2', minHeight: '120vh'}}>
      <Container maxWidth='xl'
      sx={{pt: 5}}>
        <AdminTables/>
      </Container>
    </Box>

  )
}
