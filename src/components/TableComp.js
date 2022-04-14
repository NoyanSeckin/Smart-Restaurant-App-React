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
export default function BasicTable({tableItems}) {
  return (
   <Box sx={{width: '100%'}}>
      <TableContainer sx={{width: '100%',  mt: 8, mx: 'auto', maxWidth: '1000px'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Meal/Beverage</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0, width: '40%' } }}
            >
              <TableCell size={'small'} align='left' sx={{display: 'flex', gap: 5}} component="th" scope="row">
                 <img style={{width: '100px'}} src={row.image} alt="" /> 
                 <Typography sx={{alignSelf: 'center', justifySelf: 'center'}}>
                   {row.name}
                 </Typography>
              </TableCell>
              <TableCell align="center"> {row.count} </TableCell>
              <TableCell align="center">{row.price}$</TableCell>
              <TableCell align="center">{row.price * row.count}$</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Box>
  );
}