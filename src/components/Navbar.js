import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';

import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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

  const navLinkStyle = {
    color: '#F2F2F2',
    fontSize: {xs: '0.9rem', sm: '1.1rem', md: '1.25rem'},
    pb: 1.2,
  }

  function hideFromUsers(label){
    return {display: {xs: label === ('Admin') && 'none', lg: 'block' }}
     
  }

 function Navbar({tableItems, currentTable, authentication, setAuthentication}) {

  const location = useLocation();

  const [activeNav, setActiveNav] = useState(location.pathname)
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


  // handle active nav changes
  useEffect(()=> {
    if(location.pathname === '/usertable'){
      setActiveNav('')
    }else setActiveNav(location.pathname)
  }, [location])

 
  
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
     <Box sx={hideFromUsers(label)}>
      <NavLink to={direction}>
      <Typography
      className={direction === activeNav && 'navbarActive'} variant="h6" sx={navLinkStyle}>
        {label}
      </Typography>
     </NavLink>
     </Box>
    )
  }

  function renderGoToTable(){
    return(
      <Box sx={tableContainerStyle}>
      <Typography sx={tableCounterStyle} variant="caption">
          {calculateTotalItems(tableItems)}
        </Typography>
        <NavLink to='/usertable'  >
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
      <Box sx={{mt: {xs: 1, md: 0}}}>
      <Box sx={{display: {xs: 'flex', lg: 'none'}}}>
        {renderCallWaiter()}
        {renderGoToTable()}
      </Box>
      {/*on small screens means customers who wont authenticate */}
      <Box sx={{display: {xs: 'none',  lg: 'block'}}}>
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


