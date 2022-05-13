import {AppBar, Box, Container, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { connect } from "react-redux";

import BasketDialog from './BasketDialog'
import * as React from 'react';
import {useState} from 'react'
// Redux
import {setTableItems} from '../actions'

  const navLinkStyle = {
    fontSize: {xs: '0.9rem', md: '1.25rem'}
  }
 function Navbar({tableItems, currentTable}) {
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
    <Box sx={{ flexGrow: 1, position: 'relative', background: 'orange' }}>
      <Container maxWidth='xl'>
      <AppBar elevation={0} position="static" sx={{background: 'orange'}}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{
            display: 'flex', 
            gap: {xs: 1, md: 5}, 
            alignItems: 'center',
            }}>
          <Typography variant="h6" sx={navLinkStyle}>
            <NavLink to='/'>
              Home
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={navLinkStyle}>
            <NavLink to={`/menu/${currentTable}`}>
              Menu
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={navLinkStyle}>
            <NavLink to='/admin'>
              Admin
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={navLinkStyle}>
            <NavLink to='/tables'>
              Tables
            </NavLink>
          </Typography>
          </Box>
          {auth && (
            <Box sx={{display: 'flex'}}>
              <Box sx={{alignSelf: 'center' ,position: 'relative', '&:hover': {cursor: 'pointer'}}}>
                <TableRestaurantIcon onClick={handleDialogOpen}  sx={{alignSelf: 'center', mr: 3}}/>
                <Typography sx={{position: 'absolute', right: '14px', top: '-10px'}} variant="caption">
                    {calculateTotalItems(tableItems)}
                 </Typography>
              </Box>
              <RoomServiceIcon sx={{'&:hover': {cursor: 'pointer'}}}/>
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


