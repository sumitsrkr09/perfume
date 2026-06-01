import React from 'react'
import './Section1.css'

const Section1 = () => {
  return (
    <section id="section1" className="s1">
      <img
        src="/images/section1.png"
        alt="Pedestal collection"
        className="s1-bg"
      />

      {/* Dark overlay — GSAP fades this in before text appears */}
      <div id="s1-overlay" className="s1-overlay" />

      {/* Text that appears after bottle lands — GSAP targets #s1-text directly */}
      <div id="s1-text" className="s1-text">
        <p className="s1-eyebrow">The Collection · 2026</p>
        <h2 className="s1-title">
          Where Art<br />Meets Scent
        </h2>
        <p className="s1-desc">
          Five expressions of femininity. Each bottle sculpted by hand,
          each fragrance a world unto itself. This is DIVA.
        </p>
        <button className="s1-btn">
          <span>Discover the Range</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Section1