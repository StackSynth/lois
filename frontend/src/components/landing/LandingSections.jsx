import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeGroup = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const sectionSx = { py: { xs: 8, md: 13 } };
const eyebrowSx = { color: '#2563eb', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' };
const panelSx = { border: '1px solid rgba(15,23,42,0.08)', borderRadius: 5, bgcolor: 'rgba(255,255,255,0.78)', boxShadow: '0 18px 60px rgba(37,99,235,0.08)' };

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return <Box sx={{ textAlign: align, maxWidth: align === 'center' ? 720 : 640, mx: align === 'center' ? 'auto' : 0, mb: 5 }}>
    <Typography sx={eyebrowSx}>{eyebrow}</Typography>
    <Typography variant="h2" sx={{ mt: 1.2, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.05, color: '#0f172a' }}>{title}</Typography>
    <Typography variant="body1" sx={{ mt: 2, color: '#64748b', lineHeight: 1.75 }}>{copy}</Typography>
  </Box>;
}

export function LandingNav() {
  return <Box component="nav" sx={{ position: 'absolute', top: 18, left: 0, right: 0, zIndex: 10 }}>
    <Container maxWidth="xl">
      <Paper sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 4 }, px: { xs: 1.5, md: 2.5 }, py: 1.1, borderRadius: 99, bgcolor: 'rgba(255,255,255,0.76)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 12px 40px rgba(15,23,42,0.08)' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: '#0f172a', mr: { xs: 0, md: 2 } }}>
          <Box sx={{ width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: '#16324f', color: '#fff', fontWeight: 900 }}>J</Box>
          <Typography sx={{ fontWeight: 900, letterSpacing: '0.08em', display: { xs: 'none', sm: 'block' } }}>JARVIS</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flex: 1 }}>
          {['Features', 'How it works', 'Technology', 'Impact'].map(label => <Typography key={label} component="a" href={`#${label.toLowerCase().replaceAll(' ', '-')}`} sx={{ color: '#64748b', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 700, '&:hover': { color: '#16324f' } }}>{label}</Typography>)}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <Button component={Link} to="/signin" sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: '#475569' }}>Login</Button>
          <Button component={Link} to="/scan" variant="contained" sx={{ borderRadius: 99, bgcolor: '#16324f', px: { xs: 1.8, md: 2.5 }, '&:hover': { bgcolor: '#0f263b' } }}>Get started</Button>
        </Box>
      </Paper>
    </Container>
  </Box>;
}

