import { createTheme } from '@mui/material/styles';

// Cores da Greatek
const greatekPalette = {
  greatekBlue: '#0081cc',
  darkBlue: '#083561',
  lightBlue: '#63B8E7',
  darkGrey: '#f9f9f9', // Usado como background suave
  lightGrey: '#e9e9e9', // Usado para bordas ou divisores
  black: '#000000',
  white: '#ffffff',
  // Cores semânticas adicionais (padrão do Material-UI)
  success: {
    main: '#00a86b', // Verde para sucesso (do email)
  },
  warning: {
    main: '#e87d11', // Laranja para aviso/objeção (do email)
  },
  error: {
    main: '#d93025', // Vermelho para erro/gap (do email)
  },
  info: {
    main: '#0081cc', // Azul para informação
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: greatekPalette.darkBlue, // Azul escuro como primário principal
      light: greatekPalette.lightBlue,
      dark: greatekPalette.darkBlue, // Pode ser o mesmo ou um tom mais escuro
      contrastText: greatekPalette.white,
    },
    secondary: {
      main: greatekPalette.greatekBlue, // Azul Greatek como secundário
      light: greatekPalette.lightBlue,
      dark: greatekPalette.greatekBlue,
      contrastText: greatekPalette.white,
    },
    background: {
      default: '#f4f7fb', // Fundo mais moderno e tecnológico
      paper: '#ffffff', // Fundo branco luxuoso para cards
    },
    text: {
      primary: greatekPalette.darkBlue, // Cor de texto principal
      secondary: '#50667a', // Um tom de cinza para textos secundários
    },
    divider: greatekPalette.lightGrey,
    // Adicionando as cores Greatek para acesso fácil
    greatek: {
      blue: greatekPalette.greatekBlue,
      darkBlue: greatekPalette.darkBlue,
      lightBlue: greatekPalette.lightBlue,
      darkGrey: greatekPalette.darkGrey,
      lightGrey: greatekPalette.lightGrey,
      black: greatekPalette.black,
      white: greatekPalette.white,
    },
    // Incluindo cores semânticas para alertas e status
    success: greatekPalette.success,
    warning: greatekPalette.warning,
    error: greatekPalette.error,
    info: greatekPalette.info,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Material-UI usa Roboto por padrão
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: greatekPalette.darkBlue,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: greatekPalette.darkBlue,
    },
    // ... adicione outros estilos de tipografia conforme necessário
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Borda arredondada para botões
        },
        containedPrimary: {
          backgroundColor: greatekPalette.greatekBlue,
          '&:hover': {
            backgroundColor: greatekPalette.darkBlue,
          },
        },
        outlinedPrimary: {
            borderColor: greatekPalette.greatekBlue,
            color: greatekPalette.greatekBlue,
            '&:hover': {
                borderColor: greatekPalette.darkBlue,
                color: greatekPalette.darkBlue,
            }
        }
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: greatekPalette.darkBlue,
            }
        }
    },
    MuiLink: {
        styleOverrides: {
            root: {
                color: greatekPalette.greatekBlue,
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16, // Bordas arredondadas modernas
                background: 'rgba(255, 255, 255, 0.85)', // Glassmorphism
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(0, 129, 204, 0.08)', // Sombra azul Greatek sutil
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px 0 rgba(0, 129, 204, 0.15)',
                }
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 600,
            },
            colorSuccess: {
                backgroundColor: greatekPalette.success.main,
                color: greatekPalette.white,
            },
            colorWarning: {
                backgroundColor: greatekPalette.warning.main,
                color: greatekPalette.white,
            },
            colorError: {
                backgroundColor: greatekPalette.error.main,
                color: greatekPalette.white,
            },
        },
    },
  },
});

export default theme;
