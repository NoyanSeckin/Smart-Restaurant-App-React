import {Typography, Box} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {useDropzone} from 'react-dropzone';

import React, {useEffect, useState} from 'react';
import CloudIcon from '../icons/CloudIcon'
import ProgressBar from './ProgressBar'

const closeIconStyle = {
  background: '#3E3E3E', 
  borderRadius: '50%', 
  color: '#fff', 
  left: '105px', 
  fontSize: '12px', 
  position: 'absolute', 
  top: '17px', 
  zIndex: 3, 
  '&:hover': {cursor: 'pointer'}
}

export default function DropzoneComp({setSelectedFile, setSelectedFileError,  files, setFiles}) {
  const [loader, setLoader] = useState(false);
  const validImgTypes = ['image/png', 'image/jpg', 'image/jpeg']
  
  const {getRootProps, getInputProps, open} = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      // size check
      if(acceptedFiles[0].size > 400000){
        setSelectedFileError("Image is larger than 400kb")
      }else if(validImgTypes.includes(acceptedFiles[0].type)){
        // activate loader
        setLoader(true);
        // set image preview
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        // get the uploaded image
        setSelectedFile(acceptedFiles[0])
        setSelectedFileError('')
        // disable loader
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } else if(!validImgTypes.includes(acceptedFiles[0])){
        setSelectedFileError('PNG & JPEG files only')
      }
    }
  });
  
  const thumbs = files.map(file => (
    <div  key={file.name}>
      <div>
        <img
          src={file.preview}
          className='dropzone-image'
          alt=''
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  function handleRemove(){
    setFiles([]);
    setSelectedFile({});
  }

  function renderPage(){
    if(files.length === 0){
      return(
        <Box sx={{
          py: {xs: 1, lg: 1.5}
        }} {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <CloudIcon/>
          <Typography sx={{
            color: '#525252', 
            fontWeight: '600',
            display: {xs: 'none', lg: 'block'}
            }}>Drag and drop to upload</Typography>
          <Typography sx={{display: {xs: 'none', lg: 'block'}}}>or</Typography>
          <button type="button" className='dropzone-button' onClick={open}>Choose Image</button>
          <Typography sx={{
            color: '#B1B1B1', 
            fontSize: {xs: '12px', lg: '14px'}}}>
            PNG & JPEG File size: max. 400kb
          </Typography>
        </Box>
      )
     } else if(loader){
        return(
          <Box className='dropzone' sx={{height: '137px', justifyContent: 'center'}}>
            <ProgressBar/>
          </Box>
        )
     }
       else if(files.length > 0){
        return(
          <aside style={{position: 'relative'}} >
          {thumbs}
          <CloseIcon onClick={handleRemove} 
          sx={closeIconStyle}/>
         </aside>
        )
      }
    }
  return (
    <section className="container">
      {renderPage()}
    </section>
  );
}