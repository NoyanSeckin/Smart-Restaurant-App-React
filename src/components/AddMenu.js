import firebaseApp from "../firebase/init"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {arrayUnion, doc, getFirestore, updateDoc} from 'firebase/firestore'
import {Box, Button, Typography, Grid} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { Formik} from 'formik';
import * as Yup from 'yup';

import React, {useState} from 'react'
import Dropzone from './DropzoneComp'
import SelectComponent from './SelectComponent'
import PreperationSelect from './PreperationSelect'
import SuccessAlert from './SuccessAlert'

const submitBtnStyle = {
  color: '#fff',
  backgroundColor: 'warning.main',
  fontSize: '18px',
  borderRadius: '8px',
  position: 'absolute', 
  px: {xs: 0, lg:16},
  left: {xs: 0, lg: 'auto'},
  mx: {xs: 3.5, lg: 0},
  right: {xs: '0', lg: '0'},
  bottom: {xs: '-35px', lg: '0'},  
  mb: {xs: 1, lg: 0},
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'warning.dark'
  }
  }

const priceContainerStyle = {
  display: 'flex', 
  flexDirection: 'column', 
  width: {sm: '100%', md: '30%'},
  gap: 2.7,
  mt: 2
  }

const gridContainerStyle = {
  height: {xs: '80vh', lg: '70vh'}, 
  position: 'relative'
}

export default function AddProduct() {
  const db = getFirestore()
  const storage = getStorage(firebaseApp)
  // user's selected image
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileError, setSelectedFileError] = useState('');
  // state of dropzone for displaying uploaded file
  const [files, setFiles] = useState([]);
  const [isAlert, setIsAlert] = useState(false)

  async function handleUploadProduct(name, description, preperationTime, price, category, resetForm){
    const id = uuidv4();
    const imageRef = ref(storage, `images/${id}`)
    const menuRef = doc(db, 'Menu', category);

      uploadBytes(imageRef, selectedFile).then(()=>{
        getDownloadURL(imageRef).then(url => {
          updateDoc(menuRef, {
            [category]: arrayUnion({
              id,
              name,
              description,
              preperationTime,
              price,
              image: url
            })
          })
        })
      }).catch(err => console.log(err))

      resetForm()
      setSelectedFile('')
      setFiles([]);
      setIsAlert(true)
   
  }

  function renderTextarea(value, error, handleChange, valueName){
    return(
      <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
        <label htmlFor={valueName}> 
          {inputInfos[valueName].label}
        </label>
        <textarea className={error && 'form-error'} id={valueName} type='text' value={value} onChange={handleChange} rows={`${valueName === 'description' ? '3' : '1'}`}
        />
        <Typography sx={{position: 'absolute', bottom: '-5px', color: '#F77474'}}>{error}</Typography>
      </Box>
    )
  }

  function renderSelectedFileError(){
    if(selectedFileError){
      return <Typography sx={{color: '#F77474', mt: 1, textAlign: 'center'}}>{selectedFileError}</Typography>
    }
  }

  function renderSelectInputs(categoryValue, preperationValue, handleChange){
    return(
      <Box sx={{display: 'flex', fleWrap: 'wrap', gap: 2}}>
        <Box sx={{ flexGrow: 1}}>
          <label htmlFor="category" style={{marginBottom: '1rem', display: 'inline-block'}}>Category</label>
          <SelectComponent value={categoryValue} id='category' handleAddMenuChange={handleChange}/>
        </Box>

       <Box sx={{ flexGrow: 1}}>
         <label htmlFor="preperationTime" style={{marginBottom: '1rem', display: 'inline-block'}}>Preperation Time</label>
         <PreperationSelect id='preperationTime' value={preperationValue} handlePreperationChange={handleChange}/>
       </Box>
    </Box>
    )
  }

  function renderPriceInput(priceValue, priceError, handleChange){
   return(
    <Box sx={priceContainerStyle}>
    <div className='price-wrapper'>
      <label htmlFor="price" style={{marginBottom: '10px'}}>{inputInfos.price.label}</label>
      <input className={'price-input'} type="text" value={priceValue} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}
      style={{marginBottom: 0}}/>
      {priceError && 
      <Typography sx={{
        fontSize: '15px', 
        color: '#f77474', 
        mb: 2}}>
          Please enter a number
      </Typography>}
    </div>
  </Box>
   )
  }

  function renderSubmitBtn(){
    return(
      <Button type='submit' variant='contained' 
      sx={submitBtnStyle}>
        Add Product
     </Button>
    )
  }

  // Formik and yup values
  const inputInfos = {
    name: {label: 'Product Name', placeholder: 'Enter a name'},
    description: {label: 'Description', placeholder: 'Enter a description'},
    category: {label: 'Category', placeholder: 'Choose a category'},
    price: {label: 'Price', placeholder: 'Enter a price'}
  }

  const initialValues = {
    name: '',
    description: '',
    price: '',
    category: 'mainDishes',
    preperationTime: 'Right Away'
  }

  const yupObject = {
    name: Yup.string().max(20, 'Max 20 characters.').required(),
    description: Yup.string().max(40, 'Max 40 characters').required(),
    category: Yup.string(),
    preperationTime: Yup.string(),
    price: Yup.number().required(),
  }

  function renderFormikGridItem(){
    return(
      <Grid item xs={12} lg={6} >
      <Typography variant='h5'>Details</Typography>
      <Formik 
          initialValues={initialValues}
          validationSchema={
            Yup.object(yupObject)
          }
          onSubmit={(values, {resetForm}) => {
            // check if user selected image, if so submit
            if(selectedFile?.name){
              handleUploadProduct(values.name, values.description, values.preperationTime, values.price, values.category, resetForm);
            }else setSelectedFileError('Choose a file')
          }}
          >
            {({values, errors, handleSubmit, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, width: '80%', mt: 1}}>
                  {renderTextarea(values.name, errors.name, handleChange, 'name')}
                  {renderTextarea(values.description, errors.description, handleChange, 'description')}
                  {renderSelectInputs(values.category, values.preperationTime, handleChange)}
                  {renderPriceInput(values.price, errors.price, handleChange)}
                  {renderSubmitBtn()}
                </Box>
              </form>
            )}
          </Formik>
      </Grid>
    )
  }

  function renderUploadGridItem(){
    return(
      <Grid item xs={12} lg={6}>
        <Typography variant='h5' 
        sx={{mb: {xs: 0, lg: 2}}}>Upload Image</Typography>
        <Dropzone setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError} selectedFile={renderSelectedFileError}
        files={files} setFiles={setFiles}/>
        {renderSelectedFileError()}
      </Grid>
    )
  }

  return (
    <Grid container sx={gridContainerStyle}>
      {renderFormikGridItem()}
      {renderUploadGridItem()}
      <SuccessAlert isAlert={isAlert} setIsAlert={setIsAlert} content='Item added to the menu!'/>
    </Grid>
  )
}
