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
import Alert from './Alert'

import {setTableItems} from '../actions'
import { connect } from 'react-redux';

function MenuCard({tableItems, setTableItems, item, counters, setCounters, index}) {
  const [isAlert, setIsAlert] = useState(false);

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
 
  const renderCards = () => {
      return(
        <Card key={index} 
        sx={{ maxWidth: 300, minWidth: 300, px: 1, py: 1 }}>
          <CardMedia
            component="img"
            height="194"
            image={item.image}
            alt={item.name}
          />
          <CardContent sx={{pt: 0.5}}>
          <Typography variant='h6'>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description || 'Lorem ipsum'}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', flexDirection: 'column'}} disableSpacing>
          <Box sx={{display: 'flex', justifyContent: 'space-between', flexGrow: 1, width: '100%'}}>
            <Typography sx={{fontWeight: 'bold'}} variant='caption'>Approx: {item.preperationTime} min</Typography>
            <Box sx={{display: 'flex', gap: 1}}>
              <RemoveIcon fontSize='small' sx={{alignSelf: 'center', '&:hover': {cursor: 'pointer'}}}
              onClick={()=> handleCounterChange(index, - 1)} />
              <Typography>{counters[index]}</Typography>
              <AddIcon fontSize='small' sx={{alignSelf: 'center', '&:hover': {cursor: 'pointer'}}}
              onClick={()=> handleCounterChange(index, 1)}/>
            </Box>
          </Box>
          <Button sx={{width: '100%', mt: 1, background: '#F58840'}} onClick={()=> addToTable(item, counters[index])} variant='contained'>Order</Button>
        </CardActions>
      </Card>
      )
  }

  return (
    <div>
       {renderCards()}
      <Alert isAlert={isAlert} setIsAlert={setIsAlert}></Alert>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(MenuCard);

