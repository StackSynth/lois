import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../App';
import { scanImage } from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';

export default function ScannerPage() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [quality, setQuality] = useState(null);

  const checkImageQuality = useCallback((file) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        totalBrightness += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
      }
      const avgBrightness = totalBrightness / (data.length / 4);

      let variance = 0;
      const pixels = canvas.width * canvas.height;
      for (let i = 0; i < data.length; i += 16) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        variance += (gray - avgBrightness) ** 2;
      }
      variance /= (pixels / 4);

      const checks = [];

      if (avgBrightness < 40) {
        checks.push({ label: 'Poor lighting detected', status: 'warning', icon: <WarningIcon fontSize="small" /> });
      } else if (avgBrightness > 220) {
        checks.push({ label: 'Possible glare detected', status: 'warning', icon: <WarningIcon fontSize="small" /> });
      } else {
        checks.push({ label: 'Lighting acceptable', status: 'ok', icon: <CheckCircleIcon fontSize="small" /> });
      }

      if (variance < 800) {
        checks.push({ label: 'Image may be blurry', status: 'warning', icon: <WarningIcon fontSize="small" /> });
      } else {
        checks.push({ label: 'Image sharpness OK', status: 'ok', icon: <CheckCircleIcon fontSize="small" /> });
      }

      if (img.width < 300 || img.height < 300) {
        checks.push({ label: 'Resolution too low', status: 'error', icon: <ErrorIcon fontSize="small" /> });
      } else {
        checks.push({ label: 'Resolution acceptable', status: 'ok', icon: <CheckCircleIcon fontSize="small" /> });
      }

      checks.push({ label: `${img.width} × ${img.height}px`, status: 'info', icon: <InfoIcon fontSize="small" /> });

      const hasErrors = checks.some(c => c.status === 'error');
      const hasWarnings = checks.some(c => c.status === 'warning');

      setQuality({
        checks,
        overall: hasErrors ? 'poor' : hasWarnings ? 'fair' : 'good'
      });
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File too large. Maximum 20MB allowed.');
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    checkImageQuality(file);
    setCameraActive(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
  }, [toast, checkImageQuality]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      setCameraActive(true);
      setSelectedFile(null);
      setPreview(null);
      setQuality(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      toast.warning('Camera access denied. Please use file upload instead.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      handleFile(file);
    }, 'image/jpeg', 0.92);

    video.srcObject.getTracks().forEach(t => t.stop());
    setCameraActive(false);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.warning('Please select or capture an image first');
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await scanImage(selectedFile);
      toast.success('Analysis complete!');
      navigate(`/report/${result.data.id}`);
    } catch (err) {
      toast.error('Analysis failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setQuality(null);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  const qualityColor = { good: 'success', fair: 'warning', poor: 'error' };
  const qualityLabel = { good: 'Good', fair: 'Fair', poor: 'Poor' };
  const chipColor = { ok: 'success', warning: 'warning', error: 'error', info: 'info' };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Scan Product Label</Typography>
        <Typography variant="subtitle1">
          Upload or capture a packaged commodity label to check its compliance.
        </Typography>
      </Box>

      {/* Upload Zone */}
      {!preview && !cameraActive && (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Paper
              variant="outlined"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                p: 6, textAlign: 'center', cursor: 'pointer',
                border: '2px dashed',
                borderColor: isDragging ? 'primary.main' : 'divider',
                bgcolor: isDragging ? 'action.hover' : 'transparent',
                borderRadius: 3, transition: 'all 0.2s ease',
                '&:hover': { borderColor: 'primary.light', bgcolor: 'action.hover' },
                m: 2,
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} style={{ display: 'none' }} />
              <CloudUploadIcon sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragging ? 'Drop your image here' : 'Upload product label'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Drag and drop an image here, or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary">
                JPEG, PNG, WebP • Max 20MB
              </Typography>
            </Paper>
            <Divider sx={{ mx: 2 }}><Typography variant="caption" color="text.secondary">OR</Typography></Divider>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button variant="outlined" startIcon={<CameraAltIcon />} onClick={(e) => { e.stopPropagation(); handleCameraCapture(); }}>
                Use Camera
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Camera View */}
      {cameraActive && (
        <Card>
          <Box sx={{ position: 'relative', bgcolor: 'black', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
            <video ref={videoRef} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', display: 'block' }} autoPlay playsInline />
          </Box>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={clearSelection}>Cancel</Button>
            <Button variant="contained" size="large" startIcon={<CameraAltIcon />} onClick={capturePhoto}>Capture</Button>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {preview && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <img src={preview} alt="Label preview" style={{ width: '100%', maxHeight: 400, objectFit: 'contain', display: 'block', background: '#0a0f1a' }} />
              <IconButton onClick={clearSelection} size="small" sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', '&:hover': { bgcolor: 'error.main' } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Card>

          {/* Quality */}
          {quality && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2">Image Quality:</Typography>
                  <Chip label={qualityLabel[quality.overall]} color={qualityColor[quality.overall]} size="small" />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {quality.checks.map((check, i) => (
                    <Chip key={i} icon={check.icon} label={check.label} color={chipColor[check.status]} variant="outlined" size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Analyze */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            sx={{ py: 1.5 }}
          >
            {isAnalyzing ? 'Analyzing Label...' : 'Analyze Label'}
          </Button>
        </Box>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Container>
  );
}
