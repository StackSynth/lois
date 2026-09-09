import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../App';
import { runDemo } from '../services/api';
import {
  LandingNav,
  Hero,
  ProblemSection,
  WorkflowSection,
  FeaturesSection,
  DemoSection,
  AiSection,
  TechnologySection,
  ImpactSection,
  FinalCta,
  LandingFooter,
} from '../components/landing/LandingSections';

export default function LandingPage() {
  const navigate = useNavigate();
  const toast = useToastContext();

  const handleDemo = async (demoId) => {
    try {
      toast.info('Loading demo product...');
      const result = await runDemo(demoId);
      const report = result?.data;
      const scanId = result?.reportId || report?.id;
      if (!scanId || !report || report.id !== scanId) {
        throw new Error('The demo report ID was not returned correctly.');
      }
      sessionStorage.setItem(`jarvis-scan:${scanId}`, JSON.stringify(report));
      navigate(`/report/${scanId}`, { state: { scan: report } });
    } catch (err) {
      toast.error('Failed to load demo: ' + err.message);
    }
  };

  return (
    <>
      <LandingNav />
      <Hero />
      <ProblemSection />
      <WorkflowSection />
      <FeaturesSection />
      <AiSection />
      <TechnologySection />
      <ImpactSection />
      <DemoSection onDemo={handleDemo} />
      <FinalCta />
      <LandingFooter />
    </>
  );
}
