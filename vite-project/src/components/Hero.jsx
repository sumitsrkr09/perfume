import React, { useEffect, useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const navRef       = useRef(null)
  const h1Ref        = useRef(null)
  const centerPRef   = useRef(null)
  const imageRef     = useRef(null)
  const leftContentRef = useRef(null)
  const rightCardRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    script.onload = () => {
      const gsap = window.gsap

      gsap.set(navRef.current,        { y: -100, opacity: 0 })
      gsap.set(h1Ref.current,         { y: 120,  opacity: 0 })
      gsap.set(centerPRef.current,    { y: 60,   opacity: 0 })
      // bottle animation handled by FloatingBottle
      gsap.set(leftContentRef.current,{ x: -80,  opacity: 0 })
      gsap.set(rightCardRef.current,  { x: 80,   opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(navRef.current,         { y: 0, opacity: 1, duration: 1,   ease: 'power2.out' })
        .to(h1Ref.current,          { y: 0, opacity: 1, duration: 1.1 }, '-=0.4')
        .to(centerPRef.current,     { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
        .to(leftContentRef.current, { x: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .to(rightCardRef.current,   { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')
    }
    document.head.appendChild(script)
    return () => { if (script.parentNode) document.head.removeChild(script) }
  }, [])

  return (
    <div className="hero-wrapper">

      {/* ── Navbar ── */}
      <nav ref={navRef} className="navbar">
        <div className="nav-logo">
          <span className="nav-logo-text">DIVA</span>
          <span className="nav-logo-sub">PARFUM</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">Collection</a></li>
          <li><a href="#">Atelier</a></li>
          <li><a href="#">Heritage</a></li>
          <li><a href="#">Stores</a></li>
        </ul>
        <div className="nav-actions">
        <button className='nav-btn-ghost'>Discover</button>
        <button className='nav-btn-solid'>Shop Now</button>

        </div>
      </nav>

      {/* ── Hero Grid ── */}
      <section className="hero">

        {/* Decorative */}
        <div className="hero-bg-circle hero-bg-circle--1" />
        <div className="hero-bg-circle hero-bg-circle--2" />
        <div className="hero-ornament hero-ornament--tl">✦</div>
        <div className="hero-ornament hero-ornament--tr">✦</div>

        {/* ROW 1 — spans all 3 cols: title + tagline */}
        <div className="hero-center-top">
          <p className="hero-eyebrow">Eau de Parfum · Édition Luxe</p>
          <h1 ref={h1Ref} className="hero-title">
            <span className="hero-title-line">DIVA</span>
            <span className="hero-title-line hero-title-line--gold">PARFUM</span>
          </h1>
          <p ref={centerPRef} className="hero-center-tagline">
            Born from the rarest florals of the Grasse valley,<br />
            crafted for women who define elegance.
          </p>
        </div>

        {/* ROW 2 COL 1 — Left content */}
        <div ref={leftContentRef} className="hero-left">
          <div className="hero-left-divider" />
          <p className="hero-left-desc">
            A symphony of amber, jasmine, and oud — each drop a whisper
            of timeless femininity. Wear it like a crown.
          </p>
          <div className="hero-left-meta">
            <span className="hero-meta-item">50 ml · 100 ml</span>
            <span className="hero-meta-dot">·</span>
            <span className="hero-meta-item">Limited Edition</span>
          </div>
          <button className="hero-btn hero-btn--outline">
            <span>Explore Scent</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* ROW 2 COL 2 — Bottle column (absolute inside) */}
        <div className="hero-bottle-col">
          <div className="hero-bottle-wrapper">
            <div className="hero-bottle-glow" />
            <img
              ref={imageRef}
              src="/images/hero.png"
              alt="DIVA Parfum"
              className="hero-bottle-img"
            />
          </div>
        </div>

        {/* ROW 2 COL 3 — Right card */}
        <div ref={rightCardRef} className="hero-right">
          <div className="hero-card">
            <div className="hero-card-badge">New Arrival</div>
            <h3 className="hero-card-title">The Signature<br />Collection</h3>
            <p className="hero-card-desc">
              Handcrafted in Grasse, France. Each bottle is a work of art —
              gilded, ornate, and utterly unforgettable.
            </p>
            <div className="hero-card-price">
              <span className="price-label">From</span>
              <span className="price-value">₹8,499</span>
            </div>
            <button className="hero-btn hero-btn--gold">
              <span>Add to Collection</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Hero