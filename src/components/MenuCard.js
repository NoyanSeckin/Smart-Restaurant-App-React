import * as React from 'react';
import {useState} from 'react'
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
// import {data} from '../data'
export default function MenuCard() {
  const addToBasket = (itemName, quantity) =>{
    
  }
  const decreaseMenuItem = (itemName) =>{
    let object;
    counters.forEach(counterObject => {
      console.log(counterObject);
      if(counterObject.name ===itemName){
        console.log('contains ',counterObject);
        object = counterObject
      }
    })
    if(!object){
      let newObject = {name:itemName, counter: -1};
      setCounters(counters=> [...counters, newObject]);
    }else if(object){
      let filteredArray = counters.filter(counterObject => counterObject.name !==itemName);
      object.counter = object?.counter - 1;
      setCounters(counters=> [...filteredArray, object])
    }
  }
  const increaseMenuItem = (itemName) => {
    let object;
    counters.forEach(counterObject => {
      console.log(counterObject);
      if(counterObject.name ===itemName){
        console.log('contains ',counterObject);
        object = counterObject
      }
    })
    if(!object){
      let newObject = {name:itemName, counter: + 1};
      setCounters(counters=> [...counters, newObject]);
    }else if(object){
      let filteredArray = counters.filter(counterObject => counterObject.name !==itemName);
      object.counter = object?.counter + 1;
      setCounters(counters=> [...filteredArray, object])
    }
  }
  const [counters, setCounters] = useState([{name: 'test', counter: 0}])
  const renderCards = () => {
    return data.map(item => { 
      return(
        <Card key={item.name} sx={{ maxWidth: 300 }}>
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
            onClick={()=>decreaseMenuItem(item.name)}>
            </ArrowLeftIcon>
            <Typography>{
            counters?.map(counterObject => {
            if(counterObject.name === item.name){
             return counterObject.counter
            } 
            }) }</Typography>
            <ArrowRightIcon onClick={()=> increaseMenuItem(item.name)}></ArrowRightIcon>
          </Box>
          <Button onClick={()=> addToBasket(item.name, item.quantity)} variant='contained'>Order</Button>
        </CardActions>
      </Card>
      )
    })
  }
  return (
    <div>
      {renderCards()}
    </div>
  );
}