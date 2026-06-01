import React, { useEffect, useRef } from 'react'
import './Section2.css'

const Section2 = () => {
  const sectionRef = useRef(null)

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

      const floatingEl = document.querySelector('.floating-bottle')
      const handsImg   = sectionRef.current?.querySelector('.s2-hands-img')

      if (!floatingEl || !handsImg) return

      // ── Bottle scroll ──
      ScrollTrigger.create({
        trigger: '#section2',
        start:   'top bottom',
        end:     'top 15%',
        scrub:   1.5,
        onUpdate: (self) => {
          const p = self.progress
          const handsRect = handsImg.getBoundingClientRect()

          const s1Top  = window.innerHeight * 0.10
          const s1Left = window.innerWidth  * 0.39
          const s1W    = 350

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

      // ── Copy slide-in one by one from left ──
      const copyEls = sectionRef.current?.querySelectorAll(
        '.s2-eyebrow, .s2-heading, .s2-body, .s2-btn, .s2-rule'
      )

      if (copyEls?.length) {
        // set all hidden off-screen to the left
        gsap.set(copyEls, { opacity: 0, x: -60 })

        ScrollTrigger.create({
          trigger: '#section2',
          start:   'top 75%',
          onEnter: () => {
            gsap.to(copyEls, {
              opacity:  1,
              x:        0,
              duration: 0.8,
              ease:     'power3.out',
              stagger:  0.15,   // each element 150ms after the previous
            })
          },
          once: true,
        })
      }
    })

    return () => {
      if (window.ScrollTrigger)
        window.ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section id="section2" ref={sectionRef} className="section2">

      <div className="s2-copy">
        <span className="s2-eyebrow">Crafted for the Ritual</span>

        <h1 className="s2-heading">
          Hold&nbsp;the<br />
          <em>Essence</em><br />
          in Your&nbsp;Hands
        </h1>

        <p className="s2-body">
          Every curve was shaped to rest perfectly in your palms. Feel the
          weight of centuries of tradition — distilled, bottled, and offered
          to those who seek something beyond the ordinary.
        </p>

        <button className="s2-btn">
          <span>Discover the Craft</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>

        <div className="s2-rule" aria-hidden="true">
          <div className="s2-rule-line" />
          <svg viewBox="0 0 20 20" className="s2-rule-diamond">
            <polygon points="10,1 19,10 10,19 1,10" />
          </svg>
          <div className="s2-rule-line" />
        </div>
      </div>

      <div className="s2-visual">
        <img
          src="/images/section22.png"
          alt="Hands cradling the bottle"
          className="s2-hands-img"
        />
      </div>

    </section>
  )
}

export default Section2