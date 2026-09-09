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
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

const STATUS_CHIP = {
  COMPLIANT: {
    label: 'Compliant',
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.12)',
    border: 'rgba(22, 163, 74, 0.28)',
  },
  NEEDS_ATTENTION: {
    label: 'Needs Review',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.12)',
    border: 'rgba(217, 119, 6, 0.28)',
  },
  NON_COMPLIANT: {
    label: 'Non-Compliant',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.12)',
    border: 'rgba(220, 38, 38, 0.28)',
  },
};

// Premium Glassmorphism styling tokens
const glassCardSx = {
  bgcolor: 'rgba(255, 255, 255, 0.68)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255, 255, 255, 0.85)',
  borderRadius: 3.5,
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    bgcolor: 'rgba(255, 255, 255, 0.78)',
    boxShadow: '0 16px 40px rgba(37, 99, 235, 0.09), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(147, 197, 253, 0.6)',
  },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

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

  const filteredScans = useMemo(() => {
    if (statusFilter === 'ALL') return scans;
    return scans.filter(s => s.overallStatus === statusFilter);
  }, [scans, statusFilter]);

  const recentScans = filteredScans.slice(0, 10);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const statCards = [
    {
      label: 'Total products scanned',
      value: stats.total,
      icon: <AssignmentIcon sx={{ fontSize: 22 }} />,
      color: '#2563eb',
      lightBg: 'rgba(37, 99, 235, 0.12)',
      borderAccent: 'rgba(37, 99, 235, 0.3)',
      note: 'All-time activity',
      trend: `${stats.avgScore}% avg score`,
    },
    {
      label: 'Compliant products',
      value: stats.compliant,
      icon: <CheckCircleIcon sx={{ fontSize: 22 }} />,
      color: '#16a34a',
      lightBg: 'rgba(22, 163, 74, 0.12)',
      borderAccent: 'rgba(22, 163, 74, 0.3)',
      note: 'Ready for release',
      trend: stats.total > 0 ? `${Math.round((stats.compliant / stats.total) * 100)}% pass rate` : '0%',
    },
    {
      label: 'Pending review',
      value: stats.attention,
      icon: <WarningAmberIcon sx={{ fontSize: 22 }} />,
      color: '#d97706',
      lightBg: 'rgba(217, 119, 6, 0.12)',
      borderAccent: 'rgba(217, 119, 6, 0.3)',
      note: 'Needs inspector check',
      trend: 'Low confidence flags',
    },
    {
      label: 'Non-compliant',
      value: stats.nonCompliant,
      icon: <CancelIcon sx={{ fontSize: 22 }} />,
      color: '#dc2626',
      lightBg: 'rgba(220, 38, 38, 0.12)',
      borderAccent: 'rgba(220, 38, 38, 0.3)',
      note: 'Mandatory violations',
      trend: 'Action required',
    },
  ];

  if (loading) {
    return (
      <Box
        className="dashboard-theme"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 12px 32px rgba(37,99,235,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={38} thickness={4} sx={{ color: '#2563eb' }} />
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
            Loading compliance workspace...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="dashboard-theme"
      sx={{
        position: 'relative',
        minHeight: '100%',
        pb: 8,
        // Ambient glassmorphic illumination orbs behind panels
        '&:before': {
          content: '""',
          position: 'fixed',
          width: 520,
          height: 520,
          borderRadius: '50%',
          top: '5%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18), rgba(37, 99, 235, 0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&:after': {
          content: '""',
          position: 'fixed',
          width: 480,
          height: 480,
          borderRadius: '50%',
          bottom: '10%',
          left: '12%',
          background: 'radial-gradient(circle, rgba(125, 211, 199, 0.16), rgba(37, 99, 235, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        {/* Top Header Glass Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
            mb: 4,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <ShieldOutlinedIcon sx={{ fontSize: 16, color: '#2563eb' }} />
              <Typography
                variant="overline"
                sx={{
                  color: '#2563eb',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                }}
              >
                COMPLIANCE OPERATIONS
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              {getGreeting()}, Inspector
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#64748b', mt: 0.3 }}>
              Monitor, scan, and manage packaged commodity compliance in real time.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => navigate('/scan')}
              sx={{
                borderRadius: 99,
                px: 3.5,
                py: 1.3,
                bgcolor: '#12304a',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(18, 48, 74, 0.25)',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': {
                  bgcolor: '#0a1f31',
                  boxShadow: '0 12px 28px rgba(18, 48, 74, 0.35)',
                },
              }}
            >
              New scan
            </Button>
          </Box>
        </Box>

        {/* HERO BANNER - DEEP GLASSMORPHIC CARD */}
        <Card
          sx={{
            mb: 4,
            bgcolor: 'rgba(18, 48, 74, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            color: '#f8fafc',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: 4,
            border: '1px solid rgba(125, 211, 199, 0.35)',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
              <AutoAwesomeIcon sx={{ color: '#7dd3c7', fontSize: 18 }} />
              <Typography
                variant="overline"
                sx={{
                  color: '#b8e6df',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                }}
              >
                AI COMPLIANCE DESK
              </Typography>
            </Box>

            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                fontWeight: 800,
                maxWidth: 640,
                mb: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              A clear, intelligent view of every label decision.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(241, 245, 249, 0.82)',
                maxWidth: 640,
                lineHeight: 1.7,
                fontSize: '0.92rem',
              }}
            >
              Jarvis combines OCR field confidence, mandatory declaration checks, and Legal Metrology (Packaged Commodities) Rules, 2011 into an audit-ready compliance review.
            </Typography>

            <Box sx={{ mt: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<ShieldOutlinedIcon sx={{ color: '#7dd3c7 !important', fontSize: 16 }} />}
                label="LMR 2011 Engine Active"
                size="small"
                sx={{
                  bgcolor: 'rgba(125, 211, 199, 0.14)',
                  color: '#b8e6df',
                  border: '1px solid rgba(125, 211, 199, 0.3)',
                  backdropFilter: 'blur(8px)',
                  fontWeight: 700,
                }}
              />
              <Chip
                icon={<InsightsOutlinedIcon sx={{ color: '#38bdf8 !important', fontSize: 16 }} />}
                label="Real-time Audit Trail"
                size="small"
                sx={{
                  bgcolor: 'rgba(56, 189, 248, 0.14)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  backdropFilter: 'blur(8px)',
                  fontWeight: 700,
                }}
              />
            </Box>
          </CardContent>

          {/* Ambient glass light circles */}
          <Box
            sx={{
              position: 'absolute',
              right: -20,
              top: -60,
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25), transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 60,
              bottom: -90,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(125, 211, 199, 0.22), transparent 70%)',
              filter: 'blur(25px)',
              pointerEvents: 'none',
            }}
          />
        </Card>

        {/* GLASSMORPHIC STAT CARDS */}
        <Grid container spacing={2.5} sx={{ mb: 4.5 }}>
          {statCards.map(card => (
            <Grid item xs={12} sm={6} lg={3} key={card.label}>
              <Card sx={{ ...glassCardSx, height: '100%' }}>
                <CardContent sx={{ p: 2.8 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 2.5,
                        bgcolor: card.lightBg,
                        color: card.color,
                        border: `1.5px solid ${card.borderAccent}`,
                        boxShadow: `0 4px 14px ${card.lightBg}`,
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Chip
                      label="Live"
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        color: '#64748b',
                        bgcolor: 'rgba(241, 245, 249, 0.8)',
                        border: '1px solid rgba(203, 213, 225, 0.5)',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1,
                      color: '#0f172a',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1.2,
                      fontWeight: 700,
                      color: '#1e293b',
                      fontSize: '0.9rem',
                    }}
                  >
                    {card.label}
                  </Typography>

                  <Box
                    sx={{
                      mt: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.74rem' }}>
                      {card.note}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: card.color,
                        fontWeight: 800,
                        fontSize: '0.72rem',
                      }}
                    >
                      {card.trend}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* RECENT SCANS SECTION HEADER & GLASS FILTER BAR */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.01em',
              }}
            >
              Recent scans
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Latest compliance activity across your workspace
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {/* Status Filter Glass Pills */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                p: 0.5,
                borderRadius: 99,
                bgcolor: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              {['ALL', 'COMPLIANT', 'NEEDS_ATTENTION', 'NON_COMPLIANT'].map(filterKey => {
                const isSelected = statusFilter === filterKey;
                const label =
                  filterKey === 'ALL'
                    ? 'All'
                    : filterKey === 'COMPLIANT'
                    ? 'Compliant'
                    : filterKey === 'NEEDS_ATTENTION'
                    ? 'Review'
                    : 'Non-Compliant';

                return (
                  <Chip
                    key={filterKey}
                    label={label}
                    size="small"
                    onClick={() => setStatusFilter(filterKey)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '0.72rem',
                      height: 26,
                      color: isSelected ? '#ffffff' : '#475569',
                      bgcolor: isSelected ? '#2563eb' : 'transparent',
                      border: isSelected ? '1px solid #1d4ed8' : 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: isSelected ? '#1d4ed8' : 'rgba(241, 245, 249, 0.7)',
                      },
                    }}
                  />
                );
              })}
            </Box>

            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/history')}
              sx={{
                borderRadius: 99,
                px: 2,
                color: '#2563eb',
                fontWeight: 700,
                bgcolor: 'rgba(239, 246, 255, 0.7)',
                border: '1px solid rgba(191, 219, 254, 0.6)',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  bgcolor: 'rgba(219, 234, 254, 0.8)',
                },
              }}
            >
              View all
            </Button>
          </Box>
        </Box>

        {/* GLASS TABLE CONTAINER */}
        {recentScans.length === 0 ? (
          <Card
            sx={{
              ...glassCardSx,
              p: 6,
              textAlign: 'center',
            }}
          >
            <AssignmentIcon sx={{ fontSize: 52, color: '#94a3b8', mb: 2, opacity: 0.6 }} />
            <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 700 }}>
              {statusFilter === 'ALL' ? 'No scans yet' : 'No scans match this filter'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 3, maxWidth: 440, mx: 'auto' }}>
              {statusFilter === 'ALL'
                ? 'Scan a product label or launch an interactive demo to start viewing compliance insights.'
                : 'Try clearing the filter or scan another label to see results.'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => navigate('/scan')}
              sx={{
                borderRadius: 99,
                px: 3,
                py: 1,
                bgcolor: '#2563eb',
                fontWeight: 700,
              }}
            >
              Start a scan
            </Button>
          </Card>
        ) : (
          <TableContainer
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: 'rgba(241, 245, 249, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                  }}
                >
                  <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>PRODUCT</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>MANUFACTURER</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>COMPLIANCE SCORE</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>TIMESTAMP</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: '#475569', fontSize: '0.78rem', py: 1.8 }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentScans.map(scan => {
                  const mfr = scan.extractedFields?.find(f => f.field === 'manufacturer')?.value || '—';
                  const chipCfg = STATUS_CHIP[scan.overallStatus] || {
                    label: scan.overallStatus,
                    color: '#64748b',
                    bg: 'rgba(100, 116, 139, 0.1)',
                    border: 'rgba(100, 116, 139, 0.2)',
                  };

                  const score = scan.complianceScore ?? 0;
                  const scoreColor =
                    score >= 85 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';

                  return (
                    <TableRow
                      key={scan.id}
                      hover
                      onClick={() => navigate(`/report/${scan.id}`)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        borderBottom: '1px solid rgba(241, 245, 249, 0.8)',
                        '&:hover': {
                          bgcolor: 'rgba(239, 246, 255, 0.5) !important',
                        },
                      }}
                    >
                      <TableCell sx={{ py: 1.8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: '#0f172a',
                            }}
                          >
                            {scan.productName || 'Unnamed Product'}
                          </Typography>
                          {scan.isDemo && (
                            <Chip
                              label="DEMO"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                color: '#2563eb',
                                bgcolor: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.25)',
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>

                      <TableCell sx={{ py: 1.8 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            maxWidth: 220,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {mfr}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ py: 1.8 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 1.5,
                            py: 0.4,
                            borderRadius: 99,
                            bgcolor: `${scoreColor}14`,
                            border: `1px solid ${scoreColor}30`,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 900,
                              color: scoreColor,
                              fontSize: '0.85rem',
                            }}
                          >
                            {score}%
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ py: 1.8 }}>
                        <Chip
                          label={chipCfg.label}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            color: chipCfg.color,
                            bgcolor: chipCfg.bg,
                            border: `1px solid ${chipCfg.border}`,
                            backdropFilter: 'blur(6px)',
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ py: 1.8 }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                          {new Date(scan.timestamp).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ py: 1.8 }}>
                        <Tooltip title="Open full compliance report">
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/report/${scan.id}`);
                            }}
                            sx={{
                              bgcolor: 'rgba(241, 245, 249, 0.8)',
                              border: '1px solid rgba(203, 213, 225, 0.5)',
                              color: '#2563eb',
                              '&:hover': {
                                bgcolor: '#2563eb',
                                color: '#ffffff',
                              },
                            }}
                          >
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
    </Box>
  );
}