export function Hero() {
  return <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 14, md: 17 }, pb: { xs: 8, md: 13 }, bgcolor: '#f8fafc' }}>
    <Box sx={{ position: 'absolute', width: 620, height: 620, borderRadius: '50%', top: -280, left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(56,189,248,0.24), rgba(37,99,235,0.08) 42%, transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' }} />
    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      <motion.div initial="hidden" animate="visible" variants={fadeGroup}>
        <Box sx={{ textAlign: 'center', maxWidth: 880, mx: 'auto' }}>
          <motion.div variants={fadeUp}><Chip icon={<AutoAwesomeRoundedIcon />} label="AI-powered compliance intelligence" sx={{ bgcolor: '#eaf3ff', color: '#2563eb', fontWeight: 800, border: '1px solid #bfdbfe' }} /></motion.div>
          <motion.div variants={fadeUp}><Typography variant="h1" sx={{ mt: 3, fontSize: { xs: '3.4rem', sm: '5rem', md: '7rem' }, lineHeight: 0.94, letterSpacing: '-0.07em', color: '#0f172a' }}>Stop guessing.<br /><Box component="span" sx={{ color: '#2563eb' }}>Start scanning.</Box></Typography></motion.div>
          <motion.div variants={fadeUp}><Typography variant="h5" sx={{ mt: 3, fontWeight: 700, color: '#16324f' }}>Check every label. Stay compliant.</Typography></motion.div>
          <motion.div variants={fadeUp}><Typography sx={{ maxWidth: 650, mx: 'auto', mt: 2, color: '#64748b', fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.75 }}>Jarvis helps manufacturers, retailers, and inspectors analyze packaged product labels and verify declarations against the Legal Metrology (Packaged Commodities) Rules, 2011.</Typography></motion.div>
          <motion.div variants={fadeUp}><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={1.5} sx={{ mt: 4 }}><Button component={Link} to="/scan" variant="contained" size="large" startIcon={<CameraAltOutlinedIcon />} sx={{ borderRadius: 99, px: 3.5, py: 1.5, bgcolor: '#2563eb' }}>Scan a product</Button><Button href="#how-it-works" variant="outlined" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ borderRadius: 99, px: 3.5, py: 1.5, borderColor: '#cbd5e1', color: '#16324f' }}>See how it works</Button></Stack></motion.div>
          <motion.div variants={fadeUp}><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={{ xs: 1, sm: 3 }} sx={{ mt: 3 }}><Typography variant="caption" sx={{ color: '#64748b' }}><CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#16a34a', verticalAlign: 'middle', mr: 0.5 }} />AI-powered analysis</Typography><Typography variant="caption" sx={{ color: '#64748b' }}><CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#16a34a', verticalAlign: 'middle', mr: 0.5 }} />Rule-based validation</Typography><Typography variant="caption" sx={{ color: '#64748b' }}><CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#16a34a', verticalAlign: 'middle', mr: 0.5 }} />Instant reports</Typography></Stack></motion.div>
        </Box>
      </motion.div>
      <ProductPreview />
    </Container>
  </Box>;
}

function ProductPreview() {
  return <Box sx={{ maxWidth: 920, mx: 'auto', mt: { xs: 7, md: 10 }, position: 'relative', px: { xs: 0, md: 4 } }}>
    <Paper sx={{ ...panelSx, p: { xs: 2, md: 3 }, borderRadius: { xs: 3, md: 5 }, position: 'relative', zIndex: 2, bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}><Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: '#16324f', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900 }}>J</Box><Box><Typography variant="caption" sx={{ color: '#94a3b8' }}>Compliance analysis</Typography><Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>Singla's Multigrain Cookies</Typography></Box></Box><Chip label="In review" size="small" sx={{ color: '#92400e', bgcolor: 'rgba(255,247,237,0.58)', border: '1px solid rgba(245,158,11,0.28)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 8px 22px rgba(245,158,11,0.12)', fontWeight: 800 }} /></Box>
      <Grid container spacing={2}>
        {[['MRP', '₹50', '#16a34a'], ['Net quantity', '200g', '#16a34a'], ['Manufacturer', 'Detected', '#16a34a'], ['Unit price', 'Needs review', '#f59e0b']].map(([label, value, color]) => <Grid item xs={6} sm={3} key={label}><Box sx={{ p: 1.6, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}><Typography variant="caption" sx={{ color: '#64748b' }}>{label}</Typography><Typography variant="body2" sx={{ mt: 0.5, fontWeight: 800, color }}>{value}</Typography></Box></Grid>)}
      </Grid>
      <Box sx={{ mt: 2, p: 2, borderRadius: 2.5, bgcolor: '#eff6ff', display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}><Box><Typography variant="caption" sx={{ color: '#64748b' }}>Compliance score</Typography><Typography sx={{ fontSize: '2.3rem', fontWeight: 900, lineHeight: 1, color: '#2563eb' }}>72%</Typography></Box><Box sx={{ flex: 1, width: '100%' }}><Typography variant="body2" sx={{ color: '#16324f', fontWeight: 800 }}>6 required declarations missing</Typography><Typography variant="caption" sx={{ color: '#64748b' }}>1 item needs manual review</Typography></Box><Button variant="contained" size="small" sx={{ borderRadius: 99, bgcolor: '#16324f' }}>View full report</Button></Box>
    </Paper>
    <Paper sx={{ position: 'absolute', zIndex: 3, left: { xs: -8, md: -50 }, top: { xs: 36, md: 55 }, p: 1.5, borderRadius: 3, display: { xs: 'none', sm: 'block' }, bgcolor: 'rgba(255,255,255,0.9)', border: '1px solid #dbeafe', boxShadow: '0 14px 34px rgba(37,99,235,0.14)' }}><Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800 }}>AI OCR</Typography><Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 700, mt: 0.3 }}>Label text extracted</Typography><Typography variant="caption" sx={{ color: '#64748b' }}>successfully</Typography></Paper>
    <Paper sx={{ position: 'absolute', zIndex: 3, right: { xs: -8, md: -50 }, top: { xs: 45, md: 70 }, p: 1.5, borderRadius: 3, display: { xs: 'none', sm: 'block' }, bgcolor: 'rgba(255,255,255,0.9)', border: '1px solid #dbeafe', boxShadow: '0 14px 34px rgba(37,99,235,0.14)' }}><Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800 }}>LEGAL METROLOGY</Typography><Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 700, mt: 0.3 }}>LMR 2011 active</Typography><Typography variant="caption" sx={{ color: '#64748b' }}>validation rules loaded</Typography></Paper>
    <Paper sx={{ position: 'absolute', zIndex: 3, right: { xs: 20, md: 90 }, bottom: -30, p: 1.5, borderRadius: 3, display: { xs: 'none', sm: 'block' }, bgcolor: '#16324f', boxShadow: '0 14px 34px rgba(15,23,42,0.18)' }}><Typography variant="caption" sx={{ color: '#7dd3c7', fontWeight: 800 }}>REPORT READY</Typography><Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, mt: 0.3 }}>Download PDF compliance report</Typography></Paper>
  </Box>;
}

