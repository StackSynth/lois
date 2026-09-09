import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      primary: { main: '#12304a', light: '#275a7d', dark: '#0a1f31' },
      secondary: { main: '#168f8a', light: '#d8f3ef', dark: '#0b625f' },
      background: { default: '#f3f6f8', paper: '#ffffff' },
      text: { primary: '#102536', secondary: '#607385' },
      success: { main: '#16a34a', light: '#dcfce7', dark: '#15803d' },
      warning: { main: '#d97706', light: '#fef3c7', dark: '#b45309' },
      error: { main: '#dc2626', light: '#fee2e2', dark: '#b91c1c' },
      info: { main: '#2878b8' },
      divider: 'rgba(16,37,54,0.10)',
    } : {
      // Avoid white primary — it makes buttons/nav/text disappear on dark surfaces
      primary: { main: '#3db8a8', light: '#6fd4c7', dark: '#2a8f82', contrastText: '#061218' },
      secondary: { main: '#7dd3c7', light: 'rgba(125,211,199,0.14)', dark: '#4fd1c5', contrastText: '#061218' },
      background: { default: '#0a0f1a', paper: '#121826' },
      text: { primary: '#f1f5f9', secondary: '#94a3b8' },
      success: { main: '#4ade80', light: 'rgba(34,197,94,0.16)', dark: '#22c55e', contrastText: '#052e16' },
      warning: { main: '#fbbf24', light: 'rgba(245,158,11,0.16)', dark: '#f59e0b', contrastText: '#422006' },
      error: { main: '#f87171', light: 'rgba(239,68,68,0.16)', dark: '#ef4444', contrastText: '#450a0a' },
      info: { main: '#38bdf8', light: 'rgba(6,182,212,0.16)', dark: '#0ea5e9', contrastText: '#082f49' },
      divider: 'rgba(148,163,184,0.18)',
      action: {
        hover: 'rgba(148,163,184,0.08)',
        selected: 'rgba(61,184,168,0.18)',
        disabled: 'rgba(148,163,184,0.3)',
        disabledBackground: 'rgba(148,163,184,0.12)',
      },
    }),
  },
  typography: {
    fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: mode === 'light' ? '#64748b' : '#94a3b8' },
    subtitle2: { fontWeight: 500, fontSize: '0.8rem' },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: { fontWeight: 600, letterSpacing: '0.08em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'light' ? '#f3f6f8' : '#0a0f1a',
          color: mode === 'light' ? '#102536' : '#f1f5f9',
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
          boxShadow: mode === 'light' ? '0 5px 18px rgba(16,37,54,0.045)' : 'none',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '9px 20px' },
        containedPrimary: {
          color: mode === 'light' ? '#ffffff' : '#061218',
          boxShadow: mode === 'light' ? '0 3px 9px rgba(18,48,74,0.20)' : '0 3px 12px rgba(61,184,168,0.28)',
          '&:hover': {
            boxShadow: mode === 'light' ? '0 6px 16px rgba(18,48,74,0.24)' : '0 6px 18px rgba(61,184,168,0.34)',
          },
        },
        outlined: {
          borderColor: mode === 'light' ? 'rgba(16,37,54,0.22)' : 'rgba(148,163,184,0.35)',
          color: mode === 'light' ? '#102536' : '#f1f5f9',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem' },
        filledPrimary: {
          color: mode === 'light' ? '#ffffff' : '#061218',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? undefined : '#f1f5f9',
        },
        standardInfo: mode === 'dark' ? {
          backgroundColor: 'rgba(56,189,248,0.14)',
          color: '#e0f2fe',
          '& .MuiAlert-icon': { color: '#38bdf8' },
        } : undefined,
        standardSuccess: mode === 'dark' ? {
          backgroundColor: 'rgba(74,222,128,0.14)',
          color: '#dcfce7',
          '& .MuiAlert-icon': { color: '#4ade80' },
        } : undefined,
        standardWarning: mode === 'dark' ? {
          backgroundColor: 'rgba(251,191,36,0.14)',
          color: '#fef3c7',
          '& .MuiAlert-icon': { color: '#fbbf24' },
        } : undefined,
        standardError: mode === 'dark' ? {
          backgroundColor: 'rgba(248,113,113,0.14)',
          color: '#fee2e2',
          '& .MuiAlert-icon': { color: '#f87171' },
        } : undefined,
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
          background: mode === 'light' ? '#ffffff' : '#121826',
          borderRight: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(148,163,184,0.18)'}`,
          color: mode === 'light' ? '#102536' : '#f1f5f9',
        },
      },
    },
  },
});

export default getTheme;
