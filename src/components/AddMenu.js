import firebaseApp from "../firebase/init"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {Box, Button, Typography, Grid} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { Formik} from 'formik';
import * as Yup from 'yup';

import React, {useState} from 'react'
import Dropzone from './DropzoneComp'
import SelectComponent from './SelectComponent'

export default function AddProduct() {

  const storage = getStorage(firebaseApp)

  const requiredText = 'This field is required.'

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileError, setSelectedFileError] = useState('');
  const [imageURL, setImageURL] = useState('');
  console.log(selectedFile?.name)

  async function uploadImage(){
      const imageRef = ref(storage, `images/${selectedFile.name + uuidv4()}`)
      uploadBytes(imageRef, selectedFile).then((response)=>{
        getDownloadURL(imageRef).then(url => setImageURL(url))
      }).catch(err => console.log(err))
  }

  // async fu

  const inputInfos = {
    name: {label: 'Product Name', placeholder: 'Enter a name'},
    description: {label: 'Description', placeholder: 'Enter a description'},
    category: {label: 'Category', placeholder: 'Choose a category'},
    price: {label: 'Price', placeholder: 'Enter a price'}
  }

  function renderInput(value, error, handleChange, valueName){
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

  return (
    <Grid container sx={{height: '70vh', position: 'relative'}}>
      <Grid item xs={12} lg={6} >
      <Formik 
          initialValues={{
            name: '',
            description: '',
            price: '',
          }}
          validationSchema={
            Yup.object({
              name: Yup.string().max(100, 'Max 50 characters.').required(requiredText),
              description: Yup.string().max(500, 'Max 100 characters').required(requiredText),
              category: Yup.string(),
              price: Yup.number('Please enter a number').required(),
            })
          }
          onSubmit={(values, {resetForm}) => {
            // check if user selected image
            console.log(values.category);
            if(!values.category){
              values.category = 'mainDishes'
            }
            console.log(values)
            // if(selectedFile.path){
              
            // }
          }}
          >
            {({values, errors, handleSubmit, dirty, handleChange}) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                  
                  {renderInput(values.name, errors.name, handleChange, 'name')}
                  {renderInput(values.description, errors.description, handleChange, 'description')}
                  <SelectComponent value={values.category} id='category' handleAddMenuChange={handleChange}/>
                  <Box sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: {sm: '100%', md: '30%'},
                    gap: 2.7,
                    mt: 3
                    }}>
                    
                    <div className='price-wrapper'>
                      <label htmlFor="price" style={{marginBottom: '10px'}}>{inputInfos.price.label}</label>
                     
                      <input className={'price-input'} type="text" value={values.price} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}
                      style={{marginBottom: 0}}/>
                      {errors.price && 
                      
                      <Typography sx={{
                        fontSize: '15px', 
                        color: '#f77474', 
                        mb: 2}}>
                          {errors.price}
                      </Typography>}
                    </div>
                  </Box>
                  
                  <Button type='submit' variant='contained' 
                      sx={{
                        color: '#fff',
                        fontSize: '18px',
                        borderRadius: '8px',
                        position: 'absolute', 
                        px: {xs: 0, lg:16},
                        left: {xs: 0, lg: 'auto'},
                        mx: {xs: 3.5, lg: 0},
                        right: {xs: '0', lg: '0'},
                        bottom: {xs: 0, lg: '0'},  
                        mb: {xs: 1, lg: 0},
                        '&:hover': {
                          cursor: 'pointer'
                        }
                        }}>Add Product</Button>
                </Box>
              </form>
            )}
          </Formik>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Dropzone setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError}/>
        <Button onClick={uploadImage}>Upload file</Button>
      </Grid>
     
    </Grid>
  )
}
