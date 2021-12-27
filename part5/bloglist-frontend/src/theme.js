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
      fontSize: '1.2rem',
      fontWeight: 600,
    }
  },
  // https://stackoverflow.com/a/57995968
  overrides: {
    MuiInput: {
      input: {
        color: 'white'
      }
    },
    MuiFormLabel: {
      root: {
        color: 'white'
      }
    },
  }
})

export default theme