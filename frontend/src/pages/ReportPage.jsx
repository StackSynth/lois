import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { getScan } from '../services/api';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ScienceIcon from '@mui/icons-material/Science';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const STATUS_CHIP = {
  COMPLIANT: { label: 'Compliant', color: 'success', icon: <CheckCircleIcon sx={{ fontSize: 16 }} /> },
  MISSING: { label: 'Missing', color: 'error', icon: <CancelIcon sx={{ fontSize: 16 }} /> },
  INVALID: { label: 'Invalid', color: 'error', icon: <CancelIcon sx={{ fontSize: 16 }} /> },
  LOW_CONFIDENCE: { label: 'Review', color: 'warning', icon: <WarningAmberIcon sx={{ fontSize: 16 }} /> },
  NOT_APPLICABLE: { label: 'N/A', color: 'default' },
  REVIEW_REQUIRED: { label: 'Review', color: 'warning', icon: <WarningAmberIcon sx={{ fontSize: 16 }} /> },
  NEEDS_ATTENTION: { label: 'Needs Attention', color: 'warning', icon: <WarningAmberIcon sx={{ fontSize: 16 }} /> },
  NON_COMPLIANT: { label: 'Non-Compliant', color: 'error', icon: <CancelIcon sx={{ fontSize: 16 }} /> },
};

function StatusChip({ status }) {
  const cfg = STATUS_CHIP[status] || { label: status, color: 'default' };
  return <Chip label={cfg.label} color={cfg.color} size="small" icon={cfg.icon} />;
}

function ScoreCircle({ score, size = 160 }) {
  const getColor = () => score >= 85 ? 'success.main' : score >= 50 ? 'warning.main' : 'error.main';
  const getLabel = () => score >= 85 ? 'Compliant' : score >= 50 ? 'Needs Attention' : 'Non-Compliant';

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* Background */}
      <CircularProgress variant="determinate" value={100} size={size} thickness={3}
        sx={{ color: 'action.hover', position: 'absolute' }} />
      {/* Foreground */}
      <CircularProgress variant="determinate" value={score} size={size} thickness={3}
        sx={{ color: getColor(), '& .MuiCircularProgress-circle': { strokeLinecap: 'round', transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1)' } }} />
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1, color: getColor() }}>{score}</Typography>
        <Typography variant="caption" color="text.secondary">/ 100</Typography>
        <Chip label={getLabel()} color={score >= 85 ? 'success' : score >= 50 ? 'warning' : 'error'} size="small" sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
}

function pdfSafe(value) {
  return String(value ?? 'Not provided').replace(/[^\x00-\x7F]/g, '?');
}

