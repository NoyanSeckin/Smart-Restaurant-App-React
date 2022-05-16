import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import { NavLink } from "react-router-dom";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { connect } from "react-redux";

import { getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

import React, {useState} from 'react'
import SignIn from './SignIn'
import {setTableItems, setAuthentication} from '../actions'

  const navLinkStyle = {
    fontSize: {xs: '0.9rem', sm: '1.1rem', md: '1.25rem'},
    color: '#F2F2F2'
  }

 function Navbar({tableItems, currentTable, authentication, setAuthentication}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModal, setIsLoginModal] = useState(false)

  const auth = getAuth()

  const db = getFirestore();
  const callsRef = doc(db, 'WaiterCalls', 'tables')
  
  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      setAuthentication(cred.user.email)
    }).catch(err => console.log(err))
  }

  async function signOutUser(){
    signOut(auth).then(()=> setAuthentication(''))
  }

  async function callWaiter(){
    updateDoc(callsRef, {
      calls: arrayUnion(currentTable)
    })
  }

  function renderAuthButtons(){
    if(authentication){
      return(
        <Button onClick={signOutUser} sx={{color: '#F2F2F2', ml: 2}}>
        Sign out
      </Button>
      )
    }else return(
      <Button onClick={()=> setIsLoginModal(true)}
      sx={{color: '#F2F2F2', ml: 2}}>
        Sign in
      </Button>
    ) 
  }
 
  function calculateTotalItems(arr){
   return arr.map(item => item.count).reduce((prev, curr) => prev + curr, 0);
  }

  function renderNavLink(direction, label){
    return(
      <NavLink to={direction}>
      <Typography variant="h6" sx={navLinkStyle}>
        {label}
      </Typography>
     </NavLink>
    )
  }

  function renderGoToTable(){
    return(
      <Box sx={{alignSelf: 'center' ,position: 'relative', '&:hover': {cursor: 'pointer'}}}>
      <Typography sx={{position: 'absolute', right: '20px', top: '-5px', color: '#F2F2F2'}} variant="caption">
          {calculateTotalItems(tableItems)}
        </Typography>
        <NavLink to='/usertable'>
        <Button 
        sx={{color: '#F2F2F2', mr: 3}}
        endIcon={ <TableRestaurantIcon  sx={{alignSelf: 'center', color: '#F2F2F2'}}/>}>
          Go to table
        </Button>
        </NavLink>
    </Box>
    )
  }

  function renderCallWaiter(){
    return(
      <Button variant='outlined'
      sx={{color: '#F2F2F2'}}
      onClick={callWaiter}
      endIcon={<RoomServiceIcon 
      sx={{color: '#F2F2F2'}}/>}>
        Call waiter
      </Button>
    )
  }

  function renderSignInModal(){
    return <SignIn proceedAction={signInUser} isModal={isLoginModal} setIsModal={setIsLoginModal} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
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
            {authentication && renderNavLink('/admin', 'Admin')}
            {renderNavLink('/tables', 'Tables')}
            {renderNavLink(`/menu/${currentTable}`, 'Menu')}
          </Box>
          <Box sx={{display: 'flex'}}>
            {renderGoToTable()}
            {renderCallWaiter()}
            {/* small screens means customers who wont authenticate */}
            <Box sx={{display: {xs: 'none',  md: 'block'}}}>
              {renderAuthButtons()}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      </Container>
      {renderSignInModal()}
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
    currentTable: state.currentTable,
    authentication: state.authentication,
  };
};
export default connect(mapStateToProps, {
  setTableItems, setAuthentication
})(Navbar);


