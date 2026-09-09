import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'New scan', path: '/scan', icon: <QrCodeScannerOutlinedIcon /> },
  { label: 'Scan history', path: '/history', icon: <HistoryOutlinedIcon /> },
  { label: 'Inspector console', path: '/inspector', icon: <FactCheckOutlinedIcon /> },
];

export default function AppLayout({ children, toasts, onRemoveToast }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLanding = location.pathname === '/';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentToast = toasts?.[0];

  const nav = (item) => (
    <ListItemButton
      key={item.path}
      component={Link}
      to={item.path}
      selected={location.pathname === item.path}
      onClick={() => setDrawerOpen(false)}
      sx={{
        borderRadius: 1.5,
        mb: 0.5,
        py: 1.1,
        '&:hover': { bgcolor: 'grey.200' },
        '&.Mui-selected': {
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
        },
        '&.Mui-selected:hover': { bgcolor: 'grey.500', color: 'primary.contrastText' },
      }}
    >
      <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
    </ListItemButton>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {!isLanding && <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: 'background.paper', color: 'text.primary', border: 0, borderBottom: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(16,37,54,0.04)' }}>
        <Toolbar sx={{ gap: 2, minHeight: '68px !important', px: { xs: 2, md: 3 } }}>
          {isMobile && <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start"><MenuIcon /></IconButton>}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none', color: 'inherit', mr: { xs: 0, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 900, width: 34, height: 34, borderRadius: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', display: 'grid', placeItems: 'center', fontSize: '1.05rem' }}>J</Typography>
            {!isMobile && <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 800, letterSpacing: '0.12em' }}>JARVIS</Typography>}
          </Box>
          {!isMobile && <Box sx={{ maxWidth: 360, flex: 1, display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', borderRadius: 1.5, px: 1.5, py: 0.7 }}><SearchIcon fontSize="small" color="disabled" /><Typography variant="body2" color="text.secondary">Search scans, products or reports</Typography></Box>}
          <Box sx={{ flex: 1 }} />
          <Tooltip title="System status"><Chip icon={<ShieldOutlinedIcon />} label="System online" size="small" color="success" variant="outlined" sx={{ display: { xs: 'none', sm: 'flex' } }} /></Tooltip>
          <Tooltip title="Notifications"><IconButton size="small" color="inherit"><NotificationsNoneOutlinedIcon /></IconButton></Tooltip>
          <Tooltip title="Help"><IconButton size="small" color="inherit"><HelpOutlineIcon fontSize="small" /></IconButton></Tooltip>
          {!isMobile && <Button size="small" onClick={() => navigate('/signin')} startIcon={<AccountCircleOutlinedIcon />} sx={{ ml: 0.5, px: 1.5, py: 0.65, color: 'text.primary' }}>Inspector</Button>}
        </Toolbar>
      </AppBar>}

      {!isLanding && !isMobile && <Drawer variant="permanent" sx={{ width: 248, flexShrink: 0, '& .MuiDrawer-paper': { width: 248, boxSizing: 'border-box', top: 68, height: 'calc(100% - 68px)', px: 1.5, py: 2 } }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>Workspace</Typography>
        <List sx={{ p: 0 }}>{NAV_ITEMS.map(nav)}</List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 'auto', mx: 0.5, p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'secondary.dark' }}>LEGAL METROLOGY</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>Rules engine ready for your next label review.</Typography>
        </Box>
      </Drawer>}

      {!isLanding && <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { width: 280, pt: '68px', px: 1.5 } }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>Workspace</Typography>
        <List sx={{ p: 0 }}>{NAV_ITEMS.map(nav)}</List>
        <Divider sx={{ my: 2 }} />
        <Button component={Link} to="/scan" variant="contained" startIcon={<QrCodeScannerOutlinedIcon />} onClick={() => setDrawerOpen(false)} sx={{ mx: 1 }}>Start new scan</Button>
      </Drawer>}

      <Box component="main" sx={{ flex: 1, minWidth: 0, pt: isLanding ? 0 : '68px', position: 'relative', zIndex: 1 }}>
        {children}
      </Box>

      {currentToast && <Snackbar open autoHideDuration={currentToast.duration > 0 ? currentToast.duration : null} onClose={() => onRemoveToast(currentToast.id)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={currentToast.type === 'error' ? 'error' : currentToast.type === 'warning' ? 'warning' : currentToast.type === 'success' ? 'success' : 'info'} onClose={() => onRemoveToast(currentToast.id)} variant="filled" sx={{ width: '100%' }}>{currentToast.message}</Alert>
      </Snackbar>}
    </Box>
  );
}
