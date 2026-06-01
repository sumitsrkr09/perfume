// App.jsx — wire Hero + Section1 together
import React from 'react'

import './index.css'   // ensure html,body { margin:0; scroll-behavior: smooth; }
import Hero from './components/Hero'
import Section1 from './components/Section1'
import FloatingBottle from './components/Floatingbottle'
import Section2 from './components/Section2'

function App() {
  return (
    <>
    <FloatingBottle />
    <Hero />
    <Section1 />
    <Section2 />

    </>
  )
}

export default App

/*
  index.css must have:
  ─────────────────────
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    height: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  Images needed in /public/images/:
    hero.png      — the DIVA bottle (already used in Hero)
    section1.png  — the pedestal scene you shared

  TUNING the bottle landing position:
  ────────────────────────────────────
  In Section1.jsx, inside the GSAP tl.to() for the bottle, adjust:
    x: '18vw'   → move right/left to hit the empty pedestal
    y: '-2vh'   → move up/down to sit on top of the pedestal
    scale: 0.72 → resize to match pedestal proportion

  The scrub: 1.2 value controls how "sticky" the scroll feels.
  Increase it (e.g. 2) for a slower, more cinematic feel.
*/