export function ProblemSection() {
  const cards = [['Manual inspection', 'Checking hundreds of product labels manually consumes time and resources.', <MenuBookOutlinedIcon />], ['Human errors', 'MRP, net quantity, manufacturer information, and unit price can be missed.', <WarningAmberRoundedIcon />], ['Compliance risk', 'Non-compliance can lead to penalties, recalls, and regulatory issues.', <SecurityOutlinedIcon />]];
  return <Box sx={{ ...sectionSx, bgcolor: '#fff' }}><Container maxWidth="xl"><SectionHeading eyebrow="The old way" title="Manual label inspection should not be this difficult." copy="Packaged commodity labels carry multiple mandatory declarations. Manual verification is slow, inconsistent, and prone to human error." />
    <Grid container spacing={2}>{cards.map(([title, copy, icon]) => <Grid item xs={12} md={4} key={title}><Paper sx={{ ...panelSx, p: 3.5, height: '100%', boxShadow: 'none', bgcolor: '#f8fafc' }}><Box sx={{ color: '#2563eb', mb: 2 }}>{icon}</Box><Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 800 }}>{title}</Typography><Typography sx={{ mt: 1, color: '#64748b', lineHeight: 1.7 }}>{copy}</Typography></Paper></Grid>)}</Grid>
  </Container></Box>;
}

export { WorkflowSection } from './WorkflowSection';


