import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebaseApp from "../firebase/init"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

import PreperationSelect from './PreperationSelect'
import DropzoneComp from './DropzoneComp';
const style = {
  bgcolor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 3px 12px #1E36482E',
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '355px',
  zIndex: 33,
  px: 2,
  py: 2,
};

const checkoutButton = {
  backgroundColor: 'primary.light', 
  borderRadius: '8px', 
  color: '#fff', 
  fontSize: '18px', 
  px: 5,
  width: '100%',
  '&:hover': {backgroundColor: 'primary.main'}
}

  const closeButton = {
    background: '#f0f8ff', 
    borderRadius: '8px', 
    color: 'warning.dark', 
    fontSize: '18px', 
    mt: 1,
    px: 5 ,
    width: '100%'
  }

  const iconStyle = {
    position: 'absolute',
    top: '50px',
    '&:hover': {cursor: 'pointer'}
  }

export default function EditModal({isModal, setIsModal, item, setItem,  setIsEditItem, setIsSpinner}) {

  const [isItemImageStay, setIsItemImageStay] = useState(true);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileError, setSelectedFileError] = useState();
  const handleClose = () => {setIsModal(false); setIsSpinner(false)};

  async function uploadImage(id, object, setObject, setIsItem){
    const storage = getStorage(firebaseApp)
    const imageRef = ref(storage, `images/${id}`)
    await uploadBytes(imageRef, selectedFile).then((response)=>{
      getDownloadURL(imageRef).then(url => {
        setObject({...object, changedId: id, image: url})
        setIsItem(true)
      });
    }).catch(err => console.log(err))

  }

  // prevent broken image display
  useEffect(()=> {
    if(isItemImageStay){
      setFiles([]);
      setSelectedFile({});
    }
  },[isItemImageStay])

  function renderImageOrDropzone(){
    if(isItemImageStay){
      return  <img src={item?.image} alt="" style={{width: '60%'}} />    
    }else return <DropzoneComp files={files} setFiles={setFiles} setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError} selectedFile={selectedFile}/>
  }

  function renderActionIcon(){
    if(isItemImageStay){
      return <CloseIcon className='delete-icon' sx={iconStyle} onClick={()=> setIsItemImageStay(false)}/>
    } else return <SettingsBackupRestoreIcon sx={iconStyle} onClick={()=> setIsItemImageStay(true)}/>
  }

  // formik

  const inputInfos = {
    name: {label: 'Product Name', placeholder: 'Enter a name'},
    description: {label: 'Description', placeholder: 'Enter a description'},
    category: {label: 'Category', placeholder: 'Choose a category'},
    price: {label: 'Price', placeholder: 'Enter a price'}
  }

  function renderInput(value, error, handleChange, valueName){
    return(
      <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
        <textarea className={error && 'form-error'} id={valueName} type='text' value={value} onChange={handleChange} rows='1'
        />
        <Typography sx={{position: 'absolute', bottom: '-5px', color: '#F77474'}}>{error}</Typography>
      </Box>
    )
  }

  function renderButtonActions(){
    return(
      <Box>
          <Button type='submit' onClick={handleClose} sx={checkoutButton}>Proceed</Button>
         <Button sx={closeButton} onClick={handleClose}>Cancel</Button>
      </Box>
    )
  }

  return (
    <Box sx={{position: 'relative'}}>
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
            {renderActionIcon()}
            <Typography id="transition-modal-title" variant="h5" sx={{fontWeight: '700', mb: 2}}>
              Edit Item
            </Typography>
            <Box sx={{height: '160px', mt: 3}}>
              {renderImageOrDropzone()}
            </Box>
            <Formik 
          initialValues={{
            name: item.name,
            description: item.description,
            price: item.price,
            preperationTime: item.preperationTime
          }}
          validationSchema={
            Yup.object({
              name: Yup.string().max(100, 'Max 50 characters.').required('Name is required'),
              description: Yup.string().max(500, 'Max 100 characters').required('Description is required'),
              preperationTime: Yup.string(),
              price: Yup.number().required(),
            })
          }
          onSubmit={(values, {resetForm}) => {
            
            const editedItem = {
              id: item.id,
              name: values.name,
              description: values.description,
              preperationTime: values.preperationTime,
              price: values.price,
              image: item.image
            }
            // if user uploaded photo
            if(selectedFile && !isItemImageStay){
              setIsSpinner(true);
              const id = uuidv4();
              // uploadImage(id).then
              uploadImage(id, editedItem, setItem, setIsEditItem).then(()=> {setSelectedFile({}); setFiles([])})

            }else {
              setItem(editedItem)
              setIsEditItem(true)
            }
          }}
          >
            {({values, errors, handleSubmit, handleChange}) => (
              <form className='edit' onSubmit={handleSubmit}>
                
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mt: 1}}>
                  
                  {renderInput(values.name, errors.name, handleChange, 'name')}
                  {renderInput(values.description, errors.description, handleChange, 'description')}

                 <Box sx={{display: 'flex', fleWrap: 'wrap', gap: 2}}>
                    <Box sx={{ flexGrow: 1}}>
                      <PreperationSelect id='preperationTime' value={values.preperationTime} handlePreperationChange={handleChange} style={{p: 0}}/>
                    </Box>
                 </Box>

                  <div className='price-wrapper'>
                    <input className={` price-input ${errors.price && 'form-error'}`} type="text" value={values.price} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}
                    style={{marginBottom: 0}}/>
                  </div>
                  
                  {renderButtonActions()}
                  </Box>
              </form>
            )}
          </Formik>
          </Box> 
        </Fade>
      </Modal>
    </Box>
  );
}