import {React, useState, useEffect} from 'react'
import MenuCard from '../components/MenuCard'
import SelectComponent from '../components/SelectComponent'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import {setCurrentTable, setTables} from '../actions'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import firebaseApp from '../firebase/init'

function Menu({setCurrentTable, setTables}) {
  // get current table with id route parameter
  const { id } = useParams();
  
  const db = getFirestore();
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables');
  
  // buraya gerek yok galiba bunu silebilirim
  const fetchActiveTables = async () =>{
    const docSnap = await getDoc(docRef);
    const tables = docSnap.data().occupiedTables;
    console.log(tables)
    setTables(tables);
    return tables;
  }
  useEffect(() => {
    const currentTable = Number(id);
    setCurrentTable(currentTable);
    
    // add currentTable to the db
    fetchActiveTables().then(activeTables => {
      if(!activeTables.includes(currentTable)){
        updateDoc(docRef, {
          occupiedTables: arrayUnion(currentTable)
        })
      }
    })
    
  }, [])
  
  const [selectedMenu, setSelectedMenu] = useState('mainDishes')
  // get selected item from SelectComponent 
  function getSelectedMenu(data){
    setSelectedMenu(data);
  }
  return (
    <Box sx={{mt: 10}}>
      <Grid sx={{flexDirection: 'column'}} container>
        <Grid item sx={{mt: 10, ml: {lg: 30}}} xs={9}>
          <SelectComponent getSelectedMenu={getSelectedMenu}></SelectComponent>
        </Grid>
        <Grid item xs={9} sx={{mt: 5, ml: {lg: 30}}}>
          <MenuCard selectedMenu={selectedMenu}></MenuCard>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    currentTable: state.currentTable,
    tables: state.tables,
  };
};
export default connect(mapStateToProps, {
  setCurrentTable, setTables
})(Menu);