export function FeaturesSection() {
  const features = [['AI-powered OCR', 'Automatically extracts product information from packaging labels.', <AutoAwesomeRoundedIcon />], ['Rule-based validation', 'Maps extracted fields against the Legal Metrology Rules, 2011.', <GavelOutlinedIcon />], ['Confidence scoring', 'Identifies uncertain results and sends low-confidence scans for review.', <InsightsOutlinedIcon />], ['AI-assisted analysis', 'Explains missing or invalid declarations in plain language.', <FactCheckOutlinedIcon />], ['Multilingual support', 'Designed for labels containing multiple regional languages.', <LanguageOutlinedIcon />], ['Compliance reports', 'Generate downloadable reports for auditing and documentation.', <ArrowUpwardRoundedIcon />], ['Inspector console', 'Review scan history, filter outcomes, and manage follow-up work.', <TuneOutlinedIcon />], ['Digital audit trail', 'Maintain searchable compliance history across products and manufacturers.', <SecurityOutlinedIcon />]];
  return <Box id="features" sx={{ ...sectionSx, bgcolor: '#fff' }}><Container maxWidth="xl"><SectionHeading eyebrow="Product capabilities" title="Built for faster, smarter compliance." copy="A focused toolkit for the people who prepare, inspect, and document packaged goods." />
    <Grid container spacing={2}>{features.map(([title, copy, icon]) => <Grid item xs={12} sm={6} md={3} key={title}><Paper sx={{ ...panelSx, p: 2.7, minHeight: 190, boxShadow: 'none', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 45px rgba(37,99,235,0.12)' }, transition: 'transform .25s ease, box-shadow .25s ease' }}><Box sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: '#eff6ff', color: '#2563eb' }}>{icon}</Box><Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 800, color: '#0f172a' }}>{title}</Typography><Typography variant="body2" sx={{ mt: 1, color: '#64748b', lineHeight: 1.65 }}>{copy}</Typography></Paper></Grid>)}</Grid>
  </Container></Box>;
}

export function DemoSection({ onDemo }) {
  const products = [
    ['demo-a', 'Sunrise Premium Basmati Rice', 'Food product', '~92', 'Mostly compliant', '#16a34a'],
    ['demo-b', 'GlowFresh Hydrating Face Wash', 'Cosmetic', '~68', 'Needs attention', '#f59e0b'],
    ['demo-c', 'QuickBite Instant Noodles', 'Food product', '~41', 'Non-compliant', '#dc2626'],
  ];
  return <Box id="demo" sx={{ ...sectionSx, bgcolor: '#f8fafc' }}><Container maxWidth="xl"><SectionHeading eyebrow="Interactive demos" title="See the full compliance journey." copy="Open a pre-loaded product scan to explore the same report experience your team gets after a real label upload." align="center" /><Grid container spacing={2}>{products.map(([id, name, category, score, status, color]) => <Grid item xs={12} md={4} key={id}><Paper sx={{ ...panelSx, p: 3, height: '100%', boxShadow: 'none' }}><Chip label="DEMO PRODUCT" size="small" sx={{ color: '#2563eb', bgcolor: '#eff6ff', fontWeight: 800 }} /><Typography variant="h6" sx={{ mt: 2, color: '#0f172a', fontWeight: 800 }}>{name}</Typography><Typography variant="body2" sx={{ mt: 0.5, color: '#64748b' }}>{category}</Typography><Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 2 }}><Typography sx={{ fontSize: '2.2rem', fontWeight: 900, color }}>{score}</Typography><Typography variant="body2" sx={{ color, fontWeight: 800 }}>{status}</Typography></Box><Button fullWidth variant="outlined" endIcon={<ArrowForwardRoundedIcon />} onClick={() => onDemo(id)} sx={{ mt: 2, borderRadius: 99 }}>Open demo report</Button></Paper></Grid>)}</Grid></Container></Box>;
}

export function AiSection() {
  return <Box sx={{ ...sectionSx, bgcolor: '#f8fafc' }}><Container maxWidth="xl"><Grid container spacing={5} alignItems="center"><Grid item xs={12} md={5}><SectionHeading eyebrow="AI assistant" title="Compliance intelligence, powered by AI." copy="Jarvis does more than find text. It turns evidence into an explanation your team can review and act on." /><Button component={Link} to="/scan" variant="contained" startIcon={<UploadFileOutlinedIcon />} sx={{ borderRadius: 99, bgcolor: '#2563eb' }}>Try a live scan</Button></Grid><Grid item xs={12} md={7}><Paper sx={{ ...panelSx, p: { xs: 2, md: 3 }, bgcolor: '#fff' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 2, borderBottom: '1px solid #e2e8f0' }}><Box sx={{ width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: '#16324f', color: '#fff', fontWeight: 900 }}>J</Box><Box><Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>Jarvis AI</Typography><Typography variant="caption" sx={{ color: '#16a34a' }}>Analysis ready</Typography></Box></Box><Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}><Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>USER</Typography><Typography variant="body2" sx={{ mt: 0.5, color: '#334155' }}>Uploaded product label image</Typography></Box><Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: '#eff6ff', border: '1px solid #dbeafe' }}><Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800 }}>JARVIS AI</Typography><Typography variant="body2" sx={{ mt: 0.8, color: '#16324f', lineHeight: 1.7 }}>I've analyzed this packaged product label. I found a few items that need your attention:</Typography><Stack spacing={0.7} sx={{ mt: 1.5 }}>{['Product name detected', 'MRP and net quantity detected', 'Manufacturer declaration needs verification', 'Unit price has low OCR confidence'].map((item, i) => <Typography key={item} variant="body2" sx={{ color: i < 2 ? '#168f8a' : '#b45309', fontWeight: 700 }}><CheckCircleRoundedIcon sx={{ fontSize: 15, verticalAlign: 'middle', mr: 0.7 }} />{item}</Typography>)}</Stack></Box><Box sx={{ mt: 2, p: 1.5, border: '1px dashed #bfdbfe', borderRadius: 3, textAlign: 'center', color: '#64748b' }}><UploadFileOutlinedIcon sx={{ color: '#2563eb' }} /><Typography variant="body2" sx={{ mt: 0.5 }}>Drop a product label here or upload image</Typography></Box></Paper></Grid></Grid></Container></Box>;
}

