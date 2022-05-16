import {Box, Container, Grid, Paper} from '@mui/material'
import { getFirestore, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";

import {React, useState, useEffect} from 'react'
import {setCurrentTable, setTables} from '../actions'
import MenuCard from '../components/MenuCard'
import SelectComponent from '../components/SelectComponent'

function Menu({setCurrentTable, setTables}) {
  // get current table with id route parameter
  const { id } = useParams();
  
  const db = getFirestore();
  
  // add current table to the db
  const docRef = doc(db, 'OccupiedTables', 'occupiedTables');
  const [deletedItemId, setDeletedItemId] = useState('');
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const [editItem, setEditItem] = useState({});
  const [isEditItem, setIsEditItem] = useState(false);

  const [isSpinner, setIsSpinner] = useState(true);



  const fetchActiveTables = async () =>{
    const docSnap = await getDoc(docRef);
    const tables = docSnap.data().occupiedTables;
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

  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const [counters, setCounters] = useState([]);


  const menuRef = doc(db, 'Menu', `${selectedMenu}`);
  async function fetchSelectedMenu(){
    const menuSnap = await getDoc(menuRef);
    const menuArray = menuSnap.data()[selectedMenu]
    setActiveMenuItems(menuArray);

    // add counters to menu items, using a counter array in state 
    let totalCounters = [];
    for(let i = 0; i < menuArray.length; i++){
      totalCounters.push(0)
    }
    setCounters([...totalCounters])
  }

  useEffect(()=>{
    fetchSelectedMenu();
  },[selectedMenu])

  

  function renderCards(){
    return activeMenuItems.map((item, index) => 
      <MenuCard item={item} counters={counters} setCounters={setCounters} index={index} setDeletedItemId={setDeletedItemId} setIsDeleteItem={setIsDeleteItem} editItem={editItem} setEditItem={setEditItem} setIsEditItem={setIsEditItem} isSpinner={isSpinner} setIsSpinner={setIsSpinner}/>
    )
  }

  function deleteItem(){
    if(isDeleteItem){
      const stayingItems = activeMenuItems.filter(item => item.id !== deletedItemId)
      console.log(stayingItems)
      updateDoc(menuRef, {
        [selectedMenu]: stayingItems
      })
      fetchSelectedMenu();
      setIsDeleteItem(false);
    }
  }

  useEffect(()=>{
      deleteItem()
  }, [isDeleteItem])

  async function editMenuItem(){
    if(isEditItem){
      const unchangedItems = activeMenuItems.filter(item => item.id !== editItem.id);
      const allItems = [...unchangedItems, editItem];

      updateDoc(menuRef, {
        [selectedMenu]: allItems
      })
      console.log(editItem)
    
      setIsEditItem(false);
      fetchSelectedMenu().then(()=> setIsSpinner(false)
      )
    }
    
  }

  useEffect(()=> {
    editMenuItem()
  }, [isEditItem])

  return (
    <Box >
     <Container maxWidth='xl' sx={{py: 10}}>
         <SelectComponent getSelectedMenu={getSelectedMenu}/>
         <Box sx={{display: 'flex', pt: 2, gap: 4, flexWrap: 'wrap'}}>
           {renderCards()}
         </Box>
     </Container>
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


