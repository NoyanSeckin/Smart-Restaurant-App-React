import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
export default function BasicTable({tableItems, orderedItems, sendOrdersToDb, directToMenu}) {
  function renderTable(items){
    return(
      <Box sx={{width: '100%'}}>
      <TableContainer sx={{width: '100%', mb: 6, mx: 'auto', maxWidth: '1000px'}} component={Paper} elevation={4}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Meal/Beverage</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Subtotal</TableCell>
            <TableCell align="center">Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0, width: '60%' } }}
            >
              <TableCell size={'small'} align='left' sx={{display: 'flex', gap: 5}} component="th" scope="row">
                 <img style={{width: '100px'}} src={row.image} alt="" /> 
                 <Typography sx={{alignSelf: 'center', justifySelf: 'center'}}>
                   {row.name}
                 </Typography>
              </TableCell>
              <TableCell  padding='none' size={'small'} align="center"> {row.count} </TableCell>
              <TableCell align="center">{row.price}$</TableCell>
              <TableCell align="center">{row.price * row.count}$</TableCell>
              <TableCell align="center">{row.status || 'Not Ordered'}</TableCell>
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
      tableItems.length > 0 && renderTable(tableItems)
    )
  }
  function renderOrderedItems(){
    if(orderedItems){
      return(
        Object.values(orderedItems).map((orderedItem, index) => {
          return (
            <Box>
              <Typography variant='h6'>
                ORDER {index + 1}
              </Typography>
              {renderTable(orderedItem)}
            </Box>
          )
      })
      )
    }
  }
  function renderButtonAction(){
    if(tableItems.length > 0){
      return <Button onClick={()=> sendOrdersToDb()} variant='contained' color='success' sx={{mt: 5}}>Order Now</Button>
    }else{
      return(
        <Paper elevation={4} sx={{px: 3, py: 3, }}>
          <Typography variant='h5'>Nothing to order!</Typography> 
          {directToMenu()}
        </Paper>
        ) 
    }
  }
  return (
    <div>
      <Typography variant='h2' sx={{my:5, fontWeight: 'bold'}}>
        Your Basket
      </Typography>
      {renderTableItems()}
      {renderButtonAction()}
      <Typography variant='h2' sx={{mt: 12, mb:5, fontWeight: 'bold'}}>
        Ordered Items
      </Typography>
      {renderOrderedItems()}
    </div>
  );
}