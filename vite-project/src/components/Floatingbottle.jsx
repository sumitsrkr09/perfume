import React, { useEffect, useRef } from 'react'
import './FloatingBottle.css'

const FloatingBottle = () => {
  const bottleRef = useRef(null)

  useEffect(() => {
    const loadGSAP = () =>
      new Promise((resolve) => {
        if (window.gsap && window.ScrollTrigger) { resolve(); return }
        const s1 = document.createElement('script')
        s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
        s1.onload = () => {
          const s2 = document.createElement('script')
          s2.src =
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
          s2.onload = resolve
          document.head.appendChild(s2)
        }
        document.head.appendChild(s1)
      })

    loadGSAP().then(() => {
      const { gsap, ScrollTrigger } = window
      gsap.registerPlugin(ScrollTrigger)

      const init = () => {
        const heroBottle = document.querySelector('.hero-bottle-img')
        const floatingEl = bottleRef.current
        if (!heroBottle || !floatingEl) return

        const rect      = heroBottle.getBoundingClientRect()
        const entryLeft = rect.left + 200   // single source of truth for entry position

        // ── Initial placement (below, invisible) ──
        gsap.set(floatingEl, {
          position: 'fixed',
          top:     rect.top + 120,
          left:    entryLeft,
          width:   rect.width,
          rotate:  0,
          opacity: 0,
          zIndex:  999,
        })

        // ── ENTRY ──
        gsap.to(floatingEl, {
          top:      rect.top,
          left:     entryLeft,
          opacity:  1,
          duration: 1.1,
          ease:     'power3.out',
          delay:    2.0,
        })

        // Section1 pedestal landing values
        const s1Top  = window.innerHeight * 0.10
        const s1Left = window.innerWidth  * 0.39
        const s1W    = 355

        // ── LEG 1: Hero → Section1 pedestal ──
        ScrollTrigger.create({
          trigger: '#section1',
          start:   'top bottom',
          end:     'top top',
          scrub:   1.5,
          onUpdate: (self) => {
            const p = self.progress
            gsap.set(floatingEl, {
              top:    rect.top    + (s1Top   - rect.top)    * p,
              left:   entryLeft   + (s1Left  - entryLeft)   * p,
              width:  rect.width  + (s1W     - rect.width)  * p,
              rotate: 0,
            })
          },
        })

        // ── After Section1 landing: overlay + text ──
        ScrollTrigger.create({
          trigger: '#section1',
          start:   'top 10%',
          onEnter: () => {
            gsap.to('#s1-overlay', {
              opacity:  1,
              duration: 0.8,
              ease:     'power2.out',
            })
            gsap.to('#s1-text', {
              opacity:  1,
              y:        0,
              duration: 1.1,
              ease:     'power2.out',
              delay:    0.5,
            })
          },
          once: true,
        })

        // ── LEG 2: Section1 pedestal → Section2 hands ──
        ScrollTrigger.create({
          trigger: '#section2',
          start:   'top bottom',
          end:     'top 15%',
          scrub:   1.5,
          onUpdate: (self) => {
            const p = self.progress

            const handsImg = document.querySelector('.s2-hands-img')
            if (!handsImg) return
            const handsRect = handsImg.getBoundingClientRect()

            const targetTop  = handsRect.top  + handsRect.height * -0.29
            const targetLeft = handsRect.left + handsRect.width  * 0.25
            const targetW    = 350

            gsap.set(floatingEl, {
              top:    s1Top  + (targetTop  - s1Top)  * p,
              left:   s1Left + (targetLeft - s1Left) * p,
              width:  s1W    + (targetW    - s1W)    * p,
              rotate: p * -6,
            })
          },
        })
      }

      setTimeout(init, 300)
    })

    return () => {
      if (window.ScrollTrigger)
        window.ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <img
      ref={bottleRef}
      src="/images/hero.png"
      alt=""
      className="floating-bottle"
      aria-hidden="true"
    />
  )
}

export default FloatingBottle