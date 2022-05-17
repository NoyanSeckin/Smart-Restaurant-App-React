import Alert from '@mui/material/Alert';

import React,{useEffect} from 'react';
import SuccesIcon from '../icons/SuccessIcon';

export default function SuccessAlert({isAlert, setIsAlert, content}) {

  const style = {
    background: '#F1FFF0',
    borderRadius:' 8px',
    boxShadow:' 0px 3px 12px #1E36482E',
    color: '#000',
    fontSize: '16px',
    position: 'absolute',
    zIndex: 3,
  }

  const desktopStyle = {
    ...style, 
    mr: 3,
    py: 1.3,
    right: '-25px',
    top: '-65px',
    width: '321px',
  }

  function handleClose(){
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  useEffect(()=> {
    if(isAlert){
      handleClose()
    }
  }, [isAlert])

  function renderAlert() {
    return(isAlert &&
    <Alert icon={<SuccesIcon/>} variant="filled" 
    sx={desktopStyle} >
    {content}
    </Alert>)
  }
  return (
    <>
     {renderAlert()}
    </>
  );
}
