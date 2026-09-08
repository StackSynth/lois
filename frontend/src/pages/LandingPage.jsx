import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToastContext } from '../App';
import { runDemo } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GavelIcon from '@mui/icons-material/Gavel';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PROCESS_STEPS = ['Capture Label', 'AI Extraction', 'Validate Rules', 'View Report'];

const FEATURES = [
  { icon: <SmartToyIcon sx={{ fontSize: 32 }} />, title: 'AI-Powered OCR', desc: 'Advanced text extraction from product labels using Tesseract.js with Google Cloud Vision ready architecture.' },
  { icon: <GavelIcon sx={{ fontSize: 32 }} />, title: 'Rule Engine', desc: 'Configurable compliance rules based on Legal Metrology (Packaged Commodities) Rules, 2011.' },
  { icon: <BarChartIcon sx={{ fontSize: 32 }} />, title: 'Compliance Scoring', desc: 'Weighted scoring system with detailed field-by-field validation and confidence metrics.' },
  { icon: <SearchIcon sx={{ fontSize: 32 }} />, title: 'Inspector Console', desc: 'Audit trail dashboard for reviewing scan history, filtering results, and generating reports.' },
  { icon: <LightbulbIcon sx={{ fontSize: 32 }} />, title: 'AI Explanations', desc: 'Human-readable explanations for each compliance finding with suggested corrections.' },
  { icon: <RocketLaunchIcon sx={{ fontSize: 32 }} />, title: 'Production Ready', desc: 'Modular architecture with PostgreSQL-ready models and swappable OCR backends.' },
];

const DEMO_PRODUCTS = [
  { id: 'demo-a', name: 'Sunrise Premium Basmati Rice', category: 'Food Product', score: '~92', status: 'Mostly Compliant', color: 'success', emoji: '🍚' },
  { id: 'demo-b', name: 'GlowFresh Hydrating Face Wash', category: 'Cosmetic', score: '~68', status: 'Needs Attention', color: 'warning', emoji: '🧴' },
  { id: 'demo-c', name: 'QuickBite Instant Noodles', category: 'Food Product', score: '~41', status: 'Non-Compliant', color: 'error', emoji: '🍜' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          setVisibleSections(previous => new Set(previous).add(entry.target.dataset.section));
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-section, [data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDemo = async (demoId) => {
    try {
      toast.info('Loading demo product...');
      const result = await runDemo(demoId);
      navigate(`/report/${result.data.id}`);
    } catch (err) {
      toast.error('Failed to load demo: ' + err.message);
    }
  };

  const sectionFade = { opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' };

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', py: 10, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Chip label="🏛️ Smart India Hackathon 2026 • SIH26034" color="info" variant="outlined" sx={{ mb: 3 }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, mb: 2, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            JARVIS
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Snap. Scan. Stay Compliant.
          </Typography>
          <Typography variant="subtitle1" sx={{ maxWidth: 550, mx: 'auto', mb: 4, fontSize: '1.1rem' }}>
            AI-assisted packaged commodity label compliance checking powered by OCR and the Legal Metrology (Packaged Commodities) Rules, 2011.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" startIcon={<CameraAltIcon />} component={Link} to="/scan" sx={{ px: 4, py: 1.5 }}>
              Scan a Product
            </Button>
            <Button variant="outlined" size="large" startIcon={<PlayArrowIcon />} href="#demo" sx={{ px: 4, py: 1.5 }}>
              View Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Process */}
      <Container maxWidth="md" sx={{ py: 8 }} data-section="process">
        <Typography variant="h4" align="center" gutterBottom sx={{ animation: visibleSections.has('process') ? 'processFadeIn 0.55s ease both' : 'none', '@keyframes processFadeIn': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>How It Works</Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 5, animation: visibleSections.has('process') ? 'processFadeIn 0.55s ease 0.12s both' : 'none', '@keyframes processFadeIn': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>Four simple steps to check label compliance</Typography>
        <Stepper activeStep={-1} alternativeLabel sx={{ animation: visibleSections.has('process') ? 'processFadeIn 0.65s ease 0.24s both' : 'none', '@keyframes processFadeIn': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'translateY(0)' } }, '.MuiStepConnector-line': { borderColor: 'primary.main' } }}>
          {PROCESS_STEPS.map(label => (
            <Step key={label} completed={false}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      {/* Features */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }} className="fade-section" style={sectionFade} data-section="features">
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>Key Features</Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>Built for accuracy, transparency, and scale</Typography>
          <Grid container spacing={3}>
            {FEATURES.map(feat => (
              <Grid item xs={12} sm={6} md={4} key={feat.title}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 4 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{feat.icon}</Box>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>{feat.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{feat.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Demo */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="demo" className="fade-section" style={sectionFade} data-section="demo">
        <Typography variant="h4" align="center" gutterBottom>Try a Demo</Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
          Experience the full compliance checking flow with pre-loaded sample products.
        </Typography>
        <Grid container spacing={3}>
          {DEMO_PRODUCTS.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '2rem' }}>{product.emoji}</Typography>
                    <Chip label="DEMO" size="small" color="warning" variant="outlined" />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: '1rem' }}>{product.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{product.category}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, py: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }} color={`${product.color}.main`}>{product.score}</Typography>
                    <Typography variant="body2" color={`${product.color}.main`} sx={{ fontWeight: 600 }}>{product.status}</Typography>
                  </Box>
                  <Button variant="outlined" fullWidth endIcon={<ArrowForwardIcon />} onClick={() => handleDemo(product.id)} sx={{ mt: 'auto' }}>
                    Try This Demo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Disclaimer */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ bgcolor: 'warning.light', border: 1, borderColor: 'warning.main' }}>
          <CardContent sx={{ py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>⚠️ Prototype Disclaimer:</strong> This application is a hackathon prototype demonstrating AI-assisted label compliance checking. The rule engine contains representative rules from the Legal Metrology (Packaged Commodities) Rules, 2011 and requires professional legal verification before production use.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Divider />
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 900, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>JARVIS</Typography>
        <Typography variant="body2" color="text.secondary">Built for Smart India Hackathon 2026 • Problem Statement SIH26034</Typography>
        <Typography variant="caption" color="text.secondary">Packaged Commodities Compliance Checker</Typography>
      </Box>
    </Box>
  );
}
