import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box'

import { connect } from 'react-redux';

function BasketDialog(props) {
  const {open, handleDialogClose} = props;
  return (
    <Dialog sx={{ 
      top: 0,
      minHeight: 300,
      borderRadius: '8px'
      }} 
      onClose={handleDialogClose} 
      open={open}>
      <DialogTitle>Your Table</DialogTitle>
      <List sx={{ pt: 0, position: 'relative' }}>
         {props.tableItems.map(tableItem => {
           return(
            <ListItem key={tableItem.name}>
            <ListItemAvatar >
              <img style={{width:'70px'}} src={tableItem.image} alt="" />
            </ListItemAvatar>
            <ListItemText sx={{mx: 5}} primary={tableItem.name} />
            <ListItemText sx={{position: 'absolute', right: '15px'}} primary={tableItem.count} />
          </ListItem>
         )})}
            
        <Box sx={{display: 'flex' ,justifyContent: 'space-around', mt: 1}}>
          <NavLink to='/usertable'>
            <Button onClick={handleDialogClose} variant={'outlined'}>
                Go to table
            </Button>
          </NavLink>
          <Button variant={'outlined'}>
                Order 
          </Button>
        </Box>
      </List>
    </Dialog>
  );
}



const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
})(BasketDialog);

