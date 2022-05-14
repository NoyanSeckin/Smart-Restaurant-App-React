import {Typography, Box} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {useDropzone} from 'react-dropzone';

import React, {useEffect, useState} from 'react';
import CloudIcon from '../icons/CloudIcon'
import ProgressBar from './ProgressBar'

export default function DropzoneComp({setSelectedFile, setSelectedFileError}) {
  const [loader, setLoader] = useState(true);
  const [files, setFiles] = useState([]);
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
        setSelectedFileError("Fotoğraf boyutu 400kb'den büyük")
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
        setSelectedFileError('Lütfen yalnızca jpg veya png formatı yükleyin')
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
            }}>Sürükleyip bırakarak yükle </Typography>
          <Typography sx={{display: {xs: 'none', lg: 'block'}}}>veya</Typography>
          <button type="button" className='dropzone-button' onClick={open}>Görsel Seçin</button>
          <Typography sx={{
            color: '#B1B1B1', 
            fontSize: {xs: '12px', lg: '14px'}}}>
            PNG ve JPEG Dosya boyutu: max. 400kb
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
       else {
        return(
          <aside style={{position: 'relative'}} >
          {thumbs}
          <CloseIcon onClick={handleRemove} 
          sx={{position: 'absolute', zIndex: 3, top: '17px', left: '105px', fontSize: '12px', color: '#fff', background: '#3E3E3E', borderRadius: '50%', '&:hover': {cursor: 'pointer'}}}/>
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