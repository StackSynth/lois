import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScans } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const STATUS_CHIP = {
  COMPLIANT: { label: 'Compliant', color: 'success' },
  NEEDS_ATTENTION: { label: 'Needs Review', color: 'warning' },
  NON_COMPLIANT: { label: 'Non-Compliant', color: 'error' },
};

export default function ScanHistoryPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(0); // 0=All, 1=Compliant, 2=Review, 3=Non-Compliant

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

  const filteredScans = useMemo(() => {
    let results = scans;

    // Search
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(s => {
        const name = (s.productName || '').toLowerCase();
        const mfr = (s.extractedFields?.find(f => f.field === 'manufacturer')?.value || '').toLowerCase();
        return name.includes(q) || mfr.includes(q);
      });
    }

    // Tab filter
    if (tab === 1) results = results.filter(s => s.overallStatus === 'COMPLIANT');
    else if (tab === 2) results = results.filter(s => s.overallStatus === 'NEEDS_ATTENTION');
    else if (tab === 3) results = results.filter(s => s.overallStatus === 'NON_COMPLIANT');

    return results;
  }, [scans, search, tab]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <HistoryIcon color="primary" sx={{ fontSize: { xs: 26, md: 32 } }} />
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>Scan History</Typography>
      </Box>
      <Typography variant={isMobile ? 'body2' : 'subtitle1'} sx={{ mb: 3 }}>Browse and filter all past compliance scans</Typography>

      {/* Tabs — scrollable on mobile */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : false}
        allowScrollButtonsMobile
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={`All (${scans.length})`} />
        <Tab label={`Compliant (${scans.filter(s => s.overallStatus === 'COMPLIANT').length})`} />
        <Tab label={`Review (${scans.filter(s => s.overallStatus === 'NEEDS_ATTENTION').length})`} />
        <Tab label={`Non-Comp. (${scans.filter(s => s.overallStatus === 'NON_COMPLIANT').length})`} />
      </Tabs>

      {/* Search */}
      <TextField
        placeholder="Search by product name or manufacturer..."
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
      />

      {/* Content */}
      {filteredScans.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: { xs: 5, md: 8 } }}>
            <HistoryIcon sx={{ fontSize: { xs: 40, md: 56 }, color: 'text.secondary', mb: 2, opacity: 0.4 }} />
            <Typography variant="h6" color="text.secondary">{scans.length === 0 ? 'No scan history' : 'No matching scans'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {scans.length === 0 ? 'Scan a product label or try a demo to build your history.' : 'Try adjusting your search or filter.'}
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
                      <Typography variant="body2" fontWeight={700} noWrap>{scan.productName}</Typography>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={chipCfg.label} color={chipCfg.color} size="small" />
                      {scan.isDemo && <Chip label="DEMO" size="small" color="warning" variant="outlined" sx={{ height: 18, fontSize: '0.55rem' }} />}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </Typography>
                      {scan.pdfData && (
                        <IconButton
                          size="small"
                          component="a"
                          href={scan.pdfData}
                          download={`Jarvis_Compliance_Report_${scan.productName || 'Product'}.pdf`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      )}
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
                <TableCell>Product</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
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
                    <TableCell><Typography variant="body2" fontWeight={600}>{scan.productName}</Typography></TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{mfr}</Typography></TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={800} color={scan.complianceScore >= 85 ? 'success.main' : scan.complianceScore >= 50 ? 'warning.main' : 'error.main'}>{scan.complianceScore}</Typography>
                    </TableCell>
                    <TableCell><Chip label={chipCfg.label} color={chipCfg.color} size="small" /></TableCell>
                    <TableCell>{scan.isDemo && <Chip label="DEMO" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: '0.6rem' }} />}</TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography></TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Report">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/report/${scan.id}`); }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {scan.pdfData && (
                        <Tooltip title="Download PDF">
                          <IconButton size="small" component="a" href={scan.pdfData} download={`Jarvis_Compliance_Report_${scan.productName || 'Product'}.pdf`} onClick={(e) => e.stopPropagation()}>
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
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
