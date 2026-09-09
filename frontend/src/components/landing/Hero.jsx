import React from 'react';
import { Link } from 'react-router-dom';

function ScanMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M8 12h8" />
    </svg>
  );
}

/** A self-contained landing hero. Additional landing sections can follow this component later. */
export default function Hero() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-black px-5 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 hero-scan-grid" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#ff4500]/20 blur-[110px]" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-7 sm:py-9">
        <Link to="/" aria-label="JARVIS home" className="inline-flex items-center gap-2.5 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#ff4500] text-[#ff4500]"><ScanMark /></span>
          <span className="text-sm font-black tracking-[0.24em] text-white">JARVIS<span className="text-[#ff4500]">.</span></span>
        </Link>
        <Link to="/signin" className="text-sm font-semibold text-[#e5e5e5] no-underline transition-colors duration-200 hover:text-[#ff4500]">Sign in</Link>
      </nav>

      <section className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-5xl flex-col items-center justify-center pb-20 text-center sm:pb-28">
        <div className="hero-enter hero-enter-1 inline-flex items-center gap-2 rounded-full border border-[#ff4500]/60 bg-[#111111] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ff4500]"><ScanMark /> AI label intelligence</div>
        <h1 className="hero-enter hero-enter-2 mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">Compliance clarity,<br />from a single snap.</h1>
        <p className="hero-enter hero-enter-3 mt-5 text-lg font-extrabold tracking-[-0.02em] text-[#ff4500] sm:text-xl">Snap. Scan. Stay Compliant.</p>
        <p className="hero-enter hero-enter-4 mt-5 max-w-2xl text-base leading-7 text-[#e5e5e5] sm:text-lg sm:leading-8">JARVIS uses OCR and Legal Metrology checks to turn packaged commodity labels into clear, actionable compliance reviews.</p>
        <div className="hero-enter hero-enter-5 mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link to="/scan" className="rounded-xl bg-[#ff4500] px-7 py-3.5 text-sm font-black text-black no-underline shadow-[0_0_28px_rgba(255,69,0,0.34)] transition duration-200 ease-out hover:scale-[1.02] hover:bg-[#ff6b1a] hover:shadow-[0_0_38px_rgba(255,69,0,0.58)]">Start Scanning</Link>
          <a href="#about" className="rounded-xl border border-white px-7 py-3.5 text-sm font-bold text-white no-underline transition duration-200 ease-out hover:scale-[1.02] hover:border-[#ff4500] hover:bg-[#ff4500]/15">Learn More</a>
        </div>
        <p id="about" className="hero-enter hero-enter-5 mt-8 text-xs font-medium tracking-wide text-[#e5e5e5]">OCR extraction · Legal Metrology validation · Review-ready reports</p>
      </section>
    </main>
  );
}
