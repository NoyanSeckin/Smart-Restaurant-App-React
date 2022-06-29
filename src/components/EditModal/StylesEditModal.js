export const styles = {

    modalContainerStyle: {
        bgcolor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 3px 12px #1E36482E',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '355px',
        zIndex: 33,
        px: 2,
        py: 2,
    },

    submitButton: {
        bgcolor: 'primary.light',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '18px',
        px: 5,
        width: '100%',

        '&:hover': { 
            bgcolor: 'primary.main' 
        }
    },

    closeButton: {
        background: '#f0f8ff',
        borderRadius: '8px',
        color: 'warning.dark',
        fontSize: '18px',
        mt: 1,
        px: 5,
        width: '100%'
    },

    iconStyle: {
        position: 'absolute',
        top: '50px',
        '&:hover': { cursor: 'pointer' }
    },
      
     formContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: 1,
        width: '100%'
    },
      
    displayContainerStyle: {
        height: '170px',
        mt: 3,
        position: 'relative'
    },
    
    selectedFileErrorStyle: {
        color: 'danger.light',
        mt: 1,
        position: 'absolute',
        right: '0',
        top: '-35px',
    },

    textAreaContainer: { 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative' 
    },
      
     textareaError: {
        bottom: '5px',
        color: 'danger.light',
        left: '5px',
        position: 'absolute'
    }
}