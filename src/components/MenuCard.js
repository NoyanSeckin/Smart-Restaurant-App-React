import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Modal from './Modal'
import EditModal from './EditModal'
import Spinner from './Spinner'

import {setTableItems} from '../actions'
import { connect } from 'react-redux';


const closeIconStyle = {
  color: 'danger.dark',
  position: 'absolute',
  right: '15px',
  bottom: '90px',
  '&:hover': {cursor: 'pointer'}
}

const editIconStyle = {
  color: 'primary.dark',
  position: 'absolute',
  right: '50px',
  bottom: '90px',
  '&:hover': {cursor: 'pointer'}
}

const addToTableBtnStyle = {
  backgroundColor: 'warning.dark', 
  mt: 1, 
  width: '100%', 
  '&:hover': {backgroundColor: 'warning.main'}
}

const decreaseIconStyle = {
  alignSelf: 'center', 
  '&:hover': {cursor: 'pointer'}
}

const increaseIconStyle = {
  alignSelf: 'center', 
  '&:hover': {cursor: 'pointer'}
}

const actionsContainerStyle = {
  display: 'flex', 
  justifyContent: 'space-between', 
  flexGrow: 1, 
  width: '100%'
}

function MenuCard({tableItems, setTableItems, item, counters, setCounters, index, setDeletedItemId, setIsDeleteItem, editItem, setEditItem, setIsEditItem, isSpinner, setIsSpinner, authentication}) {

  const [isModal, setIsModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)

  function renderImageOrSpinner(){
    if(isSpinner && editItem?.id === item.id){
      return <Spinner/>
    }else return  <CardMedia
    component="img"
    image={item.image}
    alt={item.name}
    height='180'
  />
  }

  function addToTable(item, itemCounter){
    const newItem = {...item, count: itemCounter}
    let isExistingObject = false;
    // check if item exists and set new counter if so
    tableItems.forEach(tableItem => {
      if(tableItem.name === item.name){
        const newCount = tableItem.count + newItem.count;
        tableItem.count = newCount;
        isExistingObject = true;
        setTableItems([...tableItems])
      }
    })
    // or else add it directly to table items
    if(!isExistingObject){
      setTableItems([...tableItems, newItem])
    }      
  }

  function handleCounterChange(index, value){
   let newValue = counters[index] + value;
   if(newValue < 0)newValue = 0;
   let countersCopy = counters;
   countersCopy[index] = newValue;
   setCounters([...countersCopy])
  }

  function handleDelete(id){
    setIsModal(true)
    setDeletedItemId(id)
  }

  function handleEdit(item){
    setIsEditModal(true);
    setEditItem(item);
  }

  function renderMenuEditDeleteIcons(){
    if(authentication){
      return(
        <div>
           <CloseIcon sx={closeIconStyle}  onClick={()=> handleDelete(item.id)}/>
          <EditIcon sx={editIconStyle} onClick={()=> handleEdit(item)}/>
        </div>
      )
    }
  }

  function renderCardContent(itemName, itemDescription){
    return(
      <CardContent sx={{pt: 0.5, px: 1}}>
      <Typography variant='h6'>
        {itemName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {itemDescription || 'Lorem ipsum'}
      </Typography>
    </CardContent>
    )
  }

  function renderCardActions(item, index){
    return(
      <CardActions sx={{display: 'flex', flexDirection: 'column'}} disableSpacing>
      <Typography sx={{alignSelf: 'start'}}>{item?.price} $</Typography>
        <Box sx={actionsContainerStyle}>
          <Typography sx={{fontWeight: 'bold'}} variant='caption'>Approx: {item.preperationTime}</Typography>
          <Box sx={{display: 'flex', gap: 1}}>
            <RemoveIcon fontSize='small' sx={decreaseIconStyle}
            onClick={()=> handleCounterChange(index, - 1)} />
            <Typography>{counters[index]}</Typography>
            <AddIcon fontSize='small' sx={increaseIconStyle}
            onClick={()=> handleCounterChange(index, 1)}/>
          </Box>
        </Box>
        <Button sx={addToTableBtnStyle} onClick={()=> addToTable(item, counters[index])} variant='contained'>Add to table</Button>
      </CardActions>
    )
  }
 
  function renderCards(){
      return(
        <Card key={item.id} 
        sx={{ 
          maxWidth: 300, minWidth: 300, px: 1, py: 1, position: 'relative' }}>
         {renderImageOrSpinner()}
         {renderMenuEditDeleteIcons()}
         {renderCardContent(item.name, item.description)}
         {renderCardActions(item, index)}
      </Card>
      )
  }

  function renderDeleteModal(){
    return  <Modal header='Deleting Item' content='Are you sure about it?' bgColor='#d32f2f' isModal={isModal} setIsModal={setIsModal} proceedAction={setIsDeleteItem}/>
  }

  function renderEditModal(){
    return <EditModal isModal={isEditModal} setIsModal={setIsEditModal} item={editItem} setItem={setEditItem} setIsEditItem={setIsEditItem} setIsSpinner={setIsSpinner}/>
  }

  return (
    <div>
      {renderCards()}
      {renderDeleteModal()}
      {renderEditModal()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
    authentication: state.authentication
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(MenuCard);

