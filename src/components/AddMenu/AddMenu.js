import React, { useState } from 'react'

import firebaseApp from "../../firebase/init"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'

import { Box, Button, Typography, Grid } from '@mui/material'

import { v4 as uuidv4 } from 'uuid';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { styles } from './StylesAddMenu';
import Dropzone from '../Dropzone/Dropzone'
import SelectComponent from '../SelectComponent'
import PreperationSelect from '../PreperationSelect'
import SuccessAlert from '../SuccessAlert'


export default function AddProduct() {

    const db = getFirestore()
    const storage = getStorage(firebaseApp)

    // user's selected image
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileError, setSelectedFileError] = useState('');

    // state of dropzone for displaying uploaded file
    const [files, setFiles] = useState([]);

    const [isAlert, setIsAlert] = useState(false)

    async function handleUploadProduct(values) {

        const { name, description, preperationTime, price, category } = values;

        const id = uuidv4();

        const imageRef = ref(storage, `images/${id}`)
        const menuRef = doc(db, 'Menu', category);

        // upload image to the db
        uploadBytes(imageRef, selectedFile).then(() => {

            // download image url and set menu item in db
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

        setSelectedFile('')
        setFiles([]);
        setIsAlert(true)
    }

    function renderTextarea(value, error, handleChange, valueName, rowCount) {

        const label = inputInfos[valueName].label;
        const textAreaClass = error ? 'form-error' : '';

        return (
            <Box sx={styles.textAreaContainer}>

                <label htmlFor={valueName}>
                    {label}
                </label>

                <textarea className={textAreaClass} id={valueName} type='text' value={value} onChange={handleChange} rows={rowCount} />

                <Typography sx={styles.textAreaError}>
                    {error}
                </Typography>

            </Box>
        )
    }

    function renderSelectedFileError() {

        if (selectedFileError) {

            return (
                <Typography sx={styles.fileError}>
                    {selectedFileError}
                </Typography>
            )
        }
    }

    function renderSelectInputs(categoryValue, preperationValue, handleChange) {
        return (
            <Box sx={styles.selectInputsContainer}>

                <Box sx={{ flexGrow: 1 }}>

                    <label htmlFor="category" style={styles.selectInputLabel}>
                        Category
                    </label>

                    <SelectComponent value={categoryValue} id='category' handleAddMenuChange={handleChange} />

                </Box>

                <Box sx={{ flexGrow: 1 }}>

                    <label htmlFor="preperationTime" style={styles.selectInputLabel}>
                        Preperation Time
                    </label>

                    <PreperationSelect id='preperationTime' value={preperationValue} handlePreperationChange={handleChange} />

                </Box>

            </Box>
        )
    }

    function renderPriceError(priceError) {

        if (priceError) {

            return (
                <Typography sx={styles.priceError}>
                    Please enter a number
                </Typography>
            )
        }
    }

    function renderPriceInput(priceValue, priceError, handleChange) {

        const errorView = renderPriceError(priceError);

        return (
            <Box sx={styles.priceContainerStyle}>

                <div className='price-wrapper'>

                    <label htmlFor="price" style={{ marginBottom: '10px' }}>{inputInfos.price.label}</label>

                    <input className='price-input' type="text" value={priceValue} id='price' onChange={handleChange} placeholder={inputInfos.price.placeholder} style={{ marginBottom: 0 }} />

                    {errorView}

                </div>
            </Box>
        )
    }

    function renderSubmitBtn() {

        return (
            <Button type='submit' variant='contained' sx={styles.submitBtnStyle}>
                Add Product
            </Button>
        )
    }

    // Formik and yup values
    const inputInfos = {
        name: {
            label: 'Product Name',
            placeholder: 'Enter a name'
        },
        description: {
            label: 'Description',
            placeholder: 'Enter a description'
        },
        category: {
            label: 'Category',
            placeholder: 'Choose a category'
        },
        price: {
            label: 'Price',
            placeholder: 'Enter a price'
        }
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

    function renderFormikGridItem() {

        return (
            <Grid item xs={12} lg={6} >

                <Typography variant='h5'>
                    Details
                </Typography>

                <Formik

                    initialValues={initialValues}

                    validationSchema={Yup.object(yupObject)}

                    onSubmit={(values, { resetForm }) => {

                        // check if user selected image, if so submit
                        if (selectedFile?.name) {

                            handleUploadProduct(values)
                                .then(() => resetForm());

                        }
                        else {
                            setSelectedFileError('Choose a file')
                        }

                    }}
                >
                    {({ values, errors, handleSubmit, handleChange }) => {

                        const nameTextArea = renderTextarea(values.name, errors.name, handleChange, 'name', '1');

                        const descriptionTextArea = renderTextarea(values.description, errors.description, handleChange, 'description', '3');

                        const selectInputViews = renderSelectInputs(values.category, values.preperationTime, handleChange);

                        const priceInputView = renderPriceInput(values.price, errors.price, handleChange);

                        const submitButtonView = renderSubmitBtn();

                        return (
                            <form onSubmit={handleSubmit}>

                                <Box sx={styles.formBox}>

                                    {nameTextArea}
                                    {descriptionTextArea}

                                    {selectInputViews}
                                    {priceInputView}

                                    {submitButtonView}

                                </Box>

                            </form>
                        )
                    }}
                </Formik>
            </Grid>
        )
    }

    function renderUploadGridItem() {
        
        const errorView =  renderSelectedFileError();

        return (
            <Grid item xs={12} lg={6}>

                <Typography variant='h5' sx={styles.uploadHeader}>
                        Upload Image
                 </Typography>

                <Dropzone setSelectedFile={setSelectedFile} setSelectedFileError={setSelectedFileError} selectedFile={renderSelectedFileError}
                    files={files} setFiles={setFiles} />

                {errorView}

            </Grid>
        )
    }

    const formGridView = renderFormikGridItem();
    const uploadGridView = renderUploadGridItem();

    return (

        <Grid container sx={styles.gridContainerStyle}>
            
            {formGridView}
            {uploadGridView}

            <SuccessAlert isAlert={isAlert} setIsAlert={setIsAlert} content='Item added to the menu!' />

        </Grid>
    )
}