function createCompliancePdf(scan) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let cursor = 20;

  const statusLabel = scan.overallStatus === 'COMPLIANT'
    ? 'COMPLIANT'
    : scan.overallStatus === 'NON_COMPLIANT' ? 'NON-COMPLIANT' : 'NEEDS REVIEW';
  const generatedAt = new Date();
  const scanDate = new Date(scan.timestamp);
  const fileDate = generatedAt.toISOString().slice(0, 10);
  const safeProductName = pdfSafe(scan.productName).replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'Product';
  const summary = scan.summary || {};
  const rules = scan.ruleResults || [];
  const fields = scan.extractedFields || [];
  const issues = rules.filter(rule => ['MISSING', 'INVALID', 'LOW_CONFIDENCE', 'REVIEW_REQUIRED'].includes(rule.status));
  const passed = rules.filter(rule => rule.status === 'COMPLIANT').length;
  const failed = rules.filter(rule => ['MISSING', 'INVALID'].includes(rule.status)).length;
  const review = rules.filter(rule => ['LOW_CONFIDENCE', 'REVIEW_REQUIRED'].includes(rule.status)).length;

  const ensureSpace = (height = 8) => {
    if (cursor + height > pageHeight - 16) {
      doc.addPage();
      cursor = 18;
    }
  };

  const write = (text, options = {}) => {
    const { size = 9, color = [35, 50, 65], bold = false, gap = 4 } = options;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(pdfSafe(text), contentWidth);
    ensureSpace(lines.length * (size * 0.45) + gap);
    doc.text(lines, margin, cursor);
    cursor += lines.length * (size * 0.45) + gap;
  };

  const sectionTitle = (title) => {
    ensureSpace(14);
    cursor += 3;
    doc.setFillColor(18, 48, 74);
    doc.rect(margin, cursor - 5, contentWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 3, cursor + 0.5);
    cursor += 10;
  };

  const row = (label, value, color = [35, 50, 65]) => {
    ensureSpace(9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(82, 103, 121);
    doc.text(pdfSafe(label), margin, cursor);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(pdfSafe(value), contentWidth - 46);
    doc.text(lines, margin + 46, cursor);
    cursor += Math.max(5, lines.length * 4.2) + 2;
  };

  doc.setFillColor(18, 48, 74);
  doc.rect(0, 0, pageWidth, 38, 'F');
  doc.setFillColor(125, 211, 199);
  doc.roundedRect(margin, 9, 16, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(18, 48, 74);
  doc.text('J', margin + 5.3, 20.2);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text('JARVIS', margin + 21, 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(207, 232, 229);
  doc.text('AI-assisted packaged commodities compliance', margin + 21, 22);

  cursor = 50;
  write('Legal Metrology Compliance Report', { size: 18, color: [18, 48, 74], bold: true, gap: 6 });
  write(scan.productName, { size: 13, color: [22, 143, 138], bold: true, gap: 7 });
  row('Report status', statusLabel, statusLabel === 'COMPLIANT' ? [22, 130, 75] : statusLabel === 'NON-COMPLIANT' ? [185, 28, 28] : [180, 105, 0]);
  row('Compliance score', `${scan.complianceScore ?? 0} / 100`);
  row('Scan date', scanDate.toLocaleString('en-IN'));
  row('Generated', generatedAt.toLocaleString('en-IN'));

  sectionTitle('Compliance summary');
  row('Declarations checked', rules.length || summary.compliant + summary.missing + summary.invalid + summary.review + summary.notApplicable);
  row('Passed declarations', passed || summary.compliant);
  row('Failed declarations', failed || (summary.missing || 0) + (summary.invalid || 0));
  row('Manual review items', review || summary.review);
  row('OCR confidence', `${Number(scan.ocrResult?.confidence || 0).toFixed(1)}%`);

  sectionTitle('Detailed field-level analysis');
  fields.forEach(field => {
    const status = field.status === 'found' ? 'PASS' : field.status === 'low_confidence' ? 'REVIEW' : 'MISSING';
    write(`${pdfSafe(field.label || field.field)}  |  ${status}  |  Confidence: ${field.confidence ?? 0}%`, { size: 9, bold: true, color: status === 'PASS' ? [22, 130, 75] : status === 'MISSING' ? [185, 28, 28] : [180, 105, 0], gap: 2 });
    write(`Extracted value: ${field.value || 'Not detected'}`, { size: 8.5, color: [82, 103, 121], gap: 4 });
  });

  sectionTitle('Missing and invalid declarations');
  if (issues.length === 0) {
    write('No missing, invalid, or manual-review declarations were detected.', { size: 9, color: [22, 130, 75], gap: 5 });
  } else {
    issues.forEach(rule => {
      write(`${rule.description}  |  ${rule.status}`, { size: 9, bold: true, color: [185, 28, 28], gap: 2 });
      write(`Rule reference: ${rule.reference || 'Configured Legal Metrology rule set'}`, { size: 8.5, color: [82, 103, 121], gap: 2 });
      write(`Recommendation: ${rule.explanation?.suggestion || 'Review the declaration and update the package label where required.'}`, { size: 8.5, gap: 5 });
    });
  }

  sectionTitle('AI-assisted explanation and recommendations');
  if (scan.aiExplanation) {
    write(`Assessment: ${scan.aiExplanation.overallAssessment || 'REVIEW'}`, { size: 9, bold: true, gap: 3 });
    write(scan.aiExplanation.summary || scan.aiExplanation.userExplanation || 'No summary provided.', { size: 9, gap: 4 });
    if (scan.aiExplanation.userExplanation && scan.aiExplanation.userExplanation !== scan.aiExplanation.summary) {
      write(scan.aiExplanation.userExplanation, { size: 9, gap: 4 });
    }
    (scan.aiExplanation.issues || []).forEach(issue => {
      write(`${issue.field || 'Declaration'}: ${issue.reason || issue.status || 'Review required'}`, { size: 8.5, gap: 2 });
      if (issue.recommendation) write(`Recommendation: ${issue.recommendation}`, { size: 8.5, color: [82, 103, 121], gap: 4 });
    });
    (scan.aiExplanation.recommendations || []).forEach(recommendation => write(`- ${recommendation}`, { size: 8.5, gap: 3 }));
  } else {
    write('No AI-assisted explanation is available. Review the field-level results and rule findings.', { size: 9, gap: 5 });
  }

  sectionTitle('Disclaimer');
  write('This report is generated by an AI-assisted analysis system and is intended to support review by manufacturers, compliance teams, and inspectors. Automated analysis should be manually verified by a qualified professional against the applicable Legal Metrology requirements.', { size: 8.5, color: [82, 103, 121], gap: 6 });

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(220, 226, 230);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 125, 138);
    doc.text('JARVIS | Legal Metrology Compliance Report', margin, pageHeight - 6);
    doc.text(`Page ${page} of ${pageCount}`, pageWidth - margin - 22, pageHeight - 6);
  }

  doc.save(`Jarvis_Compliance_Report_${safeProductName}_${fileDate}.pdf`);
}