export function TechnologySection() {
  const tech = [['Frontend', 'React.js and Material UI'], ['Backend', 'Node.js, Express, REST APIs'], ['AI and OCR', 'Google Vision-ready OCR and field detection'], ['Data layer', 'PostgreSQL-ready report models'], ['Deployment', 'Vercel and cloud infrastructure']];
  return <Box id="technology" sx={{ ...sectionSx, bgcolor: '#fff' }}><Container maxWidth="xl"><SectionHeading eyebrow="Technology" title="Built with reliable technology." copy="A modular architecture designed to keep the workflow transparent, swappable, and ready to grow." /><Grid container spacing={2}>{tech.map(([title, copy], index) => <Grid item xs={12} sm={6} md={index === 0 ? 4 : 2} key={title}><Paper sx={{ ...panelSx, p: 2.5, height: '100%', boxShadow: 'none', bgcolor: index === 0 ? '#16324f' : '#f8fafc' }}><Typography variant="caption" sx={{ color: index === 0 ? '#7dd3c7' : '#2563eb', fontWeight: 800 }}>{String(index + 1).padStart(2, '0')}</Typography><Typography variant="subtitle1" sx={{ mt: 3, color: index === 0 ? '#fff' : '#0f172a', fontWeight: 800 }}>{title}</Typography><Typography variant="body2" sx={{ mt: 1, color: index === 0 ? '#cbd5e1' : '#64748b', lineHeight: 1.6 }}>{copy}</Typography></Paper></Grid>)}</Grid></Container></Box>;
}

export function ImpactSection() {
  const impacts = [['Consumers', 'Accurate and transparent product information that protects consumer rights.'], ['Businesses', 'Fast self-checking before products reach the market and reduced regulatory risk.'], ['Inspectors', 'A scalable digital tool for reviewing and auditing thousands of products.'], ['Government', 'A searchable digital compliance trail for improved regulatory monitoring.']];
  return <Box id="impact" sx={{ ...sectionSx, bgcolor: '#f8fafc' }}><Container maxWidth="xl"><SectionHeading eyebrow="Why it matters" title="Compliance that benefits everyone." copy="Better label decisions create a clearer chain of trust from manufacturer to consumer." align="center" /><Grid container spacing={2}>{impacts.map(([title, copy]) => <Grid item xs={12} sm={6} md={3} key={title}><Paper sx={{ ...panelSx, p: 3, height: '100%', boxShadow: 'none' }}><Typography variant="h6" sx={{ color: '#16324f', fontWeight: 800 }}>{title}</Typography><Typography variant="body2" sx={{ mt: 1.5, color: '#64748b', lineHeight: 1.7 }}>{copy}</Typography></Paper></Grid>)}</Grid></Container></Box>;
}

