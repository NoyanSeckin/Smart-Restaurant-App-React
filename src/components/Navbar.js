import {AppBar, Box, Container, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { connect } from "react-redux";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";

import BasketDialog from './BasketDialog'
import * as React from 'react';
import {useState} from 'react'
// Redux
import {setTableItems} from '../actions'

  const navLinkStyle = {
    fontSize: {xs: '0.9rem', sm: '1.1rem', md: '1.25rem'},
    color: '#F2F2F2'
  }
 function Navbar({tableItems, currentTable}) {

  const db = getFirestore();
  const callsRef = doc(db, 'WaiterCalls', 'tables')

  async function callWaiter(){
    updateDoc(callsRef, {
      calls: arrayUnion(currentTable)
    })
  }


 
  const [open, setOpen] = useState(false)
  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const calculateTotalItems = (arr) =>{
   return arr.map(item => item.count).reduce((prev, curr) => prev + curr, 0);
  }
  
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };
  return (
    <Box sx={{ flexGrow: 1, position: 'relative', background: '#46244C' }}>
      <Container maxWidth='xl'>
      <AppBar elevation={0} position="static" sx={{background: '#46244C'}}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{
            display: 'flex', 
            gap: {xs: 1, md: 5}, 
            alignItems: 'center',
            }}>
          <NavLink to='/'>
            <Typography variant="h6" sx={navLinkStyle}>
              Home
            </Typography>
          </NavLink>
          <NavLink to={`/menu/${currentTable}`}>
            <Typography variant="h6" sx={navLinkStyle}>
              Menu
            </Typography>
          </NavLink>
          <NavLink to='/admin'>
            <Typography variant="h6" sx={navLinkStyle}>
              Admin
            </Typography>
          </NavLink>
          <NavLink to='/tables'>
            <Typography variant="h6" sx={navLinkStyle}>
              Tables
            </Typography>
          </NavLink>
          </Box>
          {auth && (
            <Box sx={{display: 'flex'}}>
              <Box sx={{alignSelf: 'center' ,position: 'relative', '&:hover': {cursor: 'pointer'}}}>
                <TableRestaurantIcon onClick={handleDialogOpen}  sx={{alignSelf: 'center', color: '#F2F2F2', mr: 3}}/>
                <Typography sx={{position: 'absolute', right: '14px', top: '-10px', color: '#F2F2F2'}} variant="caption">
                    {calculateTotalItems(tableItems)}
                 </Typography>
              </Box>
              <RoomServiceIcon onClick={callWaiter}
              sx={{color: '#F2F2F2', '&:hover': {cursor: 'pointer'}}}/>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem sx={{size: 'large'}} onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <BasketDialog open={open} setOpen={setOpen} handleDialogOpen={handleDialogOpen}handleDialogClose={handleDialogClose}></BasketDialog>
      </Container>
     
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
    currentTable: state.currentTable
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(Navbar);


