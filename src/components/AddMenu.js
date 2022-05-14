import firebaseApp from "../firebase/init"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {Button} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';

import React, {useState} from 'react'
import Dropzone from './DropzoneComp'

export default function AddProduct() {

  const storage = getStorage(firebaseApp)

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileError, setSelectedFileError] = useState('');
  const [imageURL, setImageURL] = useState('');
  console.log(selectedFile?.name)

  async function uploadImage(){
    if(selectedFile){
      const imageRef = ref(storage, `images/${selectedFile.name + uuidv4()}`)
      uploadBytes(imageRef, selectedFile).then((response)=>{
        getDownloadURL(imageRef).then(url => setImageURL(url))
      }).catch(err => console.log(err))
    }
  }


  return (
    <div>
      <Dropzone setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError}/>
      <Button onClick={uploadImage}>Upload file</Button>
    </div>
  )
}
