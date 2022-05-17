import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import { NavLink } from "react-router-dom";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { connect } from "react-redux";

import { getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

import React, {useState, useEffect} from 'react'
import SignIn from './SignIn'
import {setTableItems, setAuthentication} from '../actions'

  const containerStyle = { 
    flexGrow: 1, 
    backgroundColor: 'warning.dark' 
  }

  const navLinkStyle = {
    color: '#F2F2F2',
    fontSize: {xs: '0.9rem', sm: '1.1rem', md: '1.25rem'},
    pb: 1.2
  }

  const tableCounterStyle = {
    color: '#F2F2F2',
    position: 'absolute', 
    right: {xs: '0', lg:'20px'},
    top: '-5px', 
    }

  const tableContainerStyle = {
    alignSelf: 'center' ,
    position: 'relative', 
    '&:hover': {cursor: 'pointer'}
  }

  const tableBtnStyle = {
    color: '#F2F2F2', 
    mr: {sx: 0, lg: 3},
    fontSize: {xs: '0.7rem', sm: '0.95rem'}
  }

  const callWaiterBtnStyle = {
    color: '#F2F2F2', 
    fontSize: {xs: '0.7rem', sm: '0.95rem'}
  
  }
 function Navbar({tableItems, currentTable, authentication, setAuthentication}) {

  const [activeNav, setActiveNav] = useState('Home')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginModal, setIsLoginModal] = useState(false)

  const auth = getAuth()

  const db = getFirestore();
  const callsRef = doc(db, 'WaiterCalls', 'tables')

  useEffect(()=> {
    // detect page refresh and keep admin logged in
    if(performance.getEntriesByType("navigation")[0].type){
      let auth = sessionStorage.getItem('auth');
      if(auth){
        setAuthentication(auth)
      }
    }
  }, [])
  
  async function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password).then(cred => {
      setAuthentication(cred.user.email)
      sessionStorage.setItem('auth', cred.user.email)
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
      <Typography  onClick={()=> setActiveNav(label)}
      className={label === activeNav && 'navbarActive'} variant="h6" sx={navLinkStyle}>
        {label}
      </Typography>
     </NavLink>
    )
  }

  function renderGoToTable(){
    return(
      <Box sx={tableContainerStyle}>
      <Typography sx={tableCounterStyle} variant="caption">
          {calculateTotalItems(tableItems)}
        </Typography>
        <NavLink to='/usertable'>
        <Button 
        sx={tableBtnStyle}
        endIcon={ 
        <TableRestaurantIcon  
        sx={{
          alignSelf: 'center', 
          color: '#F2F2F2',
        }}/>
        }>
         Table
        </Button>
        </NavLink>
    </Box>
    )
  }

  function renderCallWaiter(){
    return(
      <Button
      sx={callWaiterBtnStyle}
      onClick={callWaiter}
      endIcon={<RoomServiceIcon 
      sx={{color: '#F2F2F2'}}/>}>
        Waiter
      </Button>
    )
  }

  function renderSignInModal(){
    return <SignIn proceedAction={signInUser} isModal={isLoginModal} setIsModal={setIsLoginModal} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
  }

  function renderLeftNavs(){
    return(
      <Box sx={{
        display: 'flex', 
        gap: {xs: 1, md: 5}, 
        alignItems: 'end',
        }}>
        <img width='50px' src={require('../images/logo.png')} alt="" />
        {renderNavLink('/', 'Home')}
        {authentication && renderNavLink('/admin', 'Admin')}
        {renderNavLink('/tables', 'Tables')}
        {renderNavLink(`/menu/${currentTable}`, 'Menu')}
      </Box>
    )
  }

  function renderRightNavs(){
    return(
      <Box sx={{display: 'flex', mt: {xs: 1, md: 0}}}>
      {renderCallWaiter()}
      {renderGoToTable()}
      {/*on small screens means customers who wont authenticate */}
      <Box sx={{display: {xs: 'none',  md: 'block'}}}>
        {renderAuthButtons()}
      </Box>
    </Box>
    )
  }

  function renderAppBar(){
    return(
      <AppBar elevation={0} position="static" sx={{backgroundColor: 'warning.dark'}}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between'}}>
          {renderLeftNavs()}
          {renderRightNavs()}
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <Box sx={containerStyle}>
      <Container maxWidth='xl'>
        {renderAppBar()}
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


