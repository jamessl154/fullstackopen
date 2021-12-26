import { createTheme } from '@material-ui/core/styles'

// https://www.youtube.com/watch?v=xIIJfmDnvPE
// new global font?

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(209, 90%, 30%)'
    },
    secondary: {
      main: '#FFFFFF'
    },
  },
  typography: {
    button: {
      // #https://stackoverflow.com/a/58222011
      textTransform: 'none',
      fontSize: '1.5rem'
    }
  }
})

export default theme