export default function ReportPage() {
  const { scanId } = useParams();
  const location = useLocation();
  const navigationScan = location.state?.scan?.id === scanId ? location.state.scan : null;
  const [scan, setScan] = useState(navigationScan);
  const [loading, setLoading] = useState(!navigationScan);
  const [error, setError] = useState(null);
  const [expandedRules, setExpandedRules] = useState(new Set());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    if (navigationScan) {
      return;
    }

    let cachedScan = null;
    try {
      cachedScan = JSON.parse(sessionStorage.getItem(`jarvis-scan:${scanId}`) || 'null');
    } catch {
      cachedScan = null;
    }

    if (cachedScan?.id === scanId) {
      console.log('Using cached report ID:', scanId);
      setScan(cachedScan);
      setLoading(false);
      return;
    }

    const fetchScan = async () => {
      try {
        console.log('Fetching report ID:', scanId);
        const result = await getScan(scanId);
        if (!result?.data?.id || result.data.id !== scanId) {
          throw new Error('The report response did not contain the requested report ID.');
        }
        sessionStorage.setItem(`jarvis-scan:${scanId}`, JSON.stringify(result.data));
        setScan(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchScan();
  }, [scanId, navigationScan]);

  useEffect(() => {
    if (!loading && scan && location.state?.focusAi) {
      const el = document.getElementById('ai-analysis');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [loading, scan, location.state]);

  const toggleRule = (ruleId) => {
    setExpandedRules(prev => {
      const next = new Set(prev);
      if (next.has(ruleId)) next.delete(ruleId);
      else next.add(ruleId);
      return next;
    });
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    window.setTimeout(() => {
      try {
        createCompliancePdf(scan);
      } catch (pdfError) {
        console.error('Failed to generate compliance PDF:', pdfError);
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !scan) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <ErrorOutlinedIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>Report Not Found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>{error || 'This scan result could not be found.'}</Typography>
        <Button variant="contained" component={Link} to="/scan" startIcon={<QrCodeScannerIcon />}>Scan New Product</Button>
      </Container>
    );
  }

  const issueRules = scan.ruleResults?.filter(r => ['MISSING', 'INVALID', 'LOW_CONFIDENCE', 'REVIEW_REQUIRED'].includes(r.status)) || [];
  const aiIssuesByField = new Map(
    (scan.aiExplanation?.issues || []).map((issue) => [String(issue.field || '').toLowerCase(), issue])
  );

  const confColor = (c) => c >= 80 ? 'success' : c >= 60 ? 'warning' : 'error';
  const confChipLabel = (c) => c >= 80 ? 'High' : c >= 60 ? 'Medium' : 'Low';

  const getAiIssueForRule = (rule) => {
    const byField = aiIssuesByField.get(String(rule.field || '').toLowerCase());
    if (byField) return byField;
    return (scan.aiExplanation?.issues || []).find((issue) =>
      String(issue.field || '').toLowerCase().includes(String(rule.field || '').toLowerCase())
      || String(rule.description || '').toLowerCase().includes(String(issue.field || '').toLowerCase())
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Demo Banner */}
      {scan.isDemo && (
        <Alert severity="warning" icon={<ScienceIcon />} sx={{ mb: 3 }}>
          <AlertTitle>Demo / Sample Data</AlertTitle>
          This result was generated using pre-loaded demonstration data, not from actual OCR processing.
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Compliance Report</Typography>
          <Typography variant="h6" color="primary.main" fontWeight={600}>{scan.productName}</Typography>
          <Typography variant="caption" color="text.secondary">Scanned on {new Date(scan.timestamp).toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<QrCodeScannerIcon />} component={Link} to="/scan">Scan Another</Button>
          <Button variant="contained" startIcon={isGeneratingPdf ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon />} onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
            {isGeneratingPdf ? 'Generating report...' : 'Download PDF'}
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>Print</Button>
        </Box>
      </Box>

      {/* Score Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 6, py: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <ScoreCircle score={scan.complianceScore} />
          <Grid container spacing={2} sx={{ maxWidth: 400 }}>
            {[
              { label: 'Compliant', value: scan.summary?.compliant || 0, color: 'success' },
              { label: 'Needs Review', value: scan.summary?.review || 0, color: 'warning' },
              { label: 'Missing / Invalid', value: (scan.summary?.missing || 0) + (scan.summary?.invalid || 0), color: 'error' },
              { label: 'Not Applicable', value: scan.summary?.notApplicable || 0, color: 'default' },
            ].map(card => (
              <Grid item xs={6} key={card.label}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: card.color !== 'default' ? `${card.color}.light` : 'action.hover' }}>
                  <Typography variant="h4" fontWeight={800} color={card.color !== 'default' ? `${card.color}.main` : 'text.secondary'}>{card.value}</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{card.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* AI response and OCR quality summary */}
      <Box id="ai-analysis" sx={{ scrollMarginTop: 96 }}>
      {scan.aiExplanation && (
        <Alert
          severity={scan.aiExplanation.overallAssessment === 'PASS' ? 'success' : scan.aiExplanation.overallAssessment === 'FAIL' ? 'error' : 'warning'}
          icon={<SmartToyIcon />}
          sx={{ mb: 4, '& .MuiAlert-message': { width: '100%' } }}
        >
          <AlertTitle>AI analysis: {scan.aiExplanation.overallAssessment}</AlertTitle>
          <Typography variant="body2">{scan.aiExplanation.userExplanation || scan.aiExplanation.summary}</Typography>
          {scan.ocrResult?.confidence < 60 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              The image text was read with low confidence ({scan.ocrResult.confidence.toFixed(0)}%). Capture a clearer image with better lighting and make sure the label text is visible.
            </Typography>
          )}
        </Alert>
      )}
      </Box>

      {/* AI Extracted Information */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SmartToyIcon color="primary" /> AI Extracted Information
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {scan.extractedFields?.map(field => (
          <Grid item xs={12} sm={6} md={4} key={field.field}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ pb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{field.label}</Typography>
                  <StatusChip status={field.status === 'found' ? 'COMPLIANT' : field.status === 'low_confidence' ? 'LOW_CONFIDENCE' : 'MISSING'} />
                </Box>
                <Typography variant="body1" fontWeight={600} sx={{ mb: 1, wordBreak: 'break-word' }}>
                  {field.value || <Typography component="span" color="text.secondary" fontStyle="italic">Not detected</Typography>}
                </Typography>
                {field.confidence > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress variant="determinate" value={field.confidence} color={confColor(field.confidence)} sx={{ flex: 1 }} />
                    <Chip label={`${field.confidence}%`} size="small" color={confColor(field.confidence)} variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Compliance Table */}
      <Typography variant="h6" sx={{ mb: 2 }}>⚖️ Declaration Verification</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requirement</TableCell>
              <TableCell>Extracted Value</TableCell>
              <TableCell>Result</TableCell>
              <TableCell align="center">Confidence</TableCell>
              <TableCell>Rule Reference</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scan.ruleResults?.map(rule => (
              <React.Fragment key={rule.ruleId}>
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => toggleRule(rule.ruleId)}>
                  <TableCell><Typography variant="body2" fontWeight={500}>{rule.description}</Typography></TableCell>
                  <TableCell>
                    <Typography variant="body2">{rule.extractedValue || <Typography component="span" color="text.secondary" fontStyle="italic" variant="body2">Not detected</Typography>}</Typography>
                  </TableCell>
                  <TableCell><StatusChip status={rule.status} /></TableCell>
                  <TableCell align="center">
                    {rule.confidence != null ? (
                      <Chip label={`${rule.confidence}%`} size="small" color={confColor(rule.confidence)} variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    ) : '—'}
                  </TableCell>
                  <TableCell><Typography variant="caption" color="text.secondary">{rule.reference}</Typography></TableCell>
                  <TableCell align="center">
                    <ExpandMoreIcon fontSize="small" sx={{ transform: expandedRules.has(rule.ruleId) ? 'rotate(180deg)' : 'none', transition: '0.2s', color: 'text.secondary' }} />
                  </TableCell>
                </TableRow>
                {expandedRules.has(rule.ruleId) && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0 }}>
                      <Box sx={{ p: 3, bgcolor: 'action.hover' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <SmartToyIcon fontSize="small" color="primary" />
                          <Typography variant="subtitle2" color="primary.main">AI-Assisted Analysis</Typography>
                        </Box>
                        {(() => {
                          const aiIssue = getAiIssueForRule(rule);
                          return (
                            <>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {aiIssue?.reason || rule.explanation?.summary}
                              </Typography>
                              {aiIssue?.recommendation && (
                                <Alert severity="warning" variant="outlined" sx={{ mb: 1 }}>
                                  <Typography variant="body2"><strong>AI recommendation:</strong> {aiIssue.recommendation}</Typography>
                                </Alert>
                              )}
                              {!aiIssue && rule.explanation?.detail && (
                                <Alert severity="info" variant="outlined" sx={{ mb: 1 }}>
                                  <Typography variant="body2"><strong>Why it matters:</strong> {rule.explanation.detail}</Typography>
                                </Alert>
                              )}
                              {!aiIssue && rule.explanation?.suggestion && rule.status !== 'COMPLIANT' && (
                                <Alert severity="warning" variant="outlined" sx={{ mb: 1 }}>
                                  <Typography variant="body2"><strong>Suggested action:</strong> {rule.explanation.suggestion}</Typography>
                                </Alert>
                              )}
                            </>
                          );
                        })()}
                        <Chip label={`📜 ${rule.reference}`} size="small" variant="outlined" sx={{ mt: 1 }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Issues Requiring Attention */}
      {issueRules.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>⚠️ Issues Requiring Attention</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {issueRules.map(rule => (
              <Alert
                key={rule.ruleId}
                severity={['MISSING', 'INVALID'].includes(rule.status) ? 'error' : 'warning'}
                sx={{ '& .MuiAlert-message': { width: '100%' } }}
              >
                <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StatusChip status={rule.status} />
                  {rule.description}
                </AlertTitle>
                <Typography variant="body2" sx={{ mb: 1 }}>{rule.explanation?.summary}</Typography>
                {rule.explanation?.suggestion && (
                  <Typography variant="body2"><strong>Suggested correction:</strong> {rule.explanation.suggestion}</Typography>
                )}
                <Chip label={`📜 ${rule.reference}`} size="small" variant="outlined" sx={{ mt: 1 }} />
              </Alert>
            ))}
          </Box>
        </>
      )}

      {/* AI Explanation */}
      <Accordion defaultExpanded sx={{ mb: 4 }} id="ai-assisted-explanation">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon color="primary" />
            <Typography variant="h6">AI-Assisted Explanation</Typography>
            <Chip
              label={scan.aiExplanation?.source === 'gemini' ? 'Gemini' : 'AI analysis'}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ ml: 1 }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {scan.aiExplanation ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Alert severity={scan.aiExplanation.overallAssessment === 'PASS' ? 'success' : scan.aiExplanation.overallAssessment === 'FAIL' ? 'error' : 'warning'}>
                <AlertTitle>{scan.aiExplanation.overallAssessment}</AlertTitle>
                {scan.aiExplanation.summary}
              </Alert>
              <Typography variant="body2">{scan.aiExplanation.userExplanation}</Typography>
              {scan.aiExplanation.issues?.map((issue, index) => (
                <Alert key={`${issue.field}-${index}`} severity={issue.status === 'FAIL' ? 'error' : 'warning'}>
                  <AlertTitle>{issue.field} · {issue.status}</AlertTitle>
                  <Typography variant="body2">{issue.reason}</Typography>
                  {issue.recommendation && <Typography variant="body2" sx={{ mt: 0.5 }}><strong>Recommendation:</strong> {issue.recommendation}</Typography>}
                  {issue.ruleReference && <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>{issue.ruleReference}</Typography>}
                </Alert>
              ))}
              {scan.aiExplanation.recommendations?.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Recommendations</Typography>
                  {scan.aiExplanation.recommendations.map((recommendation, index) => <Typography key={index} variant="body2">• {recommendation}</Typography>)}
                </Box>
              )}
              <Typography variant="body2" color="text.secondary"><strong>Inspector note:</strong> {scan.aiExplanation.inspectorNote}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">No AI explanation is available for this scan. Review the extracted fields and rule results above.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* OCR Raw Text */}
      <Accordion sx={{ mb: 4 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">🔤 Raw OCR Text</Typography>
          {scan.ocrResult?.confidence && (
            <Chip label={`Confidence: ${scan.ocrResult.confidence.toFixed(1)}%`} size="small" variant="outlined" sx={{ ml: 2 }} />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 2, bgcolor: 'action.hover', fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 300, overflow: 'auto' }}>
            {scan.ocrResult?.text || 'No text extracted'}
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Disclaimer */}
      <Alert severity="warning" variant="outlined">
        <Typography variant="body2">
          <strong>Disclaimer:</strong> This compliance report is generated by an AI prototype and is for demonstration purposes. Actual compliance determination should be verified by qualified legal professionals familiar with the Legal Metrology (Packaged Commodities) Rules, 2011.
        </Typography>
      </Alert>
    </Container>
  );
}
