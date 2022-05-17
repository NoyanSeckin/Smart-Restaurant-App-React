import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

export default function BasicTable({renderDirectToMenu}) {

  const [orderedItems, setOrderedItems] = useState([]);

  function getOrderedItems(){
    const existingOrders = sessionStorage.getItem('orders');
    if(existingOrders){
      setOrderedItems(JSON.parse(existingOrders));
    }
  }

  useEffect(()=> {
    getOrderedItems();
  }, [])
  

  function renderTable(items){
    return(
      <Box>
      <TableContainer sx={{width: '100%', mt: 3}} component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{width: '100px'}}>Meal/Beverage</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Subtotal</TableCell>
            <TableCell align="center">Order Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0}}}
            >
              <TableCell align='left' sx={{display: 'flex', gap: 5, pr: 0}} component="th" scope="row">
                 <img style={{width: '100px', borderRadius: '8px'}} src={row.image} alt="" /> 
                 <Typography sx={{alignSelf: 'center', justifySelf: 'center'}}>
                   {row.name}
                 </Typography>
              </TableCell>
              <TableCell  padding='none' size={'small'} align="center"> {row.count} </TableCell>
              <TableCell align="center">{row.price}$</TableCell>
              <TableCell align="center">{row.price * row.count}$</TableCell>
              <TableCell align="center">{row?.orderNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
    )
  }
  function renderTableItems(){
    return(
      orderedItems.length > 0 && renderTable(orderedItems)
    )
  }

  function renderPage(){
    if(orderedItems.length > 0){
      return renderTableItems();
    }else return renderDirectToMenu();
  }
  return (
    <div>
      {renderPage()}
    </div>
  );
}