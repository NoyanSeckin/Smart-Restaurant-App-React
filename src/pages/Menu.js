import {Box, Container, Grid, Paper} from '@mui/material'
import { getFirestore, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";

import {React, useState, useEffect} from 'react'
import {setCurrentTable, setTables} from '../actions'
import MenuCard from '../components/MenuCard'
import SelectComponent from '../components/SelectComponent'


const cardsContainerStyle = {
  display: 'flex', 
  justifyContent: {xs: 'center', sm: 'start'},
  pt: 2, 
  gap: 4, 
  flexWrap: 'wrap',
  }

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

  const [isSpinner, setIsSpinner] = useState(false);



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
      <MenuCard key={item.id} item={item} counters={counters} setCounters={setCounters} index={index} setDeletedItemId={setDeletedItemId} setIsDeleteItem={setIsDeleteItem} editItem={editItem} setEditItem={setEditItem} setIsEditItem={setIsEditItem} isSpinner={isSpinner} setIsSpinner={setIsSpinner}/>
    )
  }

  function deleteItem(){
    if(isDeleteItem){
      const stayingItems = activeMenuItems.filter(item => item.id !== deletedItemId)
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
      const menuItems = activeMenuItems;
      const index = activeMenuItems.findIndex(item => item.id === editItem.id);
      console.log(index)
      menuItems[index] = editItem;

      updateDoc(menuRef, {
        [selectedMenu]: menuItems
      }).then(()=> fetchSelectedMenu()).then(()=> setIsSpinner(false));

      setIsEditItem(false);
    }
    
  }

  useEffect(()=> {
    editMenuItem()
  }, [isEditItem])

  function renderSelectComponent(){
    return  <SelectComponent style={{mx: 'auto'}} getSelectedMenu={getSelectedMenu}/>
  }

  function renderPage(){
    return(
      <Container maxWidth='xl' sx={{py: {xs: 3, py: 10}}}>
      {renderSelectComponent()}
       <Box sx={cardsContainerStyle}>
         {renderCards()}
       </Box>
   </Container>
    )
  }

  return (
    <Box >
      {renderPage()}
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


