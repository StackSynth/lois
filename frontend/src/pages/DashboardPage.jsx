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
    { label: 'Total Scans', value: stats.total, icon: <AssignmentIcon />, color: 'primary.main' },
    { label: 'Compliant', value: stats.compliant, icon: <CheckCircleIcon />, color: 'success.main' },
    { label: 'Needs Review', value: stats.attention, icon: <WarningAmberIcon />, color: 'warning.main' },
    { label: 'Non-Compliant', value: stats.nonCompliant, icon: <CancelIcon />, color: 'error.main' },
    { label: 'Avg Score', value: stats.avgScore, icon: <TrendingUpIcon />, color: 'info.main' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Greeting */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">{getGreeting()} 👋</Typography>
        <Typography variant="subtitle1">Packaged Commodity Compliance Overview</Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {statCards.map(card => (
          <Grid item xs={6} sm={4} md key={card.label}>
            <Card sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <Box sx={{ color: card.color, mb: 1.5 }}>{card.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1, color: card.color }}>{card.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button variant="contained" startIcon={<QrCodeScannerIcon />} onClick={() => navigate('/scan')}>Scan Product</Button>
        <Button variant="outlined" onClick={() => navigate('/inspector')}>Inspector Console</Button>
        <Button variant="outlined" onClick={() => navigate('/history')}>View History</Button>
      </Box>

      {/* Recent Scans */}
      <Typography variant="h6" sx={{ mb: 2 }}>Recent Scans</Typography>
      {recentScans.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">No scans yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Scan a product label or try a demo to get started.</Typography>
            <Button variant="contained" onClick={() => navigate('/scan')}>Scan a Product</Button>
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
