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
// redux

import {setTableItems} from '../actions'
import { connect } from 'react-redux';

function MenuDialog(props) {
  const {open, handleDialogClose} = props;
  return (
    <Dialog sx={{width: '700px', position: 'absolute', bottom: {lg: '570px', md: '620px', xs: '570px'}, left: {md: '400px', lg: '66%', xs: '70px', sm: '360px'  }}} onClose={handleDialogClose} open={open}>
      <DialogTitle>Your Table</DialogTitle>
      <List sx={{ pt: 0 }}>
         {props.tableItems.map(tableItem => {
           return(
            <ListItem>
            <ListItemAvatar>
              {/* {tableItem.image} */}
              <img style={{width:'70px'}} src={tableItem.image} alt="" />
            </ListItemAvatar>
            <ListItemText sx={{ml: 3}} primary={tableItem.name} />
            <ListItemText sx={{ml: 3}} primary={tableItem.count} />
          </ListItem>
         )})}
            
        <Box sx={{display: 'flex' ,justifyContent: 'space-around', mt: 1}}>
          <NavLink to='/usertable'>
            <Button variant={'outlined'}>
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

MenuDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(MenuDialog);

