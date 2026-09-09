import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

// Icons
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';

// Re-export the dedicated WorkflowSection
export { WorkflowSection } from './WorkflowSection';

// Shared design tokens
const eyebrowSx = {
  color: '#2563eb',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontSize: '0.74rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.8,
};

// ==========================================
// 0. NAVBAR
// ==========================================
export function LandingNav() {
  return (
    <Box component="nav" sx={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 20 }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, md: 4 },
            px: { xs: 2, md: 3 },
            py: 1.2,
            borderRadius: 99,
            bgcolor: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 10px 35px rgba(15, 23, 42, 0.05)',
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              color: '#0f172a',
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: '#0f172a',
                color: '#fff',
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(15,23,42,0.2)',
              }}
            >
              J
            </Box>
            <Typography sx={{ fontWeight: 900, letterSpacing: '0.08em', fontSize: '1.05rem', color: '#0f172a' }}>
              JARVIS
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, ml: 2 }}>
            {[
              { label: 'Problem', href: '#problem' },
              { label: 'How it works', href: '#how-it-works' },
              { label: 'AI Capabilities', href: '#ai-capabilities' },
              { label: 'Compliance Report', href: '#compliance-report' },
              { label: 'Use Cases', href: '#use-cases' },
            ].map(item => (
              <Typography
                key={item.label}
                component="a"
                href={item.href}
                sx={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#2563eb' },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
            <Button
              component={Link}
              to="/signin"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                color: '#475569',
                fontWeight: 600,
                px: 2,
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/scan"
              variant="contained"
              sx={{
                borderRadius: 99,
                bgcolor: '#2563eb',
                color: '#fff',
                px: { xs: 2.2, md: 3 },
                py: 0.9,
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              Scan a product
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// ==========================================
// 1. HERO SECTION
// ==========================================
export function Hero({ onDemo }) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 15, md: 20 },
        pb: { xs: 10, md: 16 },
        bgcolor: '#ffffff',
        backgroundImage: 'radial-gradient(ellipse at top, rgba(219, 234, 254, 0.45) 0%, rgba(248, 250, 252, 0.2) 60%, #ffffff 100%)',
      }}
    >
      {/* Background ambient lighting */}
      <Box
        sx={{
          position: 'absolute',
          width: 750,
          height: 750,
          borderRadius: '50%',
          top: -300,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22), rgba(37, 99, 235, 0.08) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 940, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: '#2563eb !important' }} />}
            label="AI Legal Metrology Compliance Platform"
            sx={{
              bgcolor: 'rgba(239, 246, 255, 0.9)',
              color: '#1d4ed8',
              fontWeight: 800,
              fontSize: '0.78rem',
              border: '1px solid #bfdbfe',
              px: 1.5,
              py: 2.2,
              borderRadius: 99,
              mb: 3,
              boxShadow: '0 4px 14px rgba(37,99,235,0.08)',
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '4.2rem', md: '5.4rem' },
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#0f172a',
              mb: 2.5,
            }}
          >
            Upload a product label.{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI checks legal compliance.
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              mx: 'auto',
              color: '#475569',
              fontSize: { xs: '1.05rem', md: '1.22rem' },
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            JARVIS transforms packaged commodity images into instant, audit-ready compliance analysis under the Legal Metrology (Packaged Commodities) Rules, 2011.
          </Typography>

          {/* CTAs */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/scan"
              variant="contained"
              size="large"
              startIcon={<CameraAltOutlinedIcon />}
              sx={{
                borderRadius: 99,
                px: 4,
                py: 1.6,
                bgcolor: '#2563eb',
                fontSize: '1rem',
                fontWeight: 800,
                boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)',
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              Scan a Product
            </Button>

            <Button
              href="#demo"
              variant="outlined"
              size="large"
              startIcon={<PlayArrowRoundedIcon />}
              sx={{
                borderRadius: 99,
                px: 3.5,
                py: 1.6,
                borderColor: '#cbd5e1',
                color: '#0f172a',
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                fontSize: '1rem',
                fontWeight: 700,
                '&:hover': {
                  borderColor: '#94a3b8',
                  bgcolor: '#ffffff',
                },
              }}
            >
              View Demo
            </Button>
          </Stack>
        </Box>

        {/* REALISTIC DASHBOARD PREVIEW WITH FLOATING CALLOUT CARDS */}
        <Box sx={{ maxWidth: 1040, mx: 'auto', position: 'relative', px: { xs: 1, md: 4 } }}>
          {/* Main Dashboard Canvas Mockup */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 3, md: 5 },
              p: { xs: 2, md: 3.5 },
              bgcolor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 25px 70px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.8) inset',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top Mock Window Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 2.5,
                borderBottom: '1px solid #f1f5f9',
                mb: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fca5a5' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#fde68a' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#86efac' }} />
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  JARVIS Inspector Console • Singla's Multigrain Cookies
                </Typography>
              </Box>

              <Chip
                label="ANALYSIS COMPLETE"
                size="small"
                sx={{
                  bgcolor: 'rgba(22, 163, 74, 0.1)',
                  color: '#16a34a',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  border: '1px solid rgba(22, 163, 74, 0.25)',
                }}
              />
            </Box>

            {/* Mock Dashboard Grid Data */}
            <Grid container spacing={2}>
              {[
                { label: 'MRP (Inclusive of taxes)', val: '₹50.00', status: 'Compliant', color: '#16a34a' },
                { label: 'Net Quantity Unit', val: '200g (LMR rule met)', status: 'Compliant', color: '#16a34a' },
                { label: 'Manufacturer Details', val: 'Detected on back panel', status: 'Verified', color: '#16a34a' },
                { label: 'Unit Sale Price', val: 'Needs human review', status: 'Warning', color: '#d97706' },
              ].map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.label}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.8, fontWeight: 800, color: '#0f172a' }}>
                      {item.val}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="caption" sx={{ color: item.color, fontWeight: 800 }}>
                        {item.status}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Score & Alert Strip */}
            <Box
              sx={{
                mt: 2.5,
                p: 2.2,
                borderRadius: 3,
                bgcolor: '#eff6ff',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    bgcolor: '#2563eb',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    boxShadow: '0 6px 16px rgba(37,99,235,0.3)',
                  }}
                >
                  72%
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e3a8a' }}>
                    Compliance Score: 72% • 6 Required Declarations Checked
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    1 item flagged for manual review • Ready for official inspector audit
                  </Typography>
                </Box>
              </Box>

              <Button
                component={Link}
                to="/scan"
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 99,
                  bgcolor: '#0f172a',
                  color: '#fff',
                  px: 2.5,
                  '&:hover': { bgcolor: '#1e293b' },
                }}
              >
                Inspect scan
              </Button>
            </Box>
          </Paper>

          {/* Floating UI Element 1 - Top Left: Missing Declaration */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: { xs: 20, md: -25 },
              left: { xs: 0, md: -30 },
              zIndex: 4,
              p: 1.6,
              px: 2.2,
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #fecaca',
              boxShadow: '0 15px 35px rgba(220, 38, 38, 0.12)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ color: '#dc2626', fontSize: 20 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#991b1b', display: 'block' }}>
                Missing declaration detected
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                Rule 6(1)(f): Consumer care details
              </Typography>
            </Box>
          </Paper>

          {/* Floating UI Element 2 - Top Right: AI Analysis Complete */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: { xs: 40, md: -20 },
              right: { xs: 0, md: -25 },
              zIndex: 4,
              p: 1.6,
              px: 2.2,
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #bfdbfe',
              boxShadow: '0 15px 35px rgba(37, 99, 235, 0.14)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ color: '#2563eb', fontSize: 20 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#1e3a8a', display: 'block' }}>
                AI analysis complete
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                OCR confidence score: 98.4%
              </Typography>
            </Box>
          </Paper>

          {/* Floating UI Element 3 - Bottom Left: LMR Validation */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              bottom: { xs: 10, md: -25 },
              left: { xs: 10, md: 30 },
              zIndex: 4,
              p: 1.4,
              px: 2,
              borderRadius: 3,
              bgcolor: '#0f172a',
              boxShadow: '0 18px 40px rgba(15, 23, 42, 0.25)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <PolicyOutlinedIcon sx={{ color: '#38bdf8', fontSize: 20 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#ffffff', display: 'block' }}>
                LMR 2011 validation active
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                Rule 6, 7 & 8 definitions matched
              </Typography>
            </Box>
          </Paper>

          {/* Floating UI Element 4 - Bottom Right: Compliance Score */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              bottom: { xs: 10, md: -25 },
              right: { xs: 10, md: 40 },
              zIndex: 4,
              p: 1.4,
              px: 2,
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #bbf7d0',
              boxShadow: '0 15px 35px rgba(22, 163, 74, 0.14)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <VerifiedRoundedIcon sx={{ color: '#16a34a', fontSize: 20 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#166534', display: 'block' }}>
                Compliance score 72%
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                Ready for official report generation
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

// ==========================================
// 2. PROBLEM SECTION (Visual Storytelling)
// ==========================================
export function ProblemSection() {
  const problems = [
    { title: 'Manual label inspection', desc: 'Checking hundreds of packaging lines by hand drains inspection teams.' },
    { title: 'Human errors', desc: 'Font sizes, net weights, and manufacturer clauses are easily overlooked.' },
    { title: 'Complex regulations', desc: 'Legal Metrology Rules 2011 mandate multiple strict packaging declarations.' },
    { title: 'Delayed approvals', desc: 'Packaging backlogs stall new product launches and risk costly recalls.' },
  ];

  return (
    <Box id="problem" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#f8fafc', position: 'relative' }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left: Heading + Vertical Timeline */}
          <Grid item xs={12} md={6}>
            <Typography sx={eyebrowSx}>THE PROBLEM WITH MANUAL AUDITS</Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1.5,
                fontSize: { xs: '2.2rem', md: '3.4rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#0f172a',
                letterSpacing: '-0.03em',
              }}
            >
              Product label compliance shouldn't be manual.
            </Typography>

            <Typography sx={{ mt: 2.2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.75 }}>
              Packaged commodity labels carry strict statutory declarations. Manual verification is slow, subjective, and leaves brands vulnerable to legal sanctions.
            </Typography>

            {/* Vertical Flow Timeline */}
            <Box sx={{ mt: 5, position: 'relative', pl: 3.5 }}>
              {/* Connecting Line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 11,
                  top: 10,
                  bottom: 10,
                  width: 2,
                  bgcolor: '#e2e8f0',
                  background: 'linear-gradient(180deg, #ef4444 0%, #f59e0b 50%, #2563eb 100%)',
                }}
              />

              <Stack spacing={3.5}>
                {problems.map((prob, i) => (
                  <Box key={prob.title} sx={{ position: 'relative' }}>
                    {/* Timeline Node Dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -33,
                        top: 2,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : i === 2 ? '#3b82f6' : '#2563eb',
                        border: '3px solid #ffffff',
                        boxShadow: '0 0 0 2px rgba(15,23,42,0.1)',
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {prob.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.4, lineHeight: 1.6 }}>
                      {prob.desc}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right: Label Inspection Visualization with Missing Information Highlights */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 4,
                bgcolor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  PACKAGE LABEL AUDIT • RETICLE VIEW
                </Typography>
                <Chip label="NON-COMPLIANT" size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800 }} />
              </Box>

              {/* Mock Product Packaging Preview */}
              <Box
                sx={{
                  height: 320,
                  borderRadius: 3,
                  bgcolor: '#f1f5f9',
                  border: '1px dashed #cbd5e1',
                  position: 'relative',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Brand Name & Barcode */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>
                      GLOWFRESH ENERGY DRINK
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Batch: 2026-X • Net Vol: 250ml
                    </Typography>
                  </Box>
                  <Box sx={{ width: 60, height: 26, bgcolor: '#cbd5e1', borderRadius: 1 }} />
                </Box>

                {/* Highlight Overlay 1: Missing Consumer Care Box */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 20,
                    top: 80,
                    border: '2px solid #ef4444',
                    borderRadius: 2,
                    p: 1,
                    bgcolor: 'rgba(254, 226, 226, 0.5)',
                    animation: 'pulseAlert 2.5s infinite',
                    '@keyframes pulseAlert': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.6 },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CancelOutlinedIcon sx={{ color: '#dc2626', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#dc2626' }}>
                      MISSING: Consumer Care
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#991b1b', fontSize: '0.66rem', display: 'block' }}>
                    Rule 6(1)(f) Mandate absent
                  </Typography>
                </Box>

                {/* Highlight Overlay 2: Unit Sale Price Warning */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 25,
                    bottom: 80,
                    border: '2px solid #f59e0b',
                    borderRadius: 2,
                    p: 1,
                    bgcolor: 'rgba(254, 243, 199, 0.6)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WarningAmberRoundedIcon sx={{ color: '#d97706', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#d97706' }}>
                      WARNING: Unit Sale Price
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#92400e', fontSize: '0.66rem', display: 'block' }}>
                    Font height below minimum standard
                  </Typography>
                </Box>

                {/* Bottom Declarations */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#475569', display: 'block', fontWeight: 700 }}>
                      MRP ₹40.00 (Incl. of all taxes)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.66rem' }}>
                      Mfg Date: 02/2026 • Best Before 6 Mos
                    </Typography>
                  </Box>
                  <Chip
                    label="2 Violations Detected"
                    size="small"
                    sx={{ bgcolor: '#dc2626', color: '#fff', fontWeight: 800 }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 4. AI CAPABILITIES SECTION (Split Showcase)
// ==========================================
export function AiSection() {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      title: 'AI-Powered OCR',
      desc: 'Extract declarations, measurements, ingredients, and manufacturer clauses automatically with Google Vision OCR.',
      icon: <DocumentScannerOutlinedIcon sx={{ fontSize: 24 }} />,
      tag: 'Multi-Script Support',
      tokens: [
        { label: 'MRP Tag', val: '₹120.00', status: 'Extracted' },
        { label: 'Net Weight', val: '500g', status: 'Valid Unit' },
        { label: 'Batch No', val: 'B48-X', status: 'Detected' },
      ],
    },
    {
      title: 'Legal Rule Validation',
      desc: 'Validate packaging fields against the Legal Metrology (Packaged Commodities) Rules, 2011 with deterministic rules.',
      icon: <PolicyOutlinedIcon sx={{ fontSize: 24 }} />,
      tag: 'Statutory Engine',
      tokens: [
        { label: 'Rule 6(1)(a)', val: 'Common Name verified', status: 'Pass' },
        { label: 'Rule 6(1)(d)', val: 'Metric Unit matched', status: 'Pass' },
        { label: 'Rule 6(1)(e)', val: 'All-inclusive MRP', status: 'Pass' },
      ],
    },
    {
      title: 'Missing Information Detection',
      desc: 'Instantly pinpoint statutory declarations omitted from the product artwork before batches reach consumer shelves.',
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 24 }} />,
      tag: 'Defect Prevention',
      tokens: [
        { label: 'Consumer Care', val: 'Contact email missing', status: 'Violation' },
        { label: 'Country of Origin', val: 'Present on front', status: 'Pass' },
        { label: 'Veg/Non-Veg Logo', val: 'Detected on rear', status: 'Pass' },
      ],
    },
    {
      title: 'AI Explanation',
      desc: 'Plain-language statutory summaries explain why a declaration failed and cite the exact rule sub-clause for remediation.',
      icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 24 }} />,
      tag: 'Audit Intelligence',
      tokens: [
        { label: 'Clause 6(1)(f)', val: 'Requires phone & email', status: 'Remediation' },
        { label: 'Table I Schedule', val: 'Font height requirement', status: 'Action Item' },
        { label: 'Inspector Memo', val: 'Generated automatically', status: 'Ready' },
      ],
    },
  ];

  const cur = capabilities[activeTab];

  return (
    <Box id="ai-capabilities" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff', position: 'relative' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
          <Typography sx={eyebrowSx}>AI CAPABILITIES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Compliance intelligence, powered by Vision AI.
          </Typography>
          <Typography sx={{ mt: 2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Jarvis goes beyond raw OCR. It pairs computer vision with statutory logic to deliver legal audit conclusions in seconds.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left: Interactive AI Dashboard Preview */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: '#0f172a',
                color: '#fff',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Laser scanning beam line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)',
                  boxShadow: '0 0 15px #38bdf8',
                  animation: 'laserScan 3s ease-in-out infinite',
                  '@keyframes laserScan': {
                    '0%, 100%': { transform: 'translateY(10px)' },
                    '50%': { transform: 'translateY(220px)' },
                  },
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MemoryRoundedIcon sx={{ color: '#38bdf8' }} />
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#38bdf8' }}>
                    JARVIS VISION ENGINE
                  </Typography>
                </Box>
                <Chip label={cur.tag} size="small" sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc', fontWeight: 800 }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', mb: 1 }}>
                {cur.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3.5, lineHeight: 1.6 }}>
                {cur.desc}
              </Typography>

              {/* Dynamic extracted tokens preview */}
              <Stack spacing={1.2}>
                {cur.tokens.map((token, i) => (
                  <Box
                    key={token.label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.4,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(30, 41, 59, 0.7)',
                      border: '1px solid rgba(56, 189, 248, 0.18)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 800, fontFamily: 'monospace' }}>
                        {token.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                        {token.val}
                      </Typography>
                    </Box>
                    <Chip
                      label={token.status}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        bgcolor:
                          token.status === 'Pass' || token.status === 'Extracted' || token.status === 'Valid Unit'
                            ? 'rgba(74, 222, 128, 0.15)'
                            : token.status === 'Violation'
                            ? 'rgba(239, 68, 68, 0.18)'
                            : 'rgba(56, 189, 248, 0.18)',
                        color:
                          token.status === 'Pass' || token.status === 'Extracted' || token.status === 'Valid Unit'
                            ? '#4ade80'
                            : token.status === 'Violation'
                            ? '#f87171'
                            : '#38bdf8',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right: Interactive Feature List with Hover Highlights */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              {capabilities.map((cap, index) => {
                const isSelected = activeTab === index;
                return (
                  <Paper
                    key={cap.title}
                    elevation={0}
                    onMouseEnter={() => setActiveTab(index)}
                    sx={{
                      p: 2.8,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      bgcolor: isSelected ? '#f0f7ff' : '#ffffff',
                      border: isSelected ? '1.5px solid #93c5fd' : '1px solid #e2e8f0',
                      boxShadow: isSelected ? '0 10px 30px rgba(37, 99, 235, 0.08)' : 'none',
                      transform: isSelected ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: isSelected ? '#2563eb' : '#f1f5f9',
                          color: isSelected ? '#ffffff' : '#2563eb',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {cap.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {cap.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.3, lineHeight: 1.6 }}>
                          {cap.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 5. COMPLIANCE REPORT SECTION (Dark Navy Contrast)
// ==========================================
export function ImpactSection() {
  return (
    <Box
      id="compliance-report"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: '#0b1528',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          top: -100,
          right: -100,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={5}>
            <Chip
              label="AUDIT-READY DOCUMENTATION"
              size="small"
              sx={{
                bgcolor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                fontWeight: 800,
                border: '1px solid rgba(56, 189, 248, 0.3)',
                mb: 2.5,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.3rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              From product image to compliance decision.
            </Typography>

            <Typography sx={{ mt: 2.5, color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75 }}>
              JARVIS compiles extracted declarations, Legal Metrology validation rules, missing mandatory clauses, and confidence flags into a full downloadable PDF and JSON compliance dossier.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button
                component={Link}
                to="/scan"
                variant="contained"
                size="large"
                startIcon={<CameraAltOutlinedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 3.5,
                  py: 1.4,
                  bgcolor: '#2563eb',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
                  '&:hover': { bgcolor: '#1d4ed8' },
                }}
              >
                Start a Scan
              </Button>

              <Button
                href="#demo"
                variant="outlined"
                size="large"
                startIcon={<DownloadRoundedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  py: 1.4,
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: '#ffffff',
                    bgcolor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                View Sample Report
              </Button>
            </Stack>
          </Grid>

          {/* Right: Floating Report Card Preview */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4.5 },
                borderRadius: 4,
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative',
              }}
            >
              {/* Header inside Report Card */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2.5, borderBottom: '1px solid rgba(255,255,255,0.1)', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#2563eb', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900 }}>
                    J
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                      Singla's Multigrain Cookies
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      Report ID: #REP-2026-8942 • Packaged Food
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="STATUS: NEEDS ATTENTION"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(245, 158, 11, 0.16)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    fontWeight: 800,
                  }}
                />
              </Box>

              {/* Big 4 Stat Grid */}
              <Grid container spacing={2} sx={{ mb: 3.5 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Compliance Score
                    </Typography>
                    <Typography sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1.2 }}>
                      72%
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Missing Declarations
                    </Typography>
                    <Typography sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#f87171', lineHeight: 1.2 }}>
                      6
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Manual Review
                    </Typography>
                    <Typography sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#fbbf24', lineHeight: 1.2 }}>
                      1
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Verified Passed
                    </Typography>
                    <Typography sx={{ fontSize: '2.1rem', fontWeight: 900, color: '#4ade80', lineHeight: 1.2 }}>
                      8
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Sample Rules Breakdown List inside Card */}
              <Stack spacing={1}>
                {[
                  { name: 'Rule 6(1)(a) Generic Product Name', status: 'COMPLIANT', color: '#4ade80' },
                  { name: 'Rule 6(1)(d) Net Quantity Statement', status: 'COMPLIANT', color: '#4ade80' },
                  { name: 'Rule 6(1)(f) Customer Care Contact Details', status: 'MISSING MANDATORY', color: '#f87171' },
                ].map(r => (
                  <Box
                    key={r.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.2,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(30, 41, 59, 0.5)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
                      {r.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: r.color, fontWeight: 800 }}>
                      {r.status}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 6. KEY FEATURES SECTION (Bento Grid)
// ==========================================
export function FeaturesSection() {
  return (
    <Box id="features" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
          <Typography sx={eyebrowSx}>PRODUCT CAPABILITIES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Built for faster, smarter compliance.
          </Typography>
          <Typography sx={{ mt: 2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every tool required to audit, verify, and document packaged commodities without manual guesswork.
          </Typography>
        </Box>

        {/* BENTO GRID (Variable Sized Cards) */}
        <Grid container spacing={3}>
          {/* Card 1: Large Bento Card (8 Cols) - AI-Powered Product Analysis */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4.5 },
                height: '100%',
                borderRadius: 4,
                bgcolor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)',
                  borderColor: '#93c5fd',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2.5 }}>
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>
                  AI-Powered Product Analysis
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.2, color: '#64748b', lineHeight: 1.7, maxWidth: 580 }}>
                  Automatically extracts multi-lingual declarations, verifies net quantities, detects dates, and correlates statutory packaging rules with zero manual entry.
                </Typography>
              </Box>

              {/* Mini visual mockup inside Large Card */}
              <Box sx={{ mt: 4, p: 2, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #e2e8f0', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#16a34a' }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Multi-lingual OCR Engine Ready
                  </Typography>
                </Box>
                <Chip label="99.2% Accuracy" size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 800 }} />
              </Box>
            </Paper>
          </Grid>

          {/* Card 2: Medium Bento Card (4 Cols) - Instant OCR Extraction */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)',
                  borderColor: '#93c5fd',
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <DocumentScannerOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                Instant OCR Extraction
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.65 }}>
                Parses curved, glossy, low-light, and rotated label text with sub-second response times.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 3: Medium Bento Card (4 Cols) - LMR 2011 Validation */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)',
                  borderColor: '#93c5fd',
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <GavelOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                LMR 2011 Validation
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.65 }}>
                Maps label declarations against statutory Indian Legal Metrology Packaged Commodities rules.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 4: Wide Bento Card (5 Cols) - Detailed Downloadable Compliance Reports */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)',
                  borderColor: '#93c5fd',
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <DownloadRoundedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                Detailed Downloadable Reports
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.65 }}>
                Export audit-ready PDF records with visual stamp of compliance, rule citations, and high-res label crops.
              </Typography>
            </Paper>
          </Grid>

          {/* Card 5: Small Bento Card (3 Cols) - Manual Review Detection */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)',
                  borderColor: '#93c5fd',
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <InsightsOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                Manual Review Detection
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.65 }}>
                Automatically routes borderline confidence detections to human review.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 7. USE CASES SECTION (Horizontal Scroll Showcase)
// ==========================================
export function UseCasesSection() {
  const industries = [
    { title: 'Food & Beverages', icon: <Inventory2OutlinedIcon sx={{ fontSize: 28 }} />, desc: 'Nutritional declarations, allergen warnings, FSSAI logo, and net weight verification.', tag: 'FSSAI + LMR' },
    { title: 'Cosmetics & Skincare', icon: <SpaOutlinedIcon sx={{ fontSize: 28 }} />, desc: 'Batch coding, manufacturer address, ingredient list, and expiration date checks.', tag: 'Drugs & Cosmetics' },
    { title: 'Consumer Electronics', icon: <DevicesOtherOutlinedIcon sx={{ fontSize: 28 }} />, desc: 'Importer declarations, country of origin, model number, and consumer helpline tags.', tag: 'E-Waste + LMR' },
    { title: 'Packaged Goods (FMCG)', icon: <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />, desc: 'Standard pack sizes under Second Schedule and multi-unit package auditing.', tag: 'FMCG Wholesale' },
    { title: 'Retail & E-Commerce', icon: <StorefrontOutlinedIcon sx={{ fontSize: 28 }} />, desc: 'Pre-market catalogue verification for Amazon, Flipkart, Blinkit, and quick-commerce.', tag: 'Marketplaces' },
  ];

  return (
    <Box id="use-cases" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#f8fafc', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 7 } }}>
          <Typography sx={eyebrowSx}>INDUSTRIES & USE CASES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Engineered for every packaging category.
          </Typography>
          <Typography sx={{ mt: 2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Whether you are auditing retail shelves or onboarding thousands of marketplace SKUs, JARVIS adapts to statutory requirements.
          </Typography>
        </Box>

        {/* Horizontal Card Row */}
        <Grid container spacing={2.5}>
          {industries.map(item => (
            <Grid item xs={12} sm={6} md={2.4} key={item.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3.5,
                  bgcolor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 36px rgba(37, 99, 235, 0.1)',
                    borderColor: '#2563eb',
                  },
                }}
              >
                <Box>
                  <Box sx={{ width: 50, height: 50, borderRadius: 2.5, bgcolor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.6, fontSize: '0.86rem' }}>
                    {item.desc}
                  </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Chip label={item.tag} size="small" sx={{ fontSize: '0.66rem', fontWeight: 800, bgcolor: '#f1f5f9', color: '#475569' }} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 8. TECHNOLOGY SECTION (Connected Visual Diagram)
// ==========================================
export function TechnologySection() {
  const nodes = [
    { title: 'AI Vision', sub: 'Multi-angle image preprocessing and contrast leveling', tech: 'OpenCV + Vision AI' },
    { title: 'OCR Processing', sub: 'High-speed character recognition for packaging fonts', tech: 'Google Vision OCR' },
    { title: 'Rule Validation', sub: 'Deterministic verification against LMR 2011 clauses', tech: 'Rule Engine' },
    { title: 'Legal Metrology Intel', sub: 'Audit-ready scoring, violation explanations & reports', tech: 'Compliance Intelligence' },
  ];

  return (
    <Box id="technology" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 6, md: 9 } }}>
          <Typography sx={{ ...eyebrowSx, justifyContent: 'center' }}>TECHNOLOGY & ARCHITECTURE</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Built on a deterministic legal pipeline.
          </Typography>
          <Typography sx={{ mt: 2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A transparent four-stage pipeline ensuring zero hallucination on statutory legal decisions.
          </Typography>
        </Box>

        {/* CONNECTED ARCHITECTURE DIAGRAM */}
        <Box sx={{ position: 'relative' }}>
          {/* Connection rail behind nodes */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: 2,
              bgcolor: '#bfdbfe',
              background: 'linear-gradient(90deg, #bfdbfe, #2563eb, #bfdbfe)',
              zIndex: 0,
            }}
          />

          <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            {nodes.map((node, i) => (
              <Grid item xs={12} sm={6} md={3} key={node.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3.5,
                    bgcolor: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    textAlign: 'center',
                    boxShadow: '0 8px 25px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: '#2563eb',
                      boxShadow: '0 14px 35px rgba(37, 99, 235, 0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: '#2563eb',
                      color: '#ffffff',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 900,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    0{i + 1}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.08rem' }}>
                    {node.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.8, color: '#64748b', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    {node.sub}
                  </Typography>
                  <Chip
                    label={node.tech}
                    size="small"
                    sx={{ mt: 2.2, fontWeight: 700, fontSize: '0.64rem', bgcolor: '#eff6ff', color: '#1d4ed8' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// ==========================================
// INTERACTIVE DEMO SECTION (Preserving Demo Handling)
// ==========================================
export function DemoSection({ onDemo }) {
  const products = [
    { id: 'demo-a', name: "Sunrise Premium Basmati Rice", category: 'Food product', score: '92%', status: 'Mostly compliant', color: '#16a34a' },
    { id: 'demo-b', name: 'GlowFresh Hydrating Face Wash', category: 'Cosmetic', score: '68%', status: 'Needs attention', color: '#f59e0b' },
    { id: 'demo-c', name: 'QuickBite Instant Noodles', category: 'Food product', score: '41%', status: 'Non-compliant', color: '#dc2626' },
  ];

  return (
    <Box id="demo" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#f8fafc' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Typography sx={{ ...eyebrowSx, justifyContent: 'center' }}>INTERACTIVE DEMOS</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.4rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            Explore pre-loaded compliance scans.
          </Typography>
          <Typography sx={{ mt: 2, color: '#64748b', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Click any demo product below to test drive the complete inspector report interface without uploading an image.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {products.map(p => (
            <Grid item xs={12} md={4} key={p.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 18px 45px rgba(37, 99, 235, 0.1)',
                    borderColor: '#93c5fd',
                  },
                }}
              >
                <Box>
                  <Chip label="DEMO PRODUCT" size="small" sx={{ color: '#2563eb', bgcolor: '#eff6ff', fontWeight: 800 }} />
                  <Typography variant="h6" sx={{ mt: 2, color: '#0f172a', fontWeight: 800 }}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: '#64748b' }}>
                    {p.category}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 2.5 }}>
                    <Typography sx={{ fontSize: '2.2rem', fontWeight: 900, color: p.color, lineHeight: 1 }}>
                      {p.score}
                    </Typography>
                    <Typography variant="body2" sx={{ color: p.color, fontWeight: 800 }}>
                      {p.status}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={() => onDemo && onDemo(p.id)}
                  sx={{
                    mt: 3,
                    borderRadius: 99,
                    fontWeight: 700,
                    py: 1.2,
                    borderColor: '#cbd5e1',
                    color: '#0f172a',
                    '&:hover': {
                      bgcolor: '#2563eb',
                      color: '#ffffff',
                      borderColor: '#2563eb',
                    },
                  }}
                >
                  Open demo report
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 9. FINAL CTA SECTION
// ==========================================
export function FinalCta() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff', position: 'relative' }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 4, md: 6 },
            p: { xs: 5, md: 9 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#0f172a',
            color: '#ffffff',
            boxShadow: '0 30px 80px rgba(15, 23, 42, 0.25)',
          }}
        >
          {/* Ambient Glows */}
          <Box
            sx={{
              position: 'absolute',
              width: 500,
              height: 500,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35), rgba(56, 189, 248, 0.1) 60%, transparent 80%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 740, mx: 'auto' }}>
            <Chip
              label="START INSTANT AUDIT"
              size="small"
              sx={{
                bgcolor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                fontWeight: 800,
                border: '1px solid rgba(56, 189, 248, 0.3)',
                mb: 2.5,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.4rem' },
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              Make product compliance intelligent.
            </Typography>

            <Typography sx={{ mt: 2.5, color: '#94a3b8', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.7 }}>
              Upload a label and let AI identify potential compliance issues in seconds.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4.5 }}
            >
              <Button
                component={Link}
                to="/scan"
                variant="contained"
                size="large"
                startIcon={<CameraAltOutlinedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 4.5,
                  py: 1.8,
                  bgcolor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.5)',
                  '&:hover': { bgcolor: '#1d4ed8' },
                }}
              >
                Start Scanning Products
              </Button>

              <Button
                component={Link}
                to="/dashboard"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 99,
                  px: 4,
                  py: 1.8,
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: '#ffffff',
                    bgcolor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                Open Dashboard
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// ==========================================
// 10. LANDING FOOTER
// ==========================================
export function LandingFooter() {
  return (
    <Box sx={{ bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0', pt: 7, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, display: 'grid', placeItems: 'center', bgcolor: '#0f172a', color: '#fff', fontWeight: 900 }}>
                J
              </Box>
              <Typography sx={{ fontWeight: 900, letterSpacing: '.08em', color: '#0f172a', fontSize: '1.1rem' }}>
                JARVIS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1.8, color: '#64748b', maxWidth: 360, lineHeight: 1.65 }}>
              AI-Powered Legal Metrology (Packaged Commodities) Rules, 2011 compliance verification platform.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: '#0f172a' }}>
              PRODUCT
            </Typography>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <Typography component="a" href="#problem" variant="body2" sx={{ color: '#64748b', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Problem
              </Typography>
              <Typography component="a" href="#how-it-works" variant="body2" sx={{ color: '#64748b', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                How it works
              </Typography>
              <Typography component="a" href="#ai-capabilities" variant="body2" sx={{ color: '#64748b', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                AI Capabilities
              </Typography>
              <Typography component="a" href="#features" variant="body2" sx={{ color: '#64748b', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Key Features
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: '#0f172a' }}>
              RESOURCES
            </Typography>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Legal Metrology Rules 2011
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Rule 6 Mandatory Declarations
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Second Schedule Standards
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: '#0f172a' }}>
              WORKSPACE
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#64748b', lineHeight: 1.65 }}>
              Built for manufacturers, retailers, packagers, and Legal Metrology regulatory inspectors.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            © 2026 JARVIS. Built for Smart India Hackathon 2026.
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Legal Metrology (Packaged Commodities) Rules, 2011 Compliant
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
