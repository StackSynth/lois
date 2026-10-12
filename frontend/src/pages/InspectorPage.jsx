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
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const STATUS_CHIP = {
  COMPLIANT: { label: 'Compliant', color: 'success' },
  NEEDS_ATTENTION: { label: 'Needs Review', color: 'warning' },
  NON_COMPLIANT: { label: 'Non-Compliant', color: 'error' },
};

export default function InspectorPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

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

  useEffect(() => {
    fetchScans();
    const interval = setInterval(fetchScans, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredScans = useMemo(() => {
    let results = scans;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(s => {
        const name = (s.productName || '').toLowerCase();
        const mfr = (s.extractedFields?.find(f => f.field === 'manufacturer')?.value || '').toLowerCase();
        return name.includes(q) || mfr.includes(q);
      });
    }
    if (filter === 'COMPLIANT') results = results.filter(s => s.overallStatus === 'COMPLIANT');
    else if (filter === 'NON_COMPLIANT') results = results.filter(s => s.overallStatus === 'NON_COMPLIANT' || s.overallStatus === 'NEEDS_ATTENTION');
    else if (filter === 'DEMO') results = results.filter(s => s.isDemo);
    return results;
  }, [scans, search, filter]);

  const stats = useMemo(() => ({
    total: scans.length,
    compliant: scans.filter(s => s.overallStatus === 'COMPLIANT').length,
    attention: scans.filter(s => s.overallStatus === 'NEEDS_ATTENTION').length,
    nonCompliant: scans.filter(s => s.overallStatus === 'NON_COMPLIANT').length,
    avgScore: scans.length > 0 ? Math.round(scans.reduce((sum, s) => sum + (s.complianceScore || 0), 0) / scans.length) : 0,
  }), [scans]);

  const statCards = [
    { label: 'Total', value: stats.total, icon: <AssignmentIcon />, color: 'primary.main' },
    { label: 'Compliant', value: stats.compliant, icon: <CheckCircleIcon />, color: 'success.main' },
    { label: 'Review', value: stats.attention, icon: <WarningAmberIcon />, color: 'warning.main' },
    { label: 'Failed', value: stats.nonCompliant, icon: <CancelIcon />, color: 'error.main' },
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <AdminPanelSettingsIcon color="primary" sx={{ fontSize: { xs: 26, md: 32 } }} />
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>Inspector Console</Typography>
      </Box>
      <Typography variant={isMobile ? 'body2' : 'subtitle1'} sx={{ mb: 3 }}>Review scan history, filter results, and generate audit reports</Typography>

      {/* Stats */}
      <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: 3 }}>
        {statCards.map(card => (
          <Grid item xs={6} sm key={card.label}>
            <Card sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: isMobile ? 1.5 : 2.5, px: isMobile ? 1 : 2 }}>
                <Box sx={{ color: card.color, mb: 0.5 }}>{card.icon}</Box>
                <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={800} color={card.color}>{card.value}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: isMobile ? '0.6rem' : undefined }}>{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search by product name or manufacturer..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <Box sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 } }}>
          <ToggleButtonGroup value={filter} exclusive onChange={(e, v) => v && setFilter(v)} size="small" sx={{ flexWrap: 'nowrap' }}>
            <ToggleButton value="ALL">All</ToggleButton>
            <ToggleButton value="COMPLIANT">✓ Compliant</ToggleButton>
            <ToggleButton value="NON_COMPLIANT" sx={{ whiteSpace: 'nowrap' }}>✕ Non-Comp.</ToggleButton>
            <ToggleButton value="DEMO">🧪 Demo</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Content */}
      {filteredScans.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: { xs: 5, md: 8 } }}>
            <AssignmentIcon sx={{ fontSize: { xs: 40, md: 56 }, color: 'text.secondary', mb: 2, opacity: 0.4 }} />
            <Typography variant="h6" color="text.secondary">{scans.length === 0 ? 'No scans yet' : 'No matching scans'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {scans.length === 0 ? 'Scan a product label or try a demo to get started.' : 'Try adjusting your search or filter criteria.'}
            </Typography>
            {scans.length === 0 && (
              <Button variant="contained" startIcon={<QrCodeScannerIcon />} onClick={() => navigate('/scan')}>Scan a Product</Button>
            )}
          </CardContent>
        </Card>
      ) : isMobile ? (
        /* Mobile Card Layout */
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {filteredScans.map(scan => {
            const mfr = scan.extractedFields?.find(f => f.field === 'manufacturer')?.value || '—';
            const chipCfg = STATUS_CHIP[scan.overallStatus] || { label: scan.overallStatus, color: 'default' };
            return (
              <Card
                key={scan.id}
                onClick={() => navigate(`/report/${scan.id}`)}
                sx={{ cursor: 'pointer', '&:active': { transform: 'scale(0.98)' }, transition: 'transform 0.15s ease' }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ minWidth: 0, flex: 1, mr: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>{scan.productName}</Typography>
                        {scan.isDemo && <Chip label="DEMO" size="small" color="warning" variant="outlined" sx={{ height: 18, fontSize: '0.55rem' }} />}
                      </Box>
                      <Typography variant="caption" color="text.secondary" noWrap>{mfr}</Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{ color: scan.complianceScore >= 85 ? 'success.main' : scan.complianceScore >= 50 ? 'warning.main' : 'error.main' }}
                    >
                      {scan.complianceScore}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={chipCfg.label} color={chipCfg.color} size="small" />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </Typography>
                      <ArrowForwardIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        /* Desktop Table */
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scan ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredScans.map(scan => {
                const mfr = scan.extractedFields?.find(f => f.field === 'manufacturer')?.value || '—';
                const chipCfg = STATUS_CHIP[scan.overallStatus] || { label: scan.overallStatus, color: 'default' };
                return (
                  <TableRow key={scan.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/report/${scan.id}`)}>
                    <TableCell><Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{scan.id?.slice(0, 8)}...</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{scan.productName}</Typography>
                        {scan.isDemo && <Chip label="DEMO" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: '0.6rem' }} />}
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{mfr}</Typography></TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={800} color={scan.complianceScore >= 85 ? 'success.main' : scan.complianceScore >= 50 ? 'warning.main' : 'error.main'}>{scan.complianceScore}</Typography>
                    </TableCell>
                    <TableCell><Chip label={chipCfg.label} color={chipCfg.color} size="small" /></TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography></TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Report">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/report/${scan.id}`); }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
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
