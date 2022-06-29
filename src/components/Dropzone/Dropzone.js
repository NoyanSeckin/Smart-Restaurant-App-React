import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { useDropzone } from 'react-dropzone';

import { styles } from './StylesDropzone'
import CloudIcon from '../../icons/CloudIcon'
import ProgressBar from '../ProgressBar'

export default function DropzoneComp({ setSelectedFile, setSelectedFileError, files, setFiles }) {

    const [loader, setLoader] = useState(false);

    const validImgTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    function handleImageUpload(acceptedFiles) {

        // activate loader
        setLoader(true);

        // set image preview
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        // set the uploaded image
        setSelectedFile(acceptedFiles[0])
        setSelectedFileError('')

        // disable loader
        setTimeout(() => {
            setLoader(false);
        }, 1000);

    }


    const { getRootProps, getInputProps, open } = useDropzone({
        accept: {
            'image/*': []
        },
        multiple: false,
        noClick: true,
        onDrop: (acceptedFiles) => {

            const productImage = acceptedFiles[0];

            // size check
            if (productImage.size > 400000) {

                setSelectedFileError("Image is larger than 400kb");
            }
            // image type check
            else if (!validImgTypes.includes(productImage)) {

                setSelectedFileError('PNG & JPEG files only')
            }
            // upload image
            else if (validImgTypes.includes(productImage.type)) {

                handleImageUpload(acceptedFiles)
            }
        }
    });

    const thumbs = files.map(file => (

        <div key={file.name}>
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


    function handleRemove() {
        setFiles([]);
        setSelectedFile({});
    }

    function renderDropzone() {
        return (
            <Box sx={styles.dropzoneContainer} {...getRootProps({ className: 'dropzone' })}>

                <input {...getInputProps()} />

                <CloudIcon />

                <Typography sx={styles.uploadText}>
                    Drag and drop to upload
                </Typography>

                <Typography sx={styles.orText}>
                    or
                </Typography>

                <button type="button" className='dropzone-button' onClick={open}>
                    Choose Image
                </button>

                <Typography sx={styles.sizeText}>
                    PNG & JPEG File size: max. 400kb
                </Typography>
            </Box>
        )
    }

    function renderProgressBar() {

        return (
            <Box className='dropzone' sx={styles.progressBarContainer}>

                <ProgressBar />

            </Box>
        )
    }

    function renderDisplayImage() {

        return (
            <aside style={{ position: 'relative' }} >

                {thumbs}

                <CloseIcon onClick={handleRemove}
                    sx={styles.closeIconStyle} />

            </aside>
        )
    }

    function renderPage() {

        if (files.length === 0) {
            const dropzoneView = renderDropzone();
            return dropzoneView;
        } 
        else if (loader) {
            const progressBarView = renderProgressBar();
            return progressBarView;
        } 
        else if (files.length > 0) {
            const imageView = renderDisplayImage();
            return imageView;
        }
    }

    const pageView = renderPage();

    return (
        <section className="container">
            {pageView}
        </section>
    );
}