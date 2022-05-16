import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 3px 12px #1E36482E',
  height: '171px',
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '355px',
  zIndex: 33,
};

const proceedButton = {
  backgroundColor: 'primary.light', 
  borderRadius: '8px', 
  color: '#fff', 
  fontSize: '18px', 
  px: 3,
  '&:hover': {backgroundColor: 'primary.main'}
}

  const closeButton = {
    background: '#f0f8ff', 
    borderRadius: '8px', 
    color: 'warning.dark', 
    fontSize: '18px', 
    mr: 1,
    px: 3 
  }

export default function BuyModal({isModal, setIsModal, email, setEmail, password, setPassword, proceedAction}) {
  
  const handleClose = () => setIsModal(false);
  function handleProceedAction(){
    proceedAction(true)
    handleClose();
  }
  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModal}
        onClose={handleClose}
        closeAfterTransition
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style:{opacity: 0.7, backgroundColor: '#4B9CE2'}
        }}
      >
        <Fade in={isModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" sx={{fontWeight: '700', fontSize: '25px', mt: 2.5}}>
              Login
            </Typography>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=> setEmail(e.target.value)}
            value={email}/> 
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e)=> setPassword(e.target.value)}
            value={password}/> 
            <Button sx={closeButton} onClick={handleClose}>Cancel</Button>
            <Button onClick={handleProceedAction} sx={proceedButton}>Proceed</Button>
          </Box> 
        </Fade>
      </Modal>
    </Box>
  );
}