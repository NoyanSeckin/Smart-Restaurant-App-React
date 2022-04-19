import * as React from 'react';
import {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { NavLink } from "react-router-dom";
import MenuDialog from './MenuDialog'
// Redux
import { connect } from "react-redux";
import {setTableItems} from '../actions'
 function Navbar(props) {
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
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
         
          <Box sx={{display: 'flex', gap: 5, alignItems: 'center'}} className='nav-links'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to='/'>
              Home
            </NavLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to='/menu/1'>
              Menu
            </NavLink>
          </Typography>
          <Typography variant="h6" component="div" >
            <NavLink to='/admin'>
              Admin
            </NavLink>
          </Typography>
          </Box>
          {auth && (
            <Box sx={{display: 'flex'}}>
              <Box sx={{alignSelf: 'center' ,position: 'relative'}}>
                <TableRestaurantIcon onClick={handleDialogOpen}  sx={{alignSelf: 'center', mr: 3}}>
                </TableRestaurantIcon>
                <Typography sx={{position: 'absolute', right: '14px', top: '-10px'}} variant="caption">
                    {calculateTotalItems(props.tableItems)}
                 </Typography>
              </Box>
             
              <IconButton
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <MenuDialog open={open} setOpen={setOpen} handleDialogOpen={handleDialogOpen}handleDialogClose={handleDialogClose}></MenuDialog>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(Navbar);


