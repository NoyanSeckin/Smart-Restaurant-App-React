import React, {useState} from 'react'
import Dropzone from './DropzoneComp'

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileError, setSelectedFileError] = useState('');

  return (
    <div>
      <Dropzone setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError}/>
    </div>
  )
}
