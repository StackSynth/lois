import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 'step-01',
      number: '01',
      phase: 'INGESTION',
      title: 'Capture Product Label',
      icon: <CameraAltOutlinedIcon sx={{ fontSize: 26 }} />,
      description: 'Upload or capture an image of a packaged product label for analysis.',
      highlight: false,
      tag: 'Multi-angle Ready',
      renderVisual: () => (
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(37,99,235,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle intake guide lines */}
          <Box
            sx={{
              position: 'absolute',
              inset: 8,
              border: '1px dashed #cbd5e1',
              borderRadius: 2,
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Animated floating package label mock */}
            <Box
              sx={{
                width: 48,
                height: 60,
                borderRadius: 1.5,
                bgcolor: '#f1f5f9',
                border: '1.5px solid #93c5fd',
                p: 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 6px 16px rgba(37,99,235,0.12)',
                animation: 'labelFloat 3.2s ease-in-out infinite alternate',
                '@keyframes labelFloat': {
                  '0%': { transform: 'translateY(0px) rotate(-1deg)' },
                  '100%': { transform: 'translateY(-6px) rotate(1.5deg)' },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2563eb' }} />
                <Box sx={{ width: 22, height: 4, bgcolor: '#cbd5e1', borderRadius: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                <Box sx={{ width: 28, height: 3, bgcolor: '#94a3b8', borderRadius: 1 }} />
                <Box sx={{ width: 20, height: 3, bgcolor: '#cbd5e1', borderRadius: 1 }} />
              </Box>
              {/* Mini barcode lines */}
              <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'flex-end', height: 10 }}>
                {[6, 10, 8, 10, 5, 9, 7].map((h, i) => (
                  <Box
                    key={i}
                    sx={{ width: 1.8, height: `${h}px`, bgcolor: '#475569', borderRadius: 0.5 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Ingestion stream indicators */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.6 }}>
                <CloudUploadOutlinedIcon sx={{ fontSize: 16, color: '#2563eb' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.74rem' }}>
                  Label Image Stream
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem', display: 'block', mb: 0.8 }}>
                JPEG, PNG, WEBP (Hi-Res)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#16a34a',
                    boxShadow: '0 0 8px #16a34a',
                    animation: 'intakePulse 1.8s infinite',
                    '@keyframes intakePulse': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.4, transform: 'scale(0.8)' },
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700, fontSize: '0.66rem' }}>
                  Ready for pipeline
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: 'step-02',
      number: '02',
      phase: 'INTELLIGENT CORE',
      title: 'AI Extracts Information',
      icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 26 }} />,
      description: 'AI and OCR identify important declarations, measurements, ingredients, manufacturer details, and label information.',
      highlight: true,
      tag: 'Vision + NLP Engine',
      renderVisual: () => (
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 12px 32px rgba(37,99,235,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Laser Scanning Beam */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #38bdf8 50%, transparent)',
              boxShadow: '0 0 12px #38bdf8, 0 0 24px rgba(56,189,248,0.8)',
              animation: 'scanLaser 2.6s ease-in-out infinite',
              '@keyframes scanLaser': {
                '0%, 100%': { transform: 'translateY(8px)', opacity: 0.3 },
                '50%': { transform: 'translateY(92px)', opacity: 1 },
              },
            }}
          />

          {/* Core OCR Data Extraction Chips */}
          <Stack spacing={0.9} sx={{ position: 'relative', zIndex: 1 }}>
            {[
              { key: 'MRP', val: '₹145.00 (incl. taxes)', conf: '99%' },
              { key: 'NET WT', val: '500 g', conf: '98%' },
              { key: 'MFR', val: 'Singla Foods Pvt Ltd', conf: '96%' },
            ].map((item, idx) => (
              <Box
                key={item.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 0.7,
                  px: 1,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(30, 41, 59, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  animation: 'chipPop 3s ease-in-out infinite',
                  animationDelay: `${idx * 0.4}s`,
                  '@keyframes chipPop': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(3px)' },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#38bdf8',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '0.64rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.key}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#f8fafc',
                      fontWeight: 600,
                      fontSize: '0.68rem',
                    }}
                  >
                    {item.val}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#4ade80',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.62rem',
                    bgcolor: 'rgba(74, 222, 128, 0.12)',
                    px: 0.6,
                    py: 0.1,
                    borderRadius: 1,
                  }}
                >
                  {item.conf}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      id: 'step-03',
      number: '03',
      phase: 'STATUTORY AUDIT',
      title: 'Validate Against LMR 2011',
      icon: <GavelOutlinedIcon sx={{ fontSize: 26 }} />,
      description: 'Extracted information is checked against Legal Metrology Rules and required packaging declarations.',
      highlight: false,
      tag: 'Legal Engine',
      renderVisual: () => (
        <Box
          sx={{
            p: 1.8,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(37,99,235,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <PolicyOutlinedIcon sx={{ fontSize: 16, color: '#2563eb' }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.72rem' }}>
                LMR 2011 Check Matrix
              </Typography>
            </Box>
            <Chip
              size="small"
              label="Active Rules"
              sx={{
                height: 18,
                fontSize: '0.6rem',
                fontWeight: 800,
                color: '#2563eb',
                bgcolor: '#eff6ff',
                border: '1px solid #bfdbfe',
              }}
            />
          </Box>

          <Stack spacing={0.8}>
            {[
              { rule: 'Rule 6(1)(a) Common Name', status: 'PASS', color: '#16a34a' },
              { rule: 'Rule 6(1)(d) Net Quantity', status: 'PASS', color: '#16a34a' },
              { rule: 'Rule 6(1)(e) Unit Sale Price', status: 'VERIFIED', color: '#2563eb' },
            ].map((r, i) => (
              <Box
                key={r.rule}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 0.6,
                  px: 0.8,
                  borderRadius: 1.5,
                  bgcolor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                }}
              >
                <Typography variant="caption" sx={{ color: '#475569', fontSize: '0.66rem', fontWeight: 600 }}>
                  {r.rule}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 13, color: r.color }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      color: r.color,
                    }}
                  >
                    {r.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      id: 'step-04',
      number: '04',
      phase: 'OUTCOME',
      title: 'Generate Compliance Report',
      icon: <FactCheckOutlinedIcon sx={{ fontSize: 26 }} />,
      description: 'Receive a detailed report highlighting missing, invalid, suspicious, or compliant declarations.',
      highlight: false,
      tag: 'Audit Ready',
      renderVisual: () => (
        <Box
          sx={{
            p: 1.8,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: '1px solid #d1fae5',
            boxShadow: '0 8px 24px rgba(16,185,129,0.08)',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'conic-gradient(#16a34a 0% 96%, #e2e8f0 96% 100%)',
                  p: '3px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    bgcolor: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 900, color: '#16a34a' }}>
                    96%
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a', display: 'block', fontSize: '0.74rem' }}>
                  Compliance Score
                </Typography>
                <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700, fontSize: '0.66rem' }}>
                  Statutory Compliant
                </Typography>
              </Box>
            </Box>

            <VerifiedRoundedIcon sx={{ color: '#16a34a', fontSize: 20 }} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              p: 0.8,
              borderRadius: 2,
              bgcolor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: '#166534', fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                7 / 7
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.62rem' }}>
                Mandatory
              </Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: '#bbf7d0' }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#166534', fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                0 Alerts
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.62rem' }}>
                Violations
              </Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: '#bbf7d0' }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                PDF / JSON
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.62rem' }}>
                Export
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 9, md: 14 },
        bgcolor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting accents */}
      <Box
        sx={{
          position: 'absolute',
          width: 700,
          height: 380,
          borderRadius: '50%',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06), rgba(56,189,248,0.03) 50%, transparent 75%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 7, md: 9 } }}>
          <Typography
            sx={{
              color: '#2563eb',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'inline-block',
              bgcolor: 'rgba(37,99,235,0.08)',
              px: 2,
              py: 0.6,
              borderRadius: 99,
              mb: 2,
              border: '1px solid rgba(37,99,235,0.18)',
            }}
          >
            HOW JARVIS WORKS
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.3rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#0f172a',
              letterSpacing: '-0.03em',
            }}
          >
            From product label to{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              compliance decision.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2.2,
              color: '#475569',
              fontSize: { xs: '1rem', md: '1.12rem' },
              lineHeight: 1.75,
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            JARVIS transforms a product label image into a clear, AI-powered legal metrology compliance analysis.
          </Typography>
        </Box>

        {/* WORKFLOW PIPELINE CONTAINER */}
        <Box sx={{ position: 'relative' }}>
          {/* DESKTOP CONNECTING GLOWING LINE & ANIMATED DATA PARTICLES */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              top: 42,
              left: '12%',
              right: '12%',
              height: 4,
              borderRadius: 2,
              background: 'linear-gradient(90deg, rgba(37,99,235,0.18) 0%, rgba(56,189,248,0.5) 50%, rgba(37,99,235,0.18) 100%)',
              boxShadow: '0 0 16px rgba(56,189,248,0.3)',
              zIndex: 1,
            }}
          >
            {/* Primary traveling data particle */}
            <Box
              sx={{
                position: 'absolute',
                top: -3,
                width: 38,
                height: 10,
                borderRadius: 5,
                background: 'linear-gradient(90deg, transparent, #38bdf8, #2563eb)',
                boxShadow: '0 0 16px #38bdf8, 0 0 30px rgba(56,189,248,0.9)',
                animation: 'pulseJourney 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                '@keyframes pulseJourney': {
                  '0%': { left: '0%', opacity: 0 },
                  '15%': { opacity: 1 },
                  '85%': { opacity: 1 },
                  '100%': { left: 'calc(100% - 38px)', opacity: 0 },
                },
              }}
            />

            {/* Secondary subtle trailing particle */}
            <Box
              sx={{
                position: 'absolute',
                top: -1,
                width: 14,
                height: 6,
                borderRadius: 3,
                bgcolor: '#93c5fd',
                boxShadow: '0 0 10px #60a5fa',
                animation: 'pulseJourney 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                animationDelay: '1.8s',
              }}
            />
          </Box>

          {/* PIPELINE CARDS GRID */}
          <Grid
            container
            spacing={{ xs: 3, sm: 3, lg: 2.5 }}
            sx={{ position: 'relative', zIndex: 2 }}
          >
            {steps.map((step, index) => {
              const isCenterHighlight = step.highlight;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  key={step.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  {/* MOBILE & TABLET VERTICAL CONNECTOR LINE */}
                  <Box
                    sx={{
                      display: { xs: index < 3 ? 'block' : 'none', lg: 'none' },
                      position: 'absolute',
                      left: { xs: 38, sm: 'auto' },
                      right: { sm: -14 },
                      top: { xs: 80, sm: 40 },
                      bottom: { xs: -24, sm: 'auto' },
                      width: { xs: 3, sm: index % 2 === 0 ? 28 : 0 },
                      height: { xs: 'auto', sm: 3 },
                      background: 'linear-gradient(180deg, #38bdf8, rgba(37,99,235,0.2))',
                      boxShadow: '0 0 10px rgba(56,189,248,0.4)',
                      zIndex: 0,
                    }}
                  />

                  {/* STEP HUB (Node & Icon) */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'flex-start', lg: 'center' },
                      mb: 2.5,
                      position: 'relative',
                      zIndex: 3,
                      pl: { xs: 1, lg: 0 },
                    }}
                  >
                    <Box
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                      sx={{
                        position: 'relative',
                        width: { xs: 68, lg: 84 },
                        height: { xs: 68, lg: 84 },
                        borderRadius: { xs: 4, lg: '50%' },
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'all 0.35s ease',
                        cursor: 'pointer',
                        bgcolor: isCenterHighlight
                          ? '#0f172a'
                          : '#ffffff',
                        color: isCenterHighlight ? '#38bdf8' : '#1e3a8a',
                        border: isCenterHighlight
                          ? '3px solid #38bdf8'
                          : '3px solid #dbeafe',
                        boxShadow: isCenterHighlight
                          ? '0 0 35px rgba(56, 189, 248, 0.45), 0 12px 28px rgba(15, 23, 42, 0.3)'
                          : '0 10px 25px rgba(37, 99, 235, 0.1)',
                        transform: activeStep === step.id ? 'scale(1.08)' : 'scale(1)',
                        '&:hover': {
                          transform: 'scale(1.08)',
                          boxShadow: isCenterHighlight
                            ? '0 0 45px rgba(56, 189, 248, 0.65)'
                            : '0 12px 30px rgba(37, 99, 235, 0.2)',
                        },
                      }}
                    >
                      {/* Sub-node pulse ring */}
                      {isCenterHighlight && (
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: -8,
                            borderRadius: '50%',
                            border: '1.5px solid rgba(56,189,248,0.5)',
                            animation: 'radarPulse 2.4s ease-out infinite',
                            pointerEvents: 'none',
                            '@keyframes radarPulse': {
                              '0%': { transform: 'scale(0.92)', opacity: 0.9 },
                              '100%': { transform: 'scale(1.22)', opacity: 0 },
                            },
                          }}
                        />
                      )}

                      {/* Icon */}
                      {step.icon}

                      {/* Step Number Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -8,
                          bgcolor: isCenterHighlight ? '#2563eb' : '#eff6ff',
                          color: isCenterHighlight ? '#ffffff' : '#2563eb',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          px: 1,
                          py: 0.2,
                          borderRadius: 99,
                          border: isCenterHighlight
                            ? '1.5px solid #60a5fa'
                            : '1.5px solid #bfdbfe',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>

                    {/* Step Phase Label next to icon on mobile */}
                    <Box sx={{ ml: 2, display: { xs: 'block', lg: 'none' } }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          color: isCenterHighlight ? '#0284c7' : '#64748b',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {step.phase}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: '#0f172a',
                          fontSize: '1.05rem',
                          lineHeight: 1.2,
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* STEP PIPELINE CARD */}
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      p: { xs: 2.5, lg: 2.8 },
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: isCenterHighlight
                        ? '#091322'
                        : '#ffffff',
                      color: isCenterHighlight ? '#f8fafc' : '#0f172a',
                      border: isCenterHighlight
                        ? '1.5px solid rgba(56, 189, 248, 0.5)'
                        : '1px solid rgba(226, 232, 240, 0.85)',
                      boxShadow: isCenterHighlight
                        ? '0 20px 50px rgba(15, 23, 42, 0.25), 0 0 35px rgba(37,99,235,0.12)'
                        : '0 12px 35px rgba(15, 23, 42, 0.04)',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: isCenterHighlight
                          ? '0 25px 60px rgba(15, 23, 42, 0.35), 0 0 45px rgba(56, 189, 248, 0.25)'
                          : '0 20px 45px rgba(37, 99, 235, 0.12)',
                        borderColor: isCenterHighlight
                          ? '#38bdf8'
                          : '#93c5fd',
                      },
                    }}
                  >
                    {/* Top Status & Tag */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          color: isCenterHighlight ? '#38bdf8' : '#2563eb',
                        }}
                      >
                        STEP {step.number} • {step.phase}
                      </Typography>
                      <Chip
                        size="small"
                        label={step.tag}
                        sx={{
                          height: 22,
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          bgcolor: isCenterHighlight
                            ? 'rgba(56, 189, 248, 0.14)'
                            : '#eff6ff',
                          color: isCenterHighlight ? '#7dd3fc' : '#1d4ed8',
                          border: isCenterHighlight
                            ? '1px solid rgba(56, 189, 248, 0.3)'
                            : '1px solid #dbeafe',
                        }}
                      />
                    </Box>

                    {/* Step Title on Desktop */}
                    <Typography
                      variant="h6"
                      sx={{
                        display: { xs: 'none', lg: 'block' },
                        fontWeight: 800,
                        fontSize: '1.12rem',
                        lineHeight: 1.3,
                        color: isCenterHighlight ? '#ffffff' : '#0f172a',
                        mb: 1,
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Step Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: isCenterHighlight ? '#94a3b8' : '#64748b',
                        lineHeight: 1.65,
                        fontSize: '0.86rem',
                        mb: 2.5,
                        minHeight: { lg: 68 },
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Step Visual Preview Element */}
                    <Box sx={{ mt: 'auto' }}>
                      {step.renderVisual()}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* BOTTOM PIPELINE FLOW INDICATOR / METRIC SUMMARY */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1.5, md: 3 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1, sm: 2 },
              py: 1.4,
              px: { xs: 2, sm: 3.5 },
              borderRadius: 99,
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
            }}
          >
            {[
              { label: 'IMAGE', sub: 'Input' },
              { label: 'AI EXTRACTION', sub: 'OCR + Vision' },
              { label: 'LEGAL VALIDATION', sub: 'LMR 2011' },
              { label: 'REPORT', sub: 'Compliance Score' },
            ].map((node, i) => (
              <React.Fragment key={node.label}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: i === 1 ? '#0284c7' : i === 3 ? '#16a34a' : '#2563eb',
                      boxShadow: i === 1 ? '0 0 8px #0284c7' : 'none',
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {node.label}
                    </Typography>
                  </Box>
                </Box>
                {i < 3 && (
                  <ArrowForwardRoundedIcon
                    sx={{
                      fontSize: 16,
                      color: '#94a3b8',
                      display: { xs: 'none', sm: 'inline-block' },
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
