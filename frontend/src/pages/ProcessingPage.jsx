import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScan } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from '@mui/material/Alert';

const STAGES = [
  { label: 'Image received', icon: '📥' },
  { label: 'Detecting text', icon: '🔤' },
  { label: 'Extracting label fields', icon: '📋' },
  { label: 'Identifying declarations', icon: '🏷️' },
  { label: 'Checking Legal Metrology requirements', icon: '⚖️' },
  { label: 'Generating compliance report', icon: '📊' },
];

export default function ProcessingPage() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setActiveStage(prev => {
        if (prev >= STAGES.length - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const checkResult = async () => {
        try {
          const result = await getScan(scanId);
          if (result?.data?.id === scanId) {
            setTimeout(() => navigate(`/report/${result.data.id}`), 500);
          } else {
            setError('The scan completed without a matching report. Please start a new scan.');
          }
        } catch (err) {
          setError(err.message || 'The scan result could not be loaded. Please try again.');
        }
      };
      checkResult();
    }
  }, [progress, scanId, navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 6, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CircularProgress size={48} thickness={3} sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={700}>Analyzing Label</Typography>
            <Typography variant="body2" color="text.secondary">
              Running compliance checks against Legal Metrology rules...
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Stepper */}
          <Stepper activeStep={activeStage} orientation="vertical" sx={{ mb: 4 }}>
            {STAGES.map((stage, i) => (
              <Step key={stage.label} completed={i < activeStage}>
                <StepLabel
                  optional={
                    i < activeStage ? (
                      <Typography variant="caption" color="success.main">Complete</Typography>
                    ) : i === activeStage ? (
                      <Typography variant="caption" color="primary.main">In progress...</Typography>
                    ) : null
                  }
                  StepIconComponent={i < activeStage ? () => (
                    <CheckCircleIcon color="success" sx={{ fontSize: 24 }} />
                  ) : undefined}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{stage.icon}</span>
                    <Typography variant="body2" sx={{ fontWeight: i === activeStage ? 600 : 400, color: i > activeStage ? 'text.secondary' : 'text.primary' }}>
                      {stage.label}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Progress */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ flex: 1, height: 8, borderRadius: 4 }} />
            <Typography variant="body2" fontWeight={700} color="primary.main" sx={{ fontFamily: 'monospace', minWidth: 40 }}>
              {Math.min(progress, 100)}%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
