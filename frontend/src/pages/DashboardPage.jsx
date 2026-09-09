import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScans } from '../services/api';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';

const statusLabel = {
  COMPLIANT: 'Compliant',
  NEEDS_ATTENTION: 'Needs review',
  NON_COMPLIANT: 'Non-compliant',
};

function NetworkFlow() {
  return (
    <svg className="network-flow" viewBox="0 0 720 220" aria-hidden="true" preserveAspectRatio="none">
      <path className="network-path" d="M-20 155 C110 155 102 57 232 57 S357 165 478 165 S565 70 740 70" />
      <path className="network-path network-path-muted" d="M-15 185 C105 185 144 114 255 114 S390 202 518 202 S605 115 735 115" />
      <circle className="network-node" cx="232" cy="57" r="5" /><circle className="network-node" cx="478" cy="165" r="5" /><circle className="network-node" cx="625" cy="85" r="5" />
      <circle className="network-pulse" r="5"><animateMotion dur="4s" repeatCount="indefinite" path="M-20 155 C110 155 102 57 232 57 S357 165 478 165 S565 70 740 70" /></circle>
      <circle className="network-pulse network-pulse-delayed" r="4"><animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M-15 185 C105 185 144 114 255 114 S390 202 518 202 S605 115 735 115" /></circle>
    </svg>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getScans().then((result) => setScans(result.data || [])).catch((error) => console.error('Failed to fetch scans:', error)).finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => ({
    total: scans.length,
    compliant: scans.filter((scan) => scan.overallStatus === 'COMPLIANT').length,
    review: scans.filter((scan) => scan.overallStatus === 'NEEDS_ATTENTION').length,
    avgScore: scans.length ? Math.round(scans.reduce((total, scan) => total + (scan.complianceScore || 0), 0) / scans.length) : 0,
  }), [scans]);
  const visibleScans = useMemo(() => (filter === 'ALL' ? scans : scans.filter((scan) => scan.overallStatus === filter)).slice(0, 10), [filter, scans]);

  return (
    <main className="dashboard-magma min-h-[calc(100vh-68px)] bg-black px-4 py-7 text-white sm:px-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="dashboard-enter flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#ff4500]">Compliance operations</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Compliance, in motion.</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#e5e5e5]">Monitor every label review and move confidently from scan to decision.</p>
          </div>
          <button type="button" onClick={() => navigate('/scan')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff4500] px-5 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,69,0,.3)] transition duration-200 hover:scale-[1.02] hover:bg-[#ff6b1a] hover:shadow-[0_0_38px_rgba(255,69,0,.55)]"><QrCodeScannerIcon fontSize="small" /> New scan</button>
        </header>

        <section className="dashboard-enter dashboard-enter-2 relative mt-8 overflow-hidden rounded-2xl border border-[#ff4500]/40 bg-[#111111] p-6 sm:p-8">
          <NetworkFlow />
          <div className="relative max-w-xl">
            <p className="text-xs font-black uppercase tracking-[.17em] text-[#ff4500]">JARVIS network</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-.03em] text-white sm:text-3xl">Every label, connected to a clearer decision.</h2>
            <p className="mt-3 text-sm leading-6 text-[#e5e5e5]">OCR extraction, Legal Metrology checks, and review history flow through one compliance workspace.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#ff4500]/50 bg-black/60 px-3 py-1.5 text-xs font-bold text-[#e5e5e5]"><span className="h-2 w-2 rounded-full bg-[#ff4500] shadow-[0_0_10px_#ff4500]" /> Network active</div>
          </div>
        </section>

        <section className="dashboard-enter dashboard-enter-3 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Labels scanned', stats.total, 'Total workspace activity'],
            ['Compliant', stats.compliant, 'Ready for release'],
            ['Needs review', stats.review, 'Inspector attention'],
            ['Average score', `${stats.avgScore}%`, 'Across all scans'],
          ].map(([label, value, note]) => <article key={label} className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#ff4500]/70 hover:shadow-[0_0_26px_rgba(255,69,0,.12)]"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e5e5e5]">{label}</p><p className="mt-4 text-4xl font-black tracking-[-.05em] text-white">{value}</p><p className="mt-2 text-xs text-[#ff4500]">{note}</p></article>)}
        </section>

        <section className="dashboard-enter dashboard-enter-4 mt-9">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><h2 className="text-xl font-black text-white">Recent scans</h2><p className="mt-1 text-sm text-[#e5e5e5]">Latest compliance activity in your workspace.</p></div>
            <div className="flex flex-wrap gap-2">{['ALL', 'COMPLIANT', 'NEEDS_ATTENTION', 'NON_COMPLIANT'].map((key) => <button type="button" key={key} onClick={() => setFilter(key)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition duration-200 ${filter === key ? 'border-[#ff4500] bg-[#ff4500] text-black' : 'border-white/30 bg-[#111111] text-white hover:border-[#ff4500]'}`}>{key === 'ALL' ? 'All' : statusLabel[key]}</button>)}</div>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
            {loading ? <div className="p-10 text-center text-sm text-[#e5e5e5]">Loading compliance workspace…</div> : visibleScans.length === 0 ? <div className="p-10 text-center text-sm text-[#e5e5e5]">No scans found for this view.</div> : <div className="divide-y divide-white/10">{visibleScans.map((scan) => <button type="button" key={scan.id} onClick={() => navigate(`/report/${scan.id}`)} className="group flex w-full items-center gap-3 px-4 py-4 text-left transition duration-200 hover:bg-[#ff4500]/10 sm:px-6"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#ff4500]/50 text-[#ff4500]"><QrCodeScannerIcon fontSize="small" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-white">{scan.productName || scan.extractedData?.productName || 'Untitled label scan'}</span><span className="mt-1 block text-xs text-[#e5e5e5]">{new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span><span className="hidden rounded-full border border-[#ff4500]/50 px-2.5 py-1 text-xs font-bold text-[#ff4500] sm:block">{statusLabel[scan.overallStatus] || 'In review'}</span><span className="text-sm font-black text-white">{scan.complianceScore ?? 0}%</span><VisibilityIcon className="text-[#e5e5e5] transition group-hover:text-[#ff4500]" fontSize="small" /><ArrowForwardIcon className="hidden text-[#ff4500] sm:block" fontSize="small" /></button>)}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
