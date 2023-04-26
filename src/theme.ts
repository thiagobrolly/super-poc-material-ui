import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0FAE79',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00875A',
      contrastText: '#99FFCC',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'text' &&
            ownerState.color === 'primary' && {
              backgroundColor: 'transparent',
              color: '#0FAE79',
            }),
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          disableUnderline: true,
        },
      },
      styleOverrides: {
        root: {
          '.MuiFilledInput-root': {
            borderRadius: '8px !important',
            border: '2px solid transparent',
            'box-sizing': 'border-box',
          },

          'div.Mui-focused': {
            border: '2px solid #0FAE79',
          },
          'div.Mui-error': {
            border: '2px solid #d32f2f',
          },
          input: {
            color: '#4D4D4D',
          },
          label: {
            color: '#999999',
          },
        },
      },
    },
  },
});
