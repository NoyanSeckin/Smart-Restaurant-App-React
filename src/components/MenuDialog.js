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



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog sx={{position: 'absolute', bottom: {lg: '570px', md: '550px', xs: '570px'}, left: {md: '600px', lg: '66%', xs: '70px', sm: '360px'  }}} onClose={handleClose} open={open}>
      <DialogTitle>Your Table</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({open, handleDialogClose, handleDialogOpen}) {
  return (
    <div>
      <Typography variant="subtitle1" component="div">
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleDialogOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleDialogClose}
      />
    </div>
  );
}