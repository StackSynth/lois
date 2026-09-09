import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

// Icons
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
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
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

// Re-export dedicated WorkflowSection
export { WorkflowSection } from './WorkflowSection';

// Cohesive enterprise design tokens
// Primary: Dark Navy #0a0f1e, Accent: Mint/Teal #0d9488 / #14b8a6, Neutral: #ffffff / #f8fafc / #e2e8f0
const palette = {
  primary: '#0a0f1e',
  accent: '#0d9488',
  accentLight: '#14b8a6',
  accentMint: '#2dd4bf',
  accentBg: '#f0fdfa',
  accentBorder: '#ccfbf1',
  textPrimary: '#0a0f1e',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  surface: '#ffffff',
  surfaceSubtle: '#f8fafc',
};

const eyebrowSx = {
  color: palette.accent,
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontSize: '0.74rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.8,
};

// ==========================================
// 1. NAVBAR
// ==========================================
export function LandingNav() {
  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <Box component="nav" ref={navRef} sx={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 30 }}>
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
            bgcolor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 8px 30px rgba(10, 15, 30, 0.04)',
          }}
        >
          {/* Logo & Brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              color: palette.primary,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: palette.primary,
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.95rem',
              }}
            >
              J
            </Box>
            <Typography sx={{ fontWeight: 900, letterSpacing: '0.08em', fontSize: '1.05rem', color: palette.primary }}>
              JARVIS
            </Typography>
            <Chip
              label="LMR 2011"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.62rem',
                fontWeight: 800,
                bgcolor: palette.accentBg,
                color: palette.accent,
                border: `1px solid ${palette.accentBorder}`,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>

          {/* Nav Anchors */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3.5, ml: 2 }}>
            {[
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Capabilities', href: '#ai-capabilities' },
              { label: 'Report', href: '#compliance-report' },
              { label: 'Features', href: '#features' },
              { label: 'Industries', href: '#use-cases' },
            ].map(item => (
              <Typography
                key={item.label}
                component="a"
                href={item.href}
                sx={{
                  color: palette.textSecondary,
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: palette.accent },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Right Action */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 'auto' }}>
            <Button
              component={Link}
              to="/signin"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                color: palette.textSecondary,
                fontWeight: 600,
                fontSize: '0.88rem',
                px: 2,
                '&:hover': { color: palette.primary, bgcolor: 'transparent' },
              }}
            >
              Inspector login
            </Button>
            <Button
              component={Link}
              to="/scan"
              variant="contained"
              sx={{
                borderRadius: 99,
                bgcolor: palette.primary,
                color: '#ffffff',
                px: { xs: 2.2, md: 3 },
                py: 0.85,
                fontWeight: 700,
                fontSize: '0.88rem',
                boxShadow: '0 4px 14px rgba(10, 15, 30, 0.15)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#18243e',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              New Scan
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// ==========================================
// 2. HERO SECTION
// ==========================================
export function Hero({ onDemo }) {
  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const badgeRef1 = useRef(null);
  const badgeRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro staggered reveal
      gsap.from('.hero-anim', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Floating mockup entrance
      if (mockupRef.current) {
        gsap.from(mockupRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.35,
          ease: 'power3.out',
        });
      }

      // Gentle floating animation for badges
      if (badgeRef1.current) {
        gsap.to(badgeRef1.current, {
          y: -6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (badgeRef2.current) {
        gsap.to(badgeRef2.current, {
          y: 6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 16, md: 22 },
        pb: { xs: 10, md: 16 },
        bgcolor: '#ffffff',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(204, 251, 241, 0.4) 0%, rgba(248, 250, 252, 0.3) 55%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Dominant Headline & Clear Hierarchy */}
        <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          {/* Eyebrow Pill */}
          <Box className="hero-anim" sx={{ mb: 2.5 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: `${palette.accent} !important` }} />}
              label="Legal Metrology Compliance Engine"
              sx={{
                bgcolor: palette.accentBg,
                color: palette.accent,
                fontWeight: 800,
                fontSize: '0.78rem',
                border: `1px solid ${palette.accentBorder}`,
                px: 1.5,
                py: 2.2,
                borderRadius: 99,
              }}
            />
          </Box>

          {/* One Dominant Headline */}
          <Typography
            className="hero-anim"
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '4.2rem', md: '5.2rem' },
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.04em',
              color: palette.primary,
              mb: 2,
            }}
          >
            From packaging label to{' '}
            <Box
              component="span"
              sx={{
                color: palette.accent,
                display: 'inline-block',
              }}
            >
              compliance decision.
            </Box>
          </Typography>

          {/* Clear Subheadline / Tagline */}
          <Typography
            className="hero-anim"
            variant="h5"
            sx={{
              fontWeight: 700,
              color: palette.primary,
              mb: 1.5,
              fontSize: { xs: '1.2rem', md: '1.45rem' },
            }}
          >
            Snap. Scan. Stay Compliant.
          </Typography>

          {/* Readable Body Description */}
          <Typography
            className="hero-anim"
            sx={{
              maxWidth: 680,
              mx: 'auto',
              color: palette.textSecondary,
              fontSize: { xs: '1rem', md: '1.14rem' },
              lineHeight: 1.75,
              mb: 4,
            }}
          >
            JARVIS automates packaged commodity audits under the Legal Metrology (Packaged Commodities) Rules, 2011 — turning packaging artwork into instant, audit-ready compliance analysis.
          </Typography>

          {/* Single Standout Primary CTA Button */}
          <Box className="hero-anim">
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
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 4.5,
                  py: 1.6,
                  bgcolor: palette.primary,
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(10, 15, 30, 0.2)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: '#141f38',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(10, 15, 30, 0.28)',
                  },
                }}
              >
                New Scan
              </Button>

              <Button
                href="#demo"
                variant="text"
                size="large"
                startIcon={<PlayArrowRoundedIcon sx={{ color: palette.accent }} />}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  py: 1.5,
                  color: palette.primary,
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: 'rgba(10, 15, 30, 0.04)',
                  },
                }}
              >
                Explore sample scans
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Polished Enterprise Dashboard Preview */}
        <Box sx={{ maxWidth: 1020, mx: 'auto', position: 'relative', px: { xs: 0, md: 2 } }}>
          <Paper
            ref={mockupRef}
            elevation={0}
            sx={{
              borderRadius: { xs: 3, md: 5 },
              p: { xs: 2, sm: 3, md: 4 },
              bgcolor: '#ffffff',
              border: `1px solid ${palette.border}`,
              boxShadow: '0 20px 60px rgba(10, 15, 30, 0.07), 0 2px 6px rgba(10, 15, 30, 0.03)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 2.5,
                borderBottom: `1px solid ${palette.border}`,
                mb: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box sx={{ display: 'flex', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.8 }} />
                <Typography variant="body2" sx={{ fontWeight: 800, color: palette.primary }}>
                  Audit Session #8942 • Singla's Multigrain Cookies
                </Typography>
              </Box>

              <Chip
                icon={<CheckCircleRoundedIcon sx={{ fontSize: 14, color: `${palette.accent} !important` }} />}
                label="ANALYSIS VERIFIED"
                size="small"
                sx={{
                  bgcolor: palette.accentBg,
                  color: palette.accent,
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  border: `1px solid ${palette.accentBorder}`,
                }}
              />
            </Box>

            {/* Dashboard Declarations Grid */}
            <Grid container spacing={2}>
              {[
                { label: 'MRP (Inclusive of Taxes)', val: '₹50.00', status: 'Compliant' },
                { label: 'Net Quantity Statement', val: '200g (Metric Units Met)', status: 'Compliant' },
                { label: 'Manufacturer Declaration', val: 'Identified on Back Panel', status: 'Verified' },
                { label: 'Unit Sale Price', val: 'Calculated Automatically', status: 'Compliant' },
              ].map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.label}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: palette.surfaceSubtle,
                      border: `1px solid ${palette.border}`,
                      transition: 'border-color 0.2s ease',
                      '&:hover': { borderColor: palette.accent },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: palette.textSecondary, fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.6, fontWeight: 800, color: palette.primary }}>
                      {item.val}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.6 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: palette.accent }} />
                      <Typography variant="caption" sx={{ color: palette.accent, fontWeight: 800 }}>
                        {item.status}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Audit Summary Ribbon */}
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: 2.5,
                bgcolor: palette.primary,
                color: '#ffffff',
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
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: palette.accent,
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                  }}
                >
                  72%
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#ffffff' }}>
                    Compliance Score: 72% • 6 Required Declarations Audited
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    1 consumer care clause flagged for review • Ready for official inspector dossier export
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
                  bgcolor: '#ffffff',
                  color: palette.primary,
                  fontWeight: 800,
                  px: 2.5,
                  py: 0.8,
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                Inspect scan
              </Button>
            </Box>
          </Paper>

          {/* Floating Subtle Badge 1 */}
          <Paper
            ref={badgeRef1}
            elevation={0}
            sx={{
              position: 'absolute',
              top: -18,
              right: { xs: 10, md: -20 },
              zIndex: 3,
              p: 1.4,
              px: 2,
              borderRadius: 3,
              bgcolor: '#ffffff',
              border: `1px solid ${palette.border}`,
              boxShadow: '0 12px 30px rgba(10, 15, 30, 0.08)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <VerifiedRoundedIcon sx={{ color: palette.accent, fontSize: 18 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: palette.primary, display: 'block' }}>
                LMR 2011 Active Engine
              </Typography>
              <Typography variant="caption" sx={{ color: palette.textMuted, fontSize: '0.68rem' }}>
                Rule 6, 7 & 8 checks loaded
              </Typography>
            </Box>
          </Paper>

          {/* Floating Subtle Badge 2 */}
          <Paper
            ref={badgeRef2}
            elevation={0}
            sx={{
              position: 'absolute',
              bottom: -18,
              left: { xs: 10, md: -15 },
              zIndex: 3,
              p: 1.4,
              px: 2,
              borderRadius: 3,
              bgcolor: '#ffffff',
              border: `1px solid ${palette.border}`,
              boxShadow: '0 12px 30px rgba(10, 15, 30, 0.08)',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <SpeedOutlinedIcon sx={{ color: palette.accent, fontSize: 18 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: palette.primary, display: 'block' }}>
                Sub-second OCR Parsing
              </Typography>
              <Typography variant="caption" sx={{ color: palette.textMuted, fontSize: '0.68rem' }}>
                98.4% field confidence
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

// ==========================================
// 3. TRUST METRICS BAR
// ==========================================
export function TrustBar() {
  const metrics = [
    { label: 'Legal Metrology Rules', val: '2011 Standards', desc: 'Packaged commodities compliant' },
    { label: 'Mandatory Checks', val: '8 Rules Audited', desc: 'MRP, quantity, date, mfr clauses' },
    { label: 'Accuracy Rating', val: '98.4% Confidence', desc: 'Zero hallucination legal validation' },
    { label: 'National Hackathon', val: 'SIH 2026', desc: 'Designed for regulatory inspectors' },
  ];

  return (
    <Box sx={{ borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}`, bgcolor: '#ffffff', py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {metrics.map((m, idx) => (
            <Grid item xs={6} md={3} key={m.label}>
              <Box sx={{ textAlign: { xs: 'left', md: 'center' }, px: { md: 2 } }}>
                <Typography variant="caption" sx={{ color: palette.accent, fontWeight: 800, letterSpacing: '0.06em' }}>
                  {m.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary, mt: 0.4 }}>
                  {m.val}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.textSecondary }}>
                  {m.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 4. PROBLEM SECTION
// ==========================================
export function ProblemSection() {
  const problems = [
    { title: 'Manual label inspection', desc: 'Checking dozens of complex packaging lines by hand drains inspection manpower.' },
    { title: 'Human error & oversight', desc: 'Font sizes, net weights, and consumer care clauses are easily missed under tight deadlines.' },
    { title: 'Strict regulatory sanctions', desc: 'Legal Metrology Rules 2011 mandate severe penalties and seizures for non-compliance.' },
    { title: 'Delayed market distribution', desc: 'Slow verification backlogs hold up new product SKU launches and warehouse shipments.' },
  ];

  return (
    <Box id="problem" sx={{ py: { xs: 10, md: 16 }, bgcolor: palette.surfaceSubtle }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left Narrative */}
          <Grid item xs={12} md={6}>
            <Typography sx={eyebrowSx}>THE INSPECTION CHALLENGE</Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 1.5,
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                color: palette.primary,
                letterSpacing: '-0.03em',
              }}
            >
              Product label compliance shouldn't be manual.
            </Typography>
            <Typography sx={{ mt: 2.2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.75 }}>
              Packaged commodity packaging carries mandatory statutory declarations. Manual verification is slow, inconsistent, and exposes brands to regulatory penalties.
            </Typography>

            {/* Vertical Flow Timeline */}
            <Box sx={{ mt: 5, position: 'relative', pl: 3.5 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 11,
                  top: 10,
                  bottom: 10,
                  width: 2,
                  bgcolor: palette.border,
                }}
              />

              <Stack spacing={3.2}>
                {problems.map((prob, i) => (
                  <Box key={prob.title} sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: -33,
                        top: 3,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : palette.primary,
                        border: '3px solid #ffffff',
                        boxShadow: '0 0 0 1px #cbd5e1',
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: palette.primary }}>
                      {prob.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.textSecondary, mt: 0.3, lineHeight: 1.6 }}>
                      {prob.desc}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right Inspection Card Mockup */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 4,
                bgcolor: '#ffffff',
                border: `1px solid ${palette.border}`,
                boxShadow: '0 16px 40px rgba(10, 15, 30, 0.05)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: palette.primary }}>
                  PACKAGE LABEL AUDIT MATRIX
                </Typography>
                <Chip label="ACTION REQUIRED" size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800, fontSize: '0.68rem' }} />
              </Box>

              <Box
                sx={{
                  height: 300,
                  borderRadius: 3,
                  bgcolor: palette.surfaceSubtle,
                  border: '1px dashed #cbd5e1',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary }}>
                      GLOWFRESH ENERGY DRINK
                    </Typography>
                    <Typography variant="caption" sx={{ color: palette.textMuted }}>
                      Batch: 2026-X • Net Volume: 250ml
                    </Typography>
                  </Box>
                  <Box sx={{ width: 50, height: 24, bgcolor: '#cbd5e1', borderRadius: 1 }} />
                </Box>

                {/* Simulated Warning Flag */}
                <Box
                  sx={{
                    p: 1.4,
                    borderRadius: 2,
                    bgcolor: 'rgba(254, 242, 242, 0.9)',
                    border: '1px solid #fca5a5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <WarningAmberRoundedIcon sx={{ color: '#dc2626', fontSize: 18 }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#991b1b', display: 'block' }}>
                      Rule 6(1)(f) Consumer Care Missing
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f1d1d', fontSize: '0.68rem' }}>
                      Helpline email address not detected on label surface
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: palette.textSecondary, fontWeight: 700, display: 'block' }}>
                      MRP ₹40.00 (Inclusive of all taxes)
                    </Typography>
                    <Typography variant="caption" sx={{ color: palette.textMuted, fontSize: '0.68rem' }}>
                      Mfg Date: 02/2026 • Validated
                    </Typography>
                  </Box>
                  <Chip
                    label="1 Flagged Item"
                    size="small"
                    sx={{ bgcolor: palette.primary, color: '#ffffff', fontWeight: 800, fontSize: '0.68rem' }}
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
// 5. AI CAPABILITIES SHOWCASE
// ==========================================
export function AiSection() {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      title: 'AI-Powered OCR',
      desc: 'Extract packaging declarations, measurements, and manufacturer clauses automatically using high-speed Vision OCR.',
      icon: <DocumentScannerOutlinedIcon sx={{ fontSize: 22 }} />,
      tokens: [
        { label: 'MRP Tag', val: '₹120.00', status: 'Extracted' },
        { label: 'Net Weight', val: '500g', status: 'Valid Unit' },
        { label: 'Batch No', val: 'B48-X', status: 'Detected' },
      ],
    },
    {
      title: 'Legal Rule Validation',
      desc: 'Deterministically validate declarations against the Legal Metrology (Packaged Commodities) Rules, 2011 with statutory clauses.',
      icon: <PolicyOutlinedIcon sx={{ fontSize: 22 }} />,
      tokens: [
        { label: 'Rule 6(1)(a)', val: 'Common Name matched', status: 'Pass' },
        { label: 'Rule 6(1)(d)', val: 'Metric Unit standard', status: 'Pass' },
        { label: 'Rule 6(1)(e)', val: 'All-inclusive MRP format', status: 'Pass' },
      ],
    },
    {
      title: 'Missing Information Detection',
      desc: 'Pinpoint omitted statutory items — consumer care, importer address, dates, or unit sale prices — before labels go to press.',
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 22 }} />,
      tokens: [
        { label: 'Consumer Care', val: 'Contact email missing', status: 'Flagged' },
        { label: 'Country of Origin', val: 'Present on panel', status: 'Pass' },
        { label: 'Veg/Non-Veg Logo', val: 'Detected on rear', status: 'Pass' },
      ],
    },
    {
      title: 'Actionable Remediation Guidance',
      desc: 'Plain-language summaries explain why an item was flagged and cite the exact Legal Metrology sub-rule for quick correction.',
      icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 22 }} />,
      tokens: [
        { label: 'Clause 6(1)(f)', val: 'Requires telephone & email', status: 'Remedy' },
        { label: 'Table I Schedule', val: 'Font height requirement', status: 'Action' },
        { label: 'Inspector Memo', val: 'Audit trail recorded', status: 'Ready' },
      ],
    },
  ];

  const cur = capabilities[activeTab];

  return (
    <Box id="ai-capabilities" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
          <Typography sx={eyebrowSx}>CAPABILITIES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: palette.primary,
              letterSpacing: '-0.03em',
            }}
          >
            Intelligent vision, deterministic legal logic.
          </Typography>
          <Typography sx={{ mt: 2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Jarvis combines modern OCR with deterministic regulatory algorithms to deliver zero-hallucination compliance audits.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Inspector Display */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: palette.primary,
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(10, 15, 30, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MemoryRoundedIcon sx={{ color: palette.accentMint }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: palette.accentMint, letterSpacing: '0.08em' }}>
                    JARVIS STATUTORY INSPECTOR
                  </Typography>
                </Box>
                <Chip label="ACTIVE AUDIT" size="small" sx={{ bgcolor: 'rgba(45, 212, 191, 0.15)', color: palette.accentMint, fontWeight: 800, fontSize: '0.64rem' }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', mb: 1 }}>
                {cur.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3.5, lineHeight: 1.65 }}>
                {cur.desc}
              </Typography>

              <Stack spacing={1.2}>
                {cur.tokens.map(token => (
                  <Box
                    key={token.label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.4,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Typography variant="caption" sx={{ color: palette.accentMint, fontWeight: 800, fontFamily: 'monospace' }}>
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
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        bgcolor:
                          token.status === 'Pass' || token.status === 'Extracted' || token.status === 'Valid Unit'
                            ? 'rgba(45, 212, 191, 0.16)'
                            : 'rgba(245, 158, 11, 0.18)',
                        color:
                          token.status === 'Pass' || token.status === 'Extracted' || token.status === 'Valid Unit'
                            ? palette.accentMint
                            : '#fbbf24',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right Capability List */}
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
                      p: 2.6,
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      bgcolor: isSelected ? palette.accentBg : '#ffffff',
                      border: isSelected ? `1.5px solid ${palette.accent}` : `1px solid ${palette.border}`,
                      boxShadow: isSelected ? '0 8px 24px rgba(13, 148, 136, 0.08)' : 'none',
                      transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: isSelected ? palette.accent : palette.surfaceSubtle,
                          color: isSelected ? '#ffffff' : palette.accent,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {cap.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: palette.primary }}>
                          {cap.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: palette.textSecondary, mt: 0.2, lineHeight: 1.6 }}>
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
// 6. COMPLIANCE REPORT SECTION (Dark Navy Theme)
// ==========================================
export function ImpactSection({ onDemo }) {
  return (
    <Box
      id="compliance-report"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: palette.primary,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Left Description */}
          <Grid item xs={12} md={5}>
            <Chip
              label="AUDIT DOSSIER"
              size="small"
              sx={{
                bgcolor: 'rgba(45, 212, 191, 0.15)',
                color: palette.accentMint,
                fontWeight: 800,
                border: '1px solid rgba(45, 212, 191, 0.3)',
                mb: 2.5,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              From product image to compliance decision.
            </Typography>

            <Typography sx={{ mt: 2.5, color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75 }}>
              JARVIS compiles extracted declarations, legal rule verifications, missing mandatory items, and OCR confidence markers into a complete downloadable PDF & JSON audit dossier.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button
                component={Link}
                to="/scan"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 3.5,
                  py: 1.4,
                  bgcolor: palette.accent,
                  color: '#ffffff',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: palette.accentLight,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Start a Scan
              </Button>

              <Button
                href="#demo"
                variant="outlined"
                size="large"
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

          {/* Right Report Preview Card */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: '#111827',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Header inside Report Card */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2.5, borderBottom: '1px solid rgba(255,255,255,0.08)', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: 1.5, bgcolor: palette.accent, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900 }}>
                    J
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                      Singla's Multigrain Cookies
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      Report #REP-2026-8942 • Packaged Food Commodity
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="STATUS: NEEDS ATTENTION"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(245, 158, 11, 0.16)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    fontWeight: 800,
                    fontSize: '0.66rem',
                  }}
                />
              </Box>

              {/* 4 Score Indicators */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.8, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Compliance Score
                    </Typography>
                    <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: palette.accentMint, lineHeight: 1.2 }}>
                      72%
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.8, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Missing Items
                    </Typography>
                    <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#f87171', lineHeight: 1.2 }}>
                      6
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.8, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Manual Review
                    </Typography>
                    <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#fbbf24', lineHeight: 1.2 }}>
                      1
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.8, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      Verified Passed
                    </Typography>
                    <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#4ade80', lineHeight: 1.2 }}>
                      8
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Sample Verified Rules */}
              <Stack spacing={1}>
                {[
                  { name: 'Rule 6(1)(a) Generic Commodity Name', status: 'COMPLIANT', color: '#4ade80' },
                  { name: 'Rule 6(1)(d) Standard Metric Net Quantity', status: 'COMPLIANT', color: '#4ade80' },
                  { name: 'Rule 6(1)(f) Consumer Care Contact Details', status: 'ACTION REQUIRED', color: '#f87171' },
                ].map(r => (
                  <Box
                    key={r.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.2,
                      px: 2,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.86rem' }}>
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
// 7. KEY FEATURES SECTION (Bento Grid)
// ==========================================
export function FeaturesSection() {
  return (
    <Box id="features" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
          <Typography sx={eyebrowSx}>FEATURES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: palette.primary,
              letterSpacing: '-0.03em',
            }}
          >
            Built for enterprise compliance teams.
          </Typography>
          <Typography sx={{ mt: 2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every capability needed to verify, document, and approve packaged goods without administrative drag.
          </Typography>
        </Box>

        {/* Bento Grid */}
        <Grid container spacing={3}>
          {/* Large Card (8 Cols) */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4.5 },
                height: '100%',
                borderRadius: 4,
                bgcolor: palette.surfaceSubtle,
                border: `1px solid ${palette.border}`,
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                  borderColor: palette.accent,
                },
              }}
            >
              <Box>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2.5 }}>
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: palette.primary }}>
                  AI-Powered Product Analysis
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.2, color: palette.textSecondary, lineHeight: 1.7, maxWidth: 580 }}>
                  Extracts multi-lingual text, verifies standard weights against Second Schedule rules, detects dates, and correlates statutory packaging clauses with zero manual data entry.
                </Typography>
              </Box>

              <Box sx={{ mt: 4, p: 2, bgcolor: '#ffffff', borderRadius: 2.5, border: `1px solid ${palette.border}`, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <TaskAltRoundedIcon sx={{ color: palette.accent, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.primary }}>
                    Multi-lingual OCR Engine Active
                  </Typography>
                </Box>
                <Chip label="Deterministic Validation" size="small" sx={{ bgcolor: palette.accentBg, color: palette.accent, fontWeight: 800 }} />
              </Box>
            </Paper>
          </Grid>

          {/* Medium Card (4 Cols) */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: palette.surfaceSubtle,
                border: `1px solid ${palette.border}`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                  borderColor: palette.accent,
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <DocumentScannerOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary }}>
                Instant OCR Extraction
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: palette.textSecondary, lineHeight: 1.65 }}>
                Parses curved, low-light, rotated, and glossy commodity labels with sub-second response times.
              </Typography>
            </Paper>
          </Grid>

          {/* Medium Card (4 Cols) */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: palette.surfaceSubtle,
                border: `1px solid ${palette.border}`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                  borderColor: palette.accent,
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <GavelOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary }}>
                LMR 2011 Validation
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: palette.textSecondary, lineHeight: 1.65 }}>
                Rules engine verifies mandatory declarations against official statutory Indian Legal Metrology clauses.
              </Typography>
            </Paper>
          </Grid>

          {/* Wide Card (5 Cols) */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: palette.surfaceSubtle,
                border: `1px solid ${palette.border}`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                  borderColor: palette.accent,
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <DownloadRoundedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary }}>
                Detailed Audit Reports
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: palette.textSecondary, lineHeight: 1.65 }}>
                Export audit-ready PDF records with visual stamps, confidence breakdown, and legal citations.
              </Typography>
            </Paper>
          </Grid>

          {/* Small Card (3 Cols) */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, md: 4 },
                height: '100%',
                borderRadius: 4,
                bgcolor: palette.surfaceSubtle,
                border: `1px solid ${palette.border}`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                  borderColor: palette.accent,
                },
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2.5 }}>
                <InsightsOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: palette.primary }}>
                Manual Review Flagging
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: palette.textSecondary, lineHeight: 1.65 }}>
                Low-confidence detections are routed for human verification.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 8. USE CASES SECTION
// ==========================================
export function UseCasesSection() {
  const industries = [
    { title: 'Food & Beverages', icon: <Inventory2OutlinedIcon sx={{ fontSize: 26 }} />, desc: 'Nutritional declarations, FSSAI logos, allergen tags, and standard net volumes.', tag: 'FSSAI + LMR' },
    { title: 'Cosmetics & Skincare', icon: <SpaOutlinedIcon sx={{ fontSize: 26 }} />, desc: 'Batch codes, manufacturer address, ingredient lists, and expiration dates.', tag: 'Cosmetics Rules' },
    { title: 'Consumer Electronics', icon: <DevicesOtherOutlinedIcon sx={{ fontSize: 26 }} />, desc: 'Importer declarations, country of origin, model numbers, and consumer helpline info.', tag: 'E-Waste + LMR' },
    { title: 'Packaged Goods (FMCG)', icon: <LocalShippingOutlinedIcon sx={{ fontSize: 26 }} />, desc: 'Standard package weights under the Second Schedule and multi-unit pack audits.', tag: 'FMCG Standards' },
    { title: 'Retail & E-Commerce', icon: <StorefrontOutlinedIcon sx={{ fontSize: 26 }} />, desc: 'Pre-market catalogue auditing for Amazon, Flipkart, Blinkit, and quick commerce.', tag: 'Marketplaces' },
  ];

  return (
    <Box id="use-cases" sx={{ py: { xs: 10, md: 15 }, bgcolor: palette.surfaceSubtle }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 7 } }}>
          <Typography sx={eyebrowSx}>INDUSTRIES</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: palette.primary,
              letterSpacing: '-0.03em',
            }}
          >
            Engineered for packaged commodities.
          </Typography>
          <Typography sx={{ mt: 2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Whether auditing retail shelves or onboarding vendor SKUs onto quick-commerce platforms, JARVIS adapts.
          </Typography>
        </Box>

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
                  border: `1px solid ${palette.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(10, 15, 30, 0.06)',
                    borderColor: palette.accent,
                  },
                }}
              >
                <Box>
                  <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: palette.accentBg, color: palette.accent, display: 'grid', placeItems: 'center', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: palette.primary, fontSize: '1.02rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.8, color: palette.textSecondary, lineHeight: 1.6, fontSize: '0.86rem' }}>
                    {item.desc}
                  </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Chip label={item.tag} size="small" sx={{ fontSize: '0.66rem', fontWeight: 800, bgcolor: palette.surfaceSubtle, color: palette.textSecondary }} />
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
// 9. TECHNOLOGY SECTION
// ==========================================
export function TechnologySection() {
  const nodes = [
    { title: 'AI Vision Preprocessing', sub: 'Adaptive contrast leveling and perspective correction', tech: 'Computer Vision' },
    { title: 'High-Speed OCR Engine', sub: 'Extracts dense curved packaging fonts across languages', tech: 'Vision OCR' },
    { title: 'Rule-Based Verification', sub: 'Deterministic Legal Metrology 2011 rule mapping', tech: 'Statutory Engine' },
    { title: 'Compliance Dossier', sub: 'Generates audit conclusions, citations and PDF reports', tech: 'Audit Intelligence' },
  ];

  return (
    <Box id="technology" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          <Typography sx={{ ...eyebrowSx, justifyContent: 'center' }}>ARCHITECTURE</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: palette.primary,
              letterSpacing: '-0.03em',
            }}
          >
            Deterministic four-stage pipeline.
          </Typography>
          <Typography sx={{ mt: 2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Designed to eliminate hallucinations and produce legally defensible compliance audit decisions.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {nodes.map((node, i) => (
            <Grid item xs={12} sm={6} md={3} key={node.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3.5,
                  bgcolor: palette.surfaceSubtle,
                  border: `1px solid ${palette.border}`,
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: palette.accent,
                    boxShadow: '0 12px 30px rgba(10, 15, 30, 0.05)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: palette.primary,
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 900,
                    mx: 'auto',
                    mb: 2,
                    fontSize: '0.85rem',
                  }}
                >
                  0{i + 1}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: palette.primary, fontSize: '1.05rem' }}>
                  {node.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.8, color: palette.textSecondary, fontSize: '0.86rem', lineHeight: 1.6 }}>
                  {node.sub}
                </Typography>
                <Chip
                  label={node.tech}
                  size="small"
                  sx={{ mt: 2, fontWeight: 700, fontSize: '0.64rem', bgcolor: palette.accentBg, color: palette.accent }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ==========================================
// 10. INTERACTIVE DEMOS SECTION
// ==========================================
export function DemoSection({ onDemo }) {
  const products = [
    { id: 'demo-a', name: "Sunrise Premium Basmati Rice", category: 'Food product', score: '92%', status: 'Mostly compliant', color: '#16a34a' },
    { id: 'demo-b', name: 'GlowFresh Hydrating Face Wash', category: 'Cosmetic', score: '68%', status: 'Needs attention', color: '#f59e0b' },
    { id: 'demo-c', name: 'QuickBite Instant Noodles', category: 'Food product', score: '41%', status: 'Non-compliant', color: '#dc2626' },
  ];

  return (
    <Box id="demo" sx={{ py: { xs: 10, md: 15 }, bgcolor: palette.surfaceSubtle }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 5, md: 7 } }}>
          <Typography sx={{ ...eyebrowSx, justifyContent: 'center' }}>INTERACTIVE DEMOS</Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1.5,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: palette.primary,
              letterSpacing: '-0.03em',
            }}
          >
            Test drive live audit reports.
          </Typography>
          <Typography sx={{ mt: 2, color: palette.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Open a pre-loaded packaging audit below to explore the inspector report workspace without uploading an image.
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
                  border: `1px solid ${palette.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 16px 36px rgba(10, 15, 30, 0.06)',
                    borderColor: palette.accent,
                  },
                }}
              >
                <Box>
                  <Chip label="PRE-LOADED DEMO" size="small" sx={{ color: palette.accent, bgcolor: palette.accentBg, fontWeight: 800, fontSize: '0.68rem' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: palette.primary, fontWeight: 800 }}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: palette.textMuted }}>
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
                    borderColor: palette.border,
                    color: palette.primary,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: palette.primary,
                      color: '#ffffff',
                      borderColor: palette.primary,
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
// 11. FINAL CTA SECTION
// ==========================================
export function FinalCta() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 4, md: 6 },
            p: { xs: 5, md: 9 },
            textAlign: 'center',
            bgcolor: palette.primary,
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(10, 15, 30, 0.2)',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 720, mx: 'auto' }}>
            <Chip
              label="INSTANT AUDIT"
              size="small"
              sx={{
                bgcolor: 'rgba(45, 212, 191, 0.15)',
                color: palette.accentMint,
                fontWeight: 800,
                border: '1px solid rgba(45, 212, 191, 0.3)',
                mb: 2.5,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.2rem' },
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              Make product compliance intelligent.
            </Typography>

            <Typography sx={{ mt: 2.5, color: '#94a3b8', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.7 }}>
              Upload any packaged commodity label and let JARVIS identify potential compliance issues in seconds.
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
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  borderRadius: 99,
                  px: 4.5,
                  py: 1.7,
                  bgcolor: palette.accent,
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(13, 148, 136, 0.4)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: palette.accentLight,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                New Scan
              </Button>

              <Button
                component={Link}
                to="/dashboard"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 99,
                  px: 4,
                  py: 1.7,
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontSize: '1rem',
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
// 12. FOOTER
// ==========================================
export function LandingFooter() {
  return (
    <Box sx={{ bgcolor: '#ffffff', borderTop: `1px solid ${palette.border}`, pt: 7, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 30, height: 30, borderRadius: 1.5, display: 'grid', placeItems: 'center', bgcolor: palette.primary, color: '#fff', fontWeight: 900 }}>
                J
              </Box>
              <Typography sx={{ fontWeight: 900, letterSpacing: '.08em', color: palette.primary, fontSize: '1.05rem' }}>
                JARVIS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1.6, color: palette.textSecondary, maxWidth: 360, lineHeight: 1.65 }}>
              AI-assisted packaged commodity label compliance checker under the Legal Metrology (Packaged Commodities) Rules, 2011.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: palette.primary }}>
              PLATFORM
            </Typography>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <Typography component="a" href="#problem" variant="body2" sx={{ color: palette.textSecondary, textDecoration: 'none', '&:hover': { color: palette.accent } }}>
                Problem
              </Typography>
              <Typography component="a" href="#how-it-works" variant="body2" sx={{ color: palette.textSecondary, textDecoration: 'none', '&:hover': { color: palette.accent } }}>
                How it works
              </Typography>
              <Typography component="a" href="#ai-capabilities" variant="body2" sx={{ color: palette.textSecondary, textDecoration: 'none', '&:hover': { color: palette.accent } }}>
                Capabilities
              </Typography>
              <Typography component="a" href="#features" variant="body2" sx={{ color: palette.textSecondary, textDecoration: 'none', '&:hover': { color: palette.accent } }}>
                Features
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: palette.primary }}>
              REGULATORY
            </Typography>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                LMR 2011 Standards
              </Typography>
              <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                Rule 6 Declarations
              </Typography>
              <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                Second Schedule
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="caption" sx={{ ...eyebrowSx, color: palette.primary }}>
              WORKSPACE
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: palette.textSecondary, lineHeight: 1.65 }}>
              Built for packaging manufacturers, retailers, brands, and Legal Metrology regulatory inspectors.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: palette.textMuted }}>
            © 2026 JARVIS. Built for Smart India Hackathon 2026.
          </Typography>
          <Typography variant="caption" sx={{ color: palette.textMuted }}>
            Legal Metrology (Packaged Commodities) Rules, 2011 Compliant
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
