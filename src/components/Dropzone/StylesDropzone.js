export const styles = {

    dropzoneContainer: {
        py: { 
            xs: 1, 
            lg: 1.5 
        }
    },

    closeIconStyle: {
        background: '#3E3E3E',
        borderRadius: '50%',
        color: '#fff',
        left: '105px',
        fontSize: '12px',
        position: 'absolute',
        top: '17px',
        zIndex: 3,
        '&:hover': { cursor: 'pointer' }
    },

    uploadText: {
        color: '#525252',
        display: { 
            xs: 'none', 
            lg: 'block' 
        },
        fontWeight: '600'
    },

    orText: { 
        display: { 
            xs: 'none', 
            lg: 'block' 
        }
    },

    sizeText: {
        color: '#B1B1B1',
        fontSize: { 
            xs: '12px', 
            lg: '14px' 
        }
    },

    progressBarContainer: { 
        height: '137px', 
        justifyContent: 'center' 
    }


}