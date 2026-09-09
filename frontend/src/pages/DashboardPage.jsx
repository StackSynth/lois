import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScans } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const STATUS_CHIP = {
  COMPLIANT: { label: 'Compliant', color: 'success' },
  NEEDS_ATTENTION: { label: 'Needs Review', color: 'warning' },
  NON_COMPLIANT: { label: 'Non-Compliant', color: 'error' },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const result = await getScans();
        setScans(result.data || []);
      } catch (err) {
        console.error('Failed to fetch scans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, []);

  const stats = useMemo(() => ({
    total: scans.length,
    compliant: scans.filter(s => s.overallStatus === 'COMPLIANT').length,
    attention: scans.filter(s => s.overallStatus === 'NEEDS_ATTENTION').length,
    nonCompliant: scans.filter(s => s.overallStatus === 'NON_COMPLIANT').length,
    avgScore: scans.length > 0 ? Math.round(scans.reduce((sum, s) => sum + (s.complianceScore || 0), 0) / scans.length) : 0,
  }), [scans]);

  const recentScans = scans.slice(0, 10);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const statCards = [
    { label: 'Total products scanned', value: stats.total, icon: <AssignmentIcon />, color: 'primary.main', note: 'All-time activity' },
    { label: 'Compliant products', value: stats.compliant, icon: <CheckCircleIcon />, color: 'success.main', note: 'Ready for release' },
    { label: 'Pending review', value: stats.attention, icon: <WarningAmberIcon />, color: 'warning.main', note: 'Needs attention' },
    { label: 'Non-compliant', value: stats.nonCompliant, icon: <CancelIcon />, color: 'error.main', note: 'Action required' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="overline" color="secondary.main">Compliance operations</Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>{getGreeting()}, Inspector</Typography>
          <Typography variant="subtitle1">Monitor, scan and manage packaged commodity compliance.</Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<QrCodeScannerIcon />} onClick={() => navigate('/scan')}>New scan</Button>
      </Box>

      <Card sx={{ mb: 3, bgcolor: 'primary.main', color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><AutoAwesomeIcon sx={{ color: '#7dd3c7' }} /><Typography variant="overline" sx={{ color: '#b8e6df' }}>AI compliance desk</Typography></Box>
          <Typography variant="h5" sx={{ color: '#fff', maxWidth: 620, mb: 1 }}>A clear view of every label decision.</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: 620 }}>Jarvis combines OCR confidence, mandatory declaration checks and Legal Metrology rules into an audit-ready review.</Typography>
        </CardContent>
        <Box sx={{ position: 'absolute', right: -30, top: -70, width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)' }} />
        <Box sx={{ position: 'absolute', right: 40, bottom: -110, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(125,211,199,0.25)' }} />
      </Card>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statCards.map(card => (
          <Grid item xs={12} sm={6} lg={3} key={card.label}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ py: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}><Box sx={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: 1.5, bgcolor: `${card.color.replace('.main', '')}.light`, color: card.color }}>{card.icon}</Box><Typography variant="caption" color="text.secondary">Live</Typography></Box>
                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1, color: 'text.primary' }}>{card.value}</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 700 }}>{card.label}</Typography>
                <Typography variant="caption" color="text.secondary">{card.note}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box><Typography variant="h6">Recent scans</Typography><Typography variant="body2" color="text.secondary">Latest compliance activity across your workspace</Typography></Box>
        <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/history')}>View all</Button>
      </Box>
      {recentScans.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">No scans yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Scan a product label or try a demo to get started.</Typography>
            <Button variant="contained" startIcon={<QrCodeScannerIcon />} onClick={() => navigate('/scan')}>Start your first scan</Button>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentScans.map(scan => {
                const mfr = scan.extractedFields?.find(f => f.field === 'manufacturer')?.value || '—';
                const chipCfg = STATUS_CHIP[scan.overallStatus] || { label: scan.overallStatus, color: 'default' };
                return (
                  <TableRow key={scan.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/report/${scan.id}`)}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{scan.productName}</Typography>
                      {scan.isDemo && <Chip label="DEMO" size="small" color="warning" variant="outlined" sx={{ ml: 1, height: 20, fontSize: '0.65rem' }} />}
                    </TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{mfr}</Typography></TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={800} color={scan.complianceScore >= 85 ? 'success.main' : scan.complianceScore >= 50 ? 'warning.main' : 'error.main'}>{scan.complianceScore}</Typography>
                    </TableCell>
                    <TableCell><Chip label={chipCfg.label} color={chipCfg.color} size="small" /></TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography></TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Report">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/report/${scan.id}`); }}><VisibilityIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
