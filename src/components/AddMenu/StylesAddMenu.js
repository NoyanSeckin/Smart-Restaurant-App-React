export const styles = {

    gridContainerStyle: {
        height: {
            xs: '80vh',
            lg: '70vh'
        },
        position: 'relative'
    },

    submitBtnStyle: {
        color: '#fff',
        backgroundColor: 'warning.main',
        fontSize: '18px',
        borderRadius: '8px',
        position: 'absolute',
        px: {
            xs: 0,
            lg: 16
        },
        left: {
            xs: 0,
            lg: 'auto'
        },
        mx: {
            xs: 3.5,
            lg: 0
        },
        right: {
            xs: '0',
            lg: '0'
        },
        bottom: {
            xs: '-35px',
            lg: '0'
        },
        mb: {
            xs: 1,
            lg: 0
        },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'warning.dark'
        },
    },

    priceContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2.7,
        mt: 2,
        width: {
            sm: '100%',
            md: '30%'
        },
    },

    textAreaContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative' 
    },

    textAreaError: { 
        bottom: '-5px', 
        color: 'danger.light' ,
        position: 'absolute'
    },

    fileError: { 
        color: 'danger.light', 
        mt: 1, 
        textAlign: 'center' 
    },

    selectInputsContainer: { 
        display: 'flex', 
        fleWrap: 'wrap', 
        gap: 2 
    },

    selectInputLabel: { 
        display: 'inline-block' ,
        marginBottom: '1rem',
    },

    priceError: {
        color: 'danger.light',
        fontSize: '15px',
        mb: 2
    },

    formBox: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1, 
        mt: 1 ,
        width: '80%'
    },

    uploadHeader: { 
        mb: { 
            xs: 0, 
            lg: 2 
        } 
    }

}