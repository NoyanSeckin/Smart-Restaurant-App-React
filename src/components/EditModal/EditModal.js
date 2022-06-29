import React, { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Typography from '@mui/material/Typography';

import firebaseApp from "../../firebase/init"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { v4 as uuidv4 } from 'uuid';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { styles } from './StylesEditModal'
import PreperationSelect from '../PreperationSelect'
import DropzoneComp from '../Dropzone/Dropzone';

export default function EditModal({ isModal, setIsModal, item, setItem, setIsEditItem, setIsSpinner }) {

    const [isItemImageStay, setIsItemImageStay] = useState(true);
    // state of dropzone for displaying uploaded file
    const [files, setFiles] = useState([]);
    // user's selected image
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileError, setSelectedFileError] = useState('');
    const handleClose = () => setIsModal(false);

    async function uploadImage(id, object, setObject, setIsItem) {
        const storage = getStorage(firebaseApp)
        const imageRef = ref(storage, `images/${id}`)
        await uploadBytes(imageRef, selectedFile).then((response) => {
            getDownloadURL(imageRef).then(url => {
                setObject({ ...object, changedId: id, image: url })
                setIsItem(true)
            });
        }).catch(err => console.log(err))

    }

    // prevent broken image display
    useEffect(() => {

        if (isItemImageStay) {

            setFiles([]);
            setSelectedFile({});
            setSelectedFileError('')

        }

    }, [isItemImageStay])

    function renderImageOrDropzone() {

        if (isItemImageStay) {

            return (
                <img src={item?.image} alt="" style={{ width: '60%' }} />)
        }
        else {

            return (
                <DropzoneComp files={files} setFiles={setFiles} setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError} selectedFile={selectedFile} />
            )
        }
    }

    function renderActionIcon() {

        if (isItemImageStay) {

            return (
                <CloseIcon className='delete-icon' sx={styles.iconStyle} onClick={() => setIsItemImageStay(false)} />
            )
        } else {

            return (
                <SettingsBackupRestoreIcon sx={styles.iconStyle} onClick={() => setIsItemImageStay(true)} />
            )
        }
    }

    function renderTextarea(value, error, handleChange, valueName) {

        const textAreaClass = error ? 'form-error' : '';

        return (
            <Box sx={styles.textAreaContainer}>

                <textarea className={textAreaClass} id={valueName} type='text' value={value} onChange={handleChange} rows='1' />

                <Typography sx={styles.textareaError}>{
                    error}
                </Typography>

            </Box>
        )
    }

    function renderButtonActions() {

        return (
            <Box>

                <Button type='submit' sx={styles.submitButton}>
                    Proceed
                </Button>

                <Button sx={styles.closeButton} onClick={handleClose}>
                    Cancel
                </Button>

            </Box>
        )
    }

    function renderSelectedFileError() {

        if (selectedFileError) {

            return (
                <Typography sx={styles.selectedFileErrorStyle}>
                    {selectedFileError}
                </Typography>
            )
        }
    }

    function handleFileUpdate(editedItem) {

        // check if user uploaded image
        if (selectedFile.name) {

            setIsSpinner(true);
            handleClose();

            const id = uuidv4();

            uploadImage(id, editedItem, setItem, setIsEditItem).then(() => {
                setSelectedFile({});
                setFiles([]);
            })

            setSelectedFileError('')

        }
        else {
            setSelectedFileError('Please choose image')
        }
    }

    function handleOnlyUpdate(editedItem) {

        setItem(editedItem)
        setIsEditItem(true)

        handleClose();
        setSelectedFileError('')

    }

    function handleUpdate(editedItem) {

        // if user uploaded photo
        if (!isItemImageStay) {
            handleFileUpdate(editedItem)
        } else {
            handleOnlyUpdate(editedItem);
        }
    }

    function renderHeader() {

        return (
            <Typography id="transition-modal-title" variant="h5" sx={{ fontWeight: '700', mb: 2 }}>
                Edit Item
            </Typography>
        )
    }

    function renderDisplay() {
        
        return (
            <Box sx={styles.displayContainerStyle}>
                {renderImageOrDropzone()}
                {renderSelectedFileError()}
            </Box>
        )
    }

    function renderSelectComponent(preperationTime, handleChange) {
        return (
            <Box>
                <Box sx={{ flexGrow: 1 }}>
                    <PreperationSelect id='preperationTime' value={preperationTime} handlePreperationChange={handleChange} style={{ p: 0 }} />
                </Box>
            </Box>
        )
    }

    function renderPriceInput(priceValue, priceError, handleChange) {
        return (
            <div className='price-wrapper'>
                <input className={` price-input ${priceError && 'form-error'}`} type="text" value={priceValue} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder}
                    style={{ marginBottom: 0 }} />
            </div>
        )
    }

    // formik & yup values

    const inputInfos = {
        name: { label: 'Product Name', placeholder: 'Enter a name' },
        description: { label: 'Description', placeholder: 'Enter a description' },
        category: { label: 'Category', placeholder: 'Choose a category' },
        price: { label: 'Price', placeholder: 'Enter a price' }
    }
    const initialValues = {
        name: item.name,
        description: item.description,
        price: item.price,
        preperationTime: item.preperationTime
    }

    const yupObject = {
        name: Yup.string().max(20, 'Max 20 characters.').required('Name is required'),
        description: Yup.string().max(40, 'Max 40 characters').required('Description is required'),
        preperationTime: Yup.string(),
        price: Yup.number().required(),
    }

    function renderFormik() {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={
                    Yup.object(yupObject)
                }
                onSubmit={(values) => {

                    const editedItem = {
                        id: item.id,
                        name: values.name,
                        description: values.description,
                        preperationTime: values.preperationTime,
                        price: values.price,
                        image: item.image
                    }

                    handleUpdate(editedItem);
                }}
            >
                {({ values, errors, handleSubmit, handleChange }) => (
                    <form className='edit' onSubmit={handleSubmit}>
                        <Box sx={styles.formContainerStyle}>
                            {renderTextarea(values.name, errors.name, handleChange, 'name')}
                            {renderTextarea(values.description, errors.description, handleChange, 'description')}
                            {renderSelectComponent(values.preperationTime, handleChange)}
                            {renderPriceInput(values.price, errors.price, handleChange)}
                            {renderButtonActions()}
                        </Box>
                    </form>
                )}
            </Formik>
        )
    }

    return (
        <Box sx={{ position: 'relative' }}>
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
                    style: { opacity: 0.7, backgroundColor: '#4B9CE2' }
                }}
            >
                <Fade in={isModal}>
                    <Box sx={modalContainerStyle}>
                        {renderActionIcon()}
                        {renderHeader()}
                        {renderDisplay()}
                        {renderFormik()}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}