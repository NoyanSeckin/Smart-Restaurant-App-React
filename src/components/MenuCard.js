import * as React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {data} from '../data'
import Alert from './Alert'
// import {data} from '../data'

import {setTableItems} from '../actions'
import { connect } from 'react-redux';

function MenuCard(props) {
  const [zero, setZero] = useState('0');
  const [counters, setCounters] = useState([{name: 'test', counter: 0}]);
  const [isAlert, setIsAlert] = useState(false);
  const addToTable = (item) =>{
    // if item exist modify, else add it directly to tableItems
    if(item.counter > 0){
      let filteredItems = [];
      let existingItems = props.tableItems;
      let existingObject;
      existingItems.forEach(existingItem => {
        if(existingItem.name === item.name){
          existingObject = existingItem;
        }else{
          filteredItems.push(existingItem);
        }
      })
      if(existingObject){
        existingObject.count += item.counter;
        props.setTableItems([...filteredItems, existingObject])
      } else if(!existingObject){
        props.setTableItems([...existingItems, {name: item.name, count: item.counter, image: item.image, price: item.price }])
      }
      // reset the counter of that item
      // Switch Alert
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
    }
   
  }

  const addCounterToCards = (item, object, value) => {
    let filteredArray = counters.filter(counterObject => counterObject.name !== item.name);
      object.counter = object?.counter + value;
      setCounters(counters=> [...filteredArray, object])
      item.counter = object.counter;
  }
  // add and change counters state
  const changeMenuItemCounter = (item, value) =>{
    let object;
    counters.forEach(counterObject => {
      if(counterObject.name === item.name){
        object = counterObject
      }
    })
    if(!object){
      // add new object to the counters array
      // set value to 0 to prevent -1
      if(value === -1) value = 0
      let newObject = {name: item.name, counter: value};
      setCounters(counters=> [...counters, newObject]);
      item.counter = newObject.counter;
    }
    else if(object){
      if(object.counter + value < 0){
        addCounterToCards(item, object, 0)
      } else {
        addCounterToCards(item, object, value)
      }
    }
  }
 
  const renderCards = () => {
    return(
    <Box sx={{display: 'flex', gap: 8, flexWrap: 'wrap'}}> 
      {data[props.selectedMenu].map(item => { 
      return(
        <Card key={item.name} sx={{ maxWidth: 300, minWidth: 300 }}>
          <CardMedia
            component="img"
            height="194"
            image={item.image}
            alt={item.name}
          />
          <CardContent>
          <CardHeader>
            {item.name}
          </CardHeader>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}} disableSpacing>
          <Typography sx={{fontWeight: 'bold'}} variant='caption'>Approx: {item.preperationTime} min</Typography>
          <Box sx={{display: 'flex'}}>
            <ArrowLeftIcon 
            onClick={()=>changeMenuItemCounter(item, -1)}>
            </ArrowLeftIcon>
            {counters?.map(counterObject => {
            if(counterObject.name === item.name){
              return <Typography>{counterObject.counter}</Typography>
            } 
            })  }
            <ArrowRightIcon onClick={()=> changeMenuItemCounter(item, +1)}></ArrowRightIcon>
          </Box>
          <Button onClick={()=> addToTable(item)} variant='contained'>Order</Button>
        </CardActions>
      </Card>
      )
    })
  }
  </Box>)
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

