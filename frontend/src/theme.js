import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      primary: { main: '#111111', light: '#333333', dark: '#000000' },
      secondary: { main: '#666666' },
      background: { default: '#f5f5f3', paper: '#ffffff' },
      text: { primary: '#111111', secondary: '#666666' },
      success: { main: '#16a34a', light: '#dcfce7', dark: '#15803d' },
      warning: { main: '#d97706', light: '#fef3c7', dark: '#b45309' },
      error: { main: '#dc2626', light: '#fee2e2', dark: '#b91c1c' },
      info: { main: '#0891b2' },
      divider: 'rgba(0,0,0,0.08)',
    } : {
      primary: { main: '#ffffff', light: '#ffffff', dark: '#d4d4d4' },
      secondary: { main: '#bdbdbd' },
      background: { default: '#0b0b0b', paper: '#151515' },
      text: { primary: '#f5f5f5', secondary: '#a3a3a3' },
      success: { main: '#22c55e', light: 'rgba(34,197,94,0.12)', dark: '#16a34a' },
      warning: { main: '#f59e0b', light: 'rgba(245,158,11,0.12)', dark: '#d97706' },
      error: { main: '#ef4444', light: 'rgba(239,68,68,0.12)', dark: '#dc2626' },
      info: { main: '#06b6d4' },
      divider: 'rgba(255,255,255,0.06)',
    }),
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: mode === 'light' ? '#64748b' : '#94a3b8' },
    subtitle2: { fontWeight: 500, fontSize: '0.8rem' },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: { fontWeight: 600, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: 8 },
          '&::-webkit-scrollbar-track': { background: mode === 'light' ? '#f1f5f9' : '#0a0f1a' },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'light' ? '#cbd5e1' : '#334155',
            borderRadius: 4,
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
          background: mode === 'light' ? 'rgba(245,245,243,0.9)' : 'rgba(11,11,11,0.9)',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: '8px 20px' },
        containedPrimary: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.28)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          letterSpacing: '0.06em',
          color: mode === 'light' ? '#64748b' : '#94a3b8',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        },
      },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
          '&:before': { display: 'none' },
          borderRadius: '12px !important',
          overflow: 'hidden',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 6 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: mode === 'light' ? '#ffffff' : '#111827',
          borderRight: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        },
      },
    },
  },
});

export default getTheme;
