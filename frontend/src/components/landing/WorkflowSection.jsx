import React, { useState } from 'react';
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

const themeColors = {
  primary: '#0a0f1e',
  accent: '#0d9488',
  accentLight: '#14b8a6',
  accentMint: '#2dd4bf',
  accentBg: '#f0fdfa',
  accentBorder: '#ccfbf1',
  border: '#e2e8f0',
  textPrimary: '#0a0f1e',
  textSecondary: '#475569',
  surfaceSubtle: '#f8fafc',
};

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 'step-01',
      number: '01',
      phase: 'INGESTION',
      title: 'Capture Product Label',
      icon: <CameraAltOutlinedIcon sx={{ fontSize: 24 }} />,
      description: 'Upload or capture an image of a packaged commodity label for automated inspection.',
      highlight: false,
      tag: 'Multi-angle Ready',
      renderVisual: () => (
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: `1px solid ${themeColors.border}`,
            boxShadow: '0 4px 16px rgba(10, 15, 30, 0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Mock Package Label Preview */}
            <Box
              sx={{
                width: 46,
                height: 58,
                borderRadius: 1.5,
                bgcolor: themeColors.surfaceSubtle,
                border: `1.5px solid #cbd5e1`,
                p: 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(10, 15, 30, 0.06)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: themeColors.accent }} />
                <Box sx={{ width: 20, height: 4, bgcolor: '#cbd5e1', borderRadius: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                <Box sx={{ width: 26, height: 3, bgcolor: '#94a3b8', borderRadius: 1 }} />
                <Box sx={{ width: 18, height: 3, bgcolor: '#cbd5e1', borderRadius: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.4, alignItems: 'flex-end', height: 8 }}>
                {[5, 8, 6, 8, 4, 7].map((h, i) => (
                  <Box key={i} sx={{ width: 1.8, height: `${h}px`, bgcolor: '#475569', borderRadius: 0.5 }} />
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.5 }}>
                <CloudUploadOutlinedIcon sx={{ fontSize: 16, color: themeColors.accent }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeColors.textPrimary, fontSize: '0.74rem' }}>
                  Label Image Intake
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: themeColors.textSecondary, fontSize: '0.68rem', display: 'block', mb: 0.8 }}>
                High-Resolution JPEG / PNG
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: themeColors.accent }} />
                <Typography variant="caption" sx={{ color: themeColors.accent, fontWeight: 700, fontSize: '0.66rem' }}>
                  Ready for OCR pipeline
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
      phase: 'AI EXTRACTION',
      title: 'AI Extracts Information',
      icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 24 }} />,
      description: 'OCR identifies declarations, net weights, dates, and manufacturer clauses automatically.',
      highlight: true,
      tag: 'Vision Engine',
      renderVisual: () => (
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: themeColors.primary,
            border: '1px solid rgba(45, 212, 191, 0.3)',
            boxShadow: '0 8px 24px rgba(10, 15, 30, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Stack spacing={0.8} sx={{ position: 'relative', zIndex: 1 }}>
            {[
              { key: 'MRP', val: '₹145.00 (incl. taxes)', conf: '99%' },
              { key: 'NET WT', val: '500 g', conf: '98%' },
              { key: 'MFR', val: 'Singla Foods Pvt Ltd', conf: '96%' },
            ].map(item => (
              <Box
                key={item.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 0.6,
                  px: 1,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Typography variant="caption" sx={{ color: themeColors.accentMint, fontFamily: 'monospace', fontWeight: 800, fontSize: '0.64rem' }}>
                    {item.key}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.68rem' }}>
                    {item.val}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: themeColors.accentMint, fontFamily: 'monospace', fontWeight: 700, fontSize: '0.62rem' }}>
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
      phase: 'LEGAL VERIFICATION',
      title: 'Validate Against LMR 2011',
      icon: <GavelOutlinedIcon sx={{ fontSize: 24 }} />,
      description: 'Extracted fields are tested against Legal Metrology Rules and standard metric schedules.',
      highlight: false,
      tag: 'Statutory Engine',
      renderVisual: () => (
        <Box
          sx={{
            p: 1.8,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: `1px solid ${themeColors.border}`,
            boxShadow: '0 4px 16px rgba(10, 15, 30, 0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <PolicyOutlinedIcon sx={{ fontSize: 15, color: themeColors.accent }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: themeColors.textPrimary, fontSize: '0.72rem' }}>
                LMR 2011 Rules Matched
              </Typography>
            </Box>
            <Chip
              size="small"
              label="Active"
              sx={{
                height: 18,
                fontSize: '0.6rem',
                fontWeight: 800,
                color: themeColors.accent,
                bgcolor: themeColors.accentBg,
                border: `1px solid ${themeColors.accentBorder}`,
              }}
            />
          </Box>

          <Stack spacing={0.8}>
            {[
              { rule: 'Rule 6(1)(a) Common Name', status: 'PASS' },
              { rule: 'Rule 6(1)(d) Net Quantity', status: 'PASS' },
              { rule: 'Rule 6(1)(e) Unit Sale Price', status: 'VERIFIED' },
            ].map(r => (
              <Box
                key={r.rule}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 0.6,
                  px: 0.8,
                  borderRadius: 1.5,
                  bgcolor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                }}
              >
                <Typography variant="caption" sx={{ color: themeColors.textSecondary, fontSize: '0.66rem', fontWeight: 600 }}>
                  {r.rule}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 13, color: themeColors.accent }} />
                  <Typography variant="caption" sx={{ fontSize: '0.62rem', fontWeight: 800, color: themeColors.accent }}>
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
      phase: 'DOSSIER GENERATION',
      title: 'Generate Compliance Report',
      icon: <FactCheckOutlinedIcon sx={{ fontSize: 24 }} />,
      description: 'Receive an audit dossier detailing compliant, missing, or non-conforming packaging clauses.',
      highlight: false,
      tag: 'Audit Ready',
      renderVisual: () => (
        <Box
          sx={{
            p: 1.8,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: `1px solid ${themeColors.border}`,
            boxShadow: '0 4px 16px rgba(10, 15, 30, 0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: themeColors.accentBg,
                  border: `2px solid ${themeColors.accent}`,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 900, color: themeColors.accent }}>
                  96%
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: themeColors.textPrimary, display: 'block', fontSize: '0.74rem' }}>
                  Compliance Score
                </Typography>
                <Typography variant="caption" sx={{ color: themeColors.accent, fontWeight: 700, fontSize: '0.66rem' }}>
                  Statutory Conformance
                </Typography>
              </Box>
            </Box>
            <VerifiedRoundedIcon sx={{ color: themeColors.accent, fontSize: 18 }} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 0.8,
              borderRadius: 2,
              bgcolor: themeColors.surfaceSubtle,
              border: `1px solid ${themeColors.border}`,
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: themeColors.textPrimary, fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                7 / 7
              </Typography>
              <Typography variant="caption" sx={{ color: themeColors.textSecondary, fontSize: '0.62rem' }}>
                Mandatory
              </Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: themeColors.border }} />
            <Box>
              <Typography variant="caption" sx={{ color: themeColors.textPrimary, fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                0 Alerts
              </Typography>
              <Typography variant="caption" sx={{ color: themeColors.textSecondary, fontSize: '0.62rem' }}>
                Violations
              </Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: themeColors.border }} />
            <Box>
              <Typography variant="caption" sx={{ color: themeColors.accent, fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>
                PDF / JSON
              </Typography>
              <Typography variant="caption" sx={{ color: themeColors.textSecondary, fontSize: '0.62rem' }}>
                Dossier
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
        py: { xs: 10, md: 15 },
        bgcolor: themeColors.surfaceSubtle,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 6, md: 9 } }}>
          <Typography
            sx={{
              color: themeColors.accent,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              display: 'inline-block',
              mb: 1.5,
            }}
          >
            HOW JARVIS WORKS
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              color: themeColors.textPrimary,
              letterSpacing: '-0.03em',
            }}
          >
            A continuous, intelligent compliance journey.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: themeColors.textSecondary,
              fontSize: { xs: '1rem', md: '1.12rem' },
              lineHeight: 1.7,
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            JARVIS transforms a packaged product label image into a clear, AI-powered legal metrology compliance analysis.
          </Typography>
        </Box>

        {/* Pipeline Container */}
        <Box sx={{ position: 'relative' }}>
          {/* Desktop Connecting Line */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              top: 40,
              left: '12%',
              right: '12%',
              height: 2,
              bgcolor: themeColors.border,
              background: `linear-gradient(90deg, ${themeColors.border} 0%, ${themeColors.accent} 50%, ${themeColors.border} 100%)`,
              zIndex: 1,
            }}
          />

          <Grid container spacing={{ xs: 3, lg: 2.5 }} sx={{ position: 'relative', zIndex: 2 }}>
            {steps.map(step => {
              const isCenterHighlight = step.highlight;

              return (
                <Grid item xs={12} sm={6} lg={3} key={step.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Step Hub Node */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'flex-start', lg: 'center' },
                      mb: 2.5,
                      position: 'relative',
                      zIndex: 3,
                    }}
                  >
                    <Box
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                      sx={{
                        position: 'relative',
                        width: { xs: 68, lg: 80 },
                        height: { xs: 68, lg: 80 },
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                        bgcolor: isCenterHighlight ? themeColors.primary : '#ffffff',
                        color: isCenterHighlight ? themeColors.accentMint : themeColors.textPrimary,
                        border: isCenterHighlight
                          ? `2px solid ${themeColors.accentMint}`
                          : `2px solid ${themeColors.border}`,
                        boxShadow: isCenterHighlight
                          ? '0 8px 25px rgba(10, 15, 30, 0.25)'
                          : '0 4px 14px rgba(10, 15, 30, 0.04)',
                        transform: activeStep === step.id ? 'scale(1.06)' : 'scale(1)',
                        '&:hover': {
                          borderColor: themeColors.accent,
                        },
                      }}
                    >
                      {step.icon}

                      {/* Step Number */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -6,
                          bgcolor: isCenterHighlight ? themeColors.accent : '#ffffff',
                          color: isCenterHighlight ? '#ffffff' : themeColors.primary,
                          fontSize: '0.7rem',
                          fontWeight: 900,
                          px: 0.9,
                          py: 0.2,
                          borderRadius: 99,
                          border: `1px solid ${themeColors.border}`,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>

                    {/* Step Title on Mobile next to Node */}
                    <Box sx={{ ml: 2, display: { xs: 'block', lg: 'none' } }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: themeColors.accent, letterSpacing: '0.08em' }}>
                        {step.phase}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: themeColors.textPrimary, fontSize: '1.05rem' }}>
                        {step.title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Step Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3.5,
                      p: { xs: 2.5, lg: 2.8 },
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      bgcolor: isCenterHighlight ? '#0d1326' : '#ffffff',
                      color: isCenterHighlight ? '#f8fafc' : themeColors.textPrimary,
                      border: isCenterHighlight
                        ? `1.5px solid rgba(45, 212, 191, 0.35)`
                        : `1px solid ${themeColors.border}`,
                      boxShadow: '0 4px 20px rgba(10, 15, 30, 0.03)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px rgba(10, 15, 30, 0.08)',
                        borderColor: themeColors.accent,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          color: isCenterHighlight ? themeColors.accentMint : themeColors.accent,
                        }}
                      >
                        STEP {step.number} • {step.phase}
                      </Typography>
                      <Chip
                        size="small"
                        label={step.tag}
                        sx={{
                          height: 20,
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          bgcolor: isCenterHighlight ? 'rgba(45, 212, 191, 0.15)' : themeColors.surfaceSubtle,
                          color: isCenterHighlight ? themeColors.accentMint : themeColors.textSecondary,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        display: { xs: 'none', lg: 'block' },
                        fontWeight: 800,
                        fontSize: '1.08rem',
                        lineHeight: 1.3,
                        color: isCenterHighlight ? '#ffffff' : themeColors.textPrimary,
                        mb: 1,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isCenterHighlight ? '#94a3b8' : themeColors.textSecondary,
                        lineHeight: 1.65,
                        fontSize: '0.86rem',
                        mb: 2.5,
                        minHeight: { lg: 58 },
                      }}
                    >
                      {step.description}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                      {step.renderVisual()}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Bottom Flow Ribbon */}
        <Box sx={{ mt: 7, display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 1.2,
              px: 3.5,
              borderRadius: 99,
              bgcolor: '#ffffff',
              border: `1px solid ${themeColors.border}`,
              boxShadow: '0 4px 14px rgba(10, 15, 30, 0.04)',
            }}
          >
            {[
              'IMAGE CAPTURE',
              'AI OCR EXTRACTION',
              'LMR 2011 VERIFICATION',
              'AUDIT DOSSIER',
            ].map((label, i) => (
              <React.Fragment key={label}>
                <Typography sx={{ fontSize: '0.74rem', fontWeight: 800, color: themeColors.primary, letterSpacing: '0.04em' }}>
                  {label}
                </Typography>
                {i < 3 && (
                  <ArrowForwardRoundedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                )}
              </React.Fragment>
            ))}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
