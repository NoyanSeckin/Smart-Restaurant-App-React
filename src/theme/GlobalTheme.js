import {createTheme} from '@mui/material/styles'

export const GlobalTheme = createTheme({
  palette: {
    orange: '#ffcd38',

    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#F58840'
    },
    danger: {
        light: '#F77474',
      main: '#f44336',
      dark: '#d32f2f'
    }
  }
})