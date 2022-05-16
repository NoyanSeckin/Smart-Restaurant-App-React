import {AppBar, Box, Button, Container, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { connect } from "react-redux";

import { getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

import BasketDialog from './BasketDialog'
import * as React from 'react';
import {useState} from 'react'
import Login from './Login'
// Redux
import {setTableItems} from '../actions'

  const navLinkStyle = {
    fontSize: {xs: '0.9rem', sm: '1.1rem', md: '1.25rem'},
    color: '#F2F2F2'
  }
 function Navbar({tableItems, currentTable}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModal, setIsLoginModal] = useState(false)

  const auth = getAuth()

  const db = getFirestore();
  const callsRef = doc(db, 'WaiterCalls', 'tables')

  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      console.log(cred.user)
    }).catch(err => console.log(err))
  }

  async function signOutUser(){
    signOut(auth).then(()=> console.log('working'))
  }

  async function callWaiter(){
    updateDoc(callsRef, {
      calls: arrayUnion(currentTable)
    })
  }


 
  const [open, setOpen] = useState(false)
  
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

  function renderNavLink(direction, label){
    return(
      <NavLink to={direction}>
      <Typography variant="h6" sx={navLinkStyle}>
        {label}
      </Typography>
     </NavLink>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'warning.dark' }}>
      <Container maxWidth='xl'>
      <AppBar elevation={0} position="static" sx={{backgroundColor: 'warning.dark'}}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{
            display: 'flex', 
            gap: {xs: 1, md: 5}, 
            alignItems: 'center',
            }}>
            {renderNavLink('/', 'Home')}
            {renderNavLink('/admin', 'Admin')}
            {renderNavLink('/tables', 'Tables')}
            {renderNavLink(`/menu/${currentTable}`, 'Menu')}
          </Box>
            <Box sx={{display: 'flex'}}>
              <Box sx={{alignSelf: 'center' ,position: 'relative', '&:hover': {cursor: 'pointer'}}}>
               
                <Typography sx={{position: 'absolute', right: '20px', top: '-5px', color: '#F2F2F2'}} variant="caption">
                    {calculateTotalItems(tableItems)}
                 </Typography>
                 <Button 
                 onClick={handleDialogOpen} 
                 sx={{color: '#F2F2F2', mr: 3}}
                 endIcon={ <TableRestaurantIcon  sx={{alignSelf: 'center', color: '#F2F2F2'}}/>}>
                    Go to table
                 </Button>
              </Box>
              <Button variant='outlined'
              sx={{color: '#F2F2F2'}}
              onClick={callWaiter}
              endIcon={<RoomServiceIcon 
              sx={{color: '#F2F2F2'}}/>}>
                Call waiter
              </Button>
              <Button onClick={()=> setIsLoginModal(true)}
              sx={{color: '#F2F2F2', ml: 2}}>
                Sign in
              </Button>
            </Box>
        </Toolbar>
      </AppBar>
      </Container>
      <BasketDialog open={open} setOpen={setOpen} handleDialogOpen={handleDialogOpen} handleDialogClose={handleDialogClose}></BasketDialog>
      <Login proceedAction={signInUser} isModal={isLoginModal} setIsModal={setIsLoginModal}/>
     
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


