import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    h1: {
      fontSize: '6rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.7rem',
      fontWeight: 700,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h5: {
      fontSize: '1.15rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.65,
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#0095F6',
      dark: '#0065a8',
    },
    secondary: {
      main: '#F1F3F4',
    },
    background: {
      default: '#fff',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#282828',
      secondary: '#737373',
      disabled: '#DBDBDB',
    },
  },
});

export default responsiveFontSizes(theme);