export function FinalCta() {
  return <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}><Box sx={{ borderRadius: { xs: 4, md: 6 }, p: { xs: 4, md: 7 }, position: 'relative', overflow: 'hidden', bgcolor: '#16324f', color: '#fff' }}><Box sx={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', right: -100, top: -180, background: 'radial-gradient(circle, rgba(56,189,248,.35), transparent 68%)' }} /><Box sx={{ position: 'relative', zIndex: 1, maxWidth: 650 }}><Typography sx={{ ...eyebrowSx, color: '#7dd3c7' }}>Start with one label</Typography><Typography variant="h2" sx={{ mt: 1.5, color: '#fff', fontSize: { xs: '2.3rem', md: '3.5rem' } }}>Ready to check your product label?</Typography><Typography sx={{ mt: 2, color: '#cbd5e1', lineHeight: 1.7 }}>Upload a packaged commodity label and let Jarvis analyze its compliance in seconds.</Typography><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}><Button component={Link} to="/scan" variant="contained" startIcon={<CameraAltOutlinedIcon />} sx={{ borderRadius: 99, bgcolor: '#fff', color: '#16324f', '&:hover': { bgcolor: '#e2e8f0' } }}>Start scanning</Button><Button component={Link} to="/dashboard" variant="outlined" sx={{ borderRadius: 99, color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>Explore dashboard</Button></Stack></Box></Box></Container>;
}

export function LandingFooter() {
  return <Box sx={{ bgcolor: '#fff', borderTop: '1px solid #e2e8f0', pt: 6, pb: 3 }}><Container maxWidth="xl"><Grid container spacing={4}><Grid item xs={12} md={5}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: '#16324f', color: '#fff', fontWeight: 900 }}>J</Box><Typography sx={{ fontWeight: 900, letterSpacing: '.08em', color: '#16324f' }}>JARVIS</Typography></Box><Typography variant="body2" sx={{ mt: 1.5, color: '#64748b' }}>Snap. Scan. Stay Compliant.</Typography></Grid><Grid item xs={6} sm={4} md={2}><Typography variant="caption" sx={{ ...eyebrowSx, color: '#16324f' }}>Product</Typography><Stack spacing={1} sx={{ mt: 1.5 }}><Typography component="a" href="#features" variant="body2" sx={{ color: '#64748b', textDecoration: 'none' }}>Features</Typography><Typography component="a" href="#how-it-works" variant="body2" sx={{ color: '#64748b', textDecoration: 'none' }}>How it works</Typography><Typography component="a" href="#technology" variant="body2" sx={{ color: '#64748b', textDecoration: 'none' }}>Technology</Typography></Stack></Grid><Grid item xs={6} sm={4} md={2}><Typography variant="caption" sx={{ ...eyebrowSx, color: '#16324f' }}>Resources</Typography><Stack spacing={1} sx={{ mt: 1.5 }}><Typography variant="body2" sx={{ color: '#64748b' }}>Legal Metrology rules</Typography><Typography variant="body2" sx={{ color: '#64748b' }}>Documentation</Typography></Stack></Grid><Grid item xs={12} sm={4} md={3}><Typography variant="caption" sx={{ ...eyebrowSx, color: '#16324f' }}>Workspace</Typography><Typography variant="body2" sx={{ mt: 1.5, color: '#64748b' }}>Built for manufacturers, retailers, and Legal Metrology inspectors.</Typography></Grid></Grid><Divider sx={{ my: 5 }} /><Typography variant="caption" sx={{ color: '#94a3b8' }}>© 2026 Jarvis. Built for Smart India Hackathon 2026.</Typography></Container></Box>;
}
