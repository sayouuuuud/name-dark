"use client"

import { useEffect, useRef, useState } from "react"

export function PurchaseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [purchaseLink, setPurchaseLink] = useState('')
  const [price, setPrice] = useState('100')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Fetch settings from admin
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.settings?.purchase_link) setPurchaseLink(data.settings.purchase_link)
          if (data.settings?.price) setPrice(data.settings.price)
        }
      } catch (err) {
        console.log('[v0] Could not load settings')
      }
    }
    
    fetchSettings()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="purchase" 
      className="relative py-24 sm:py-32 px-6 scroll-mt-8"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.25 280) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Purchase card */}
        <div 
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Card gradient border */}
          <div 
            className="absolute inset-0 rounded-3xl p-px"
            style={{
              background: 'linear-gradient(135deg, oklch(0.65 0.25 280 / 0.5) 0%, transparent 50%, oklch(0.65 0.25 280 / 0.2) 100%)',
            }}
          />
          
          {/* Card content */}
          <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-widest font-sans mb-6">
                Limited Offer
              </span>
              <h2 className="font-mono text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Claim Your Domain
              </h2>
              <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-md mx-auto">
                Secure namedark.com today and build something extraordinary.
              </p>
            </div>

            {/* Price display */}
            <div className="flex items-center justify-center gap-4 mb-10 py-6 border-y border-border/30">
              <div className="text-center">
                <p className="text-muted-foreground text-sm font-sans mb-1">One-time payment</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-foreground">${price}</span>
                  <span className="text-muted-foreground font-sans">USD</span>
                </div>
              </div>
            </div>

            {/* What's included */}
            <ul className="space-y-4 mb-10">
              {[
                "Full domain ownership transfer",
                "Clean domain history",
                "No hidden fees or renewals due",
                "Priority support during transfer",
              ].map((item, index) => (
                <li 
                  key={index}
                  className={`flex items-center gap-3 text-foreground/90 font-sans transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a 
              href={purchaseLink || '#'}
              target={purchaseLink ? '_blank' : undefined}
              rel={purchaseLink ? 'noopener noreferrer' : undefined}
              className="w-full group relative py-4 sm:py-5 rounded-2xl font-sans font-semibold text-lg transition-all duration-300 overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.65 0.25 280) 0%, oklch(0.55 0.22 290) 100%)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground">
                Acquire This Domain
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              
              {/* Hover effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.7 0.25 280) 0%, oklch(0.6 0.22 290) 100%)',
                }}
              />
            </a>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-center text-muted-foreground text-xs font-sans mb-4 uppercase tracking-wider">
                Trusted Escrow Partners
              </p>
              <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
                {/* Spaceship Logo */}
                <a 
                  href="https://www.spaceship.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l5.5 3.44v6.76L12 17.82l-5.5-3.44V7.62L12 4.18z"/>
                    <path d="M12 8l-3 1.88v3.74L12 15.5l3-1.88V9.88L12 8z"/>
                  </svg>
                  <span className="font-sans text-sm font-medium">Spaceship</span>
                </a>
                
                {/* Dan.com Logo */}
                <a 
                  href="https://dan.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-sans text-sm font-medium">Dan.com</span>
                </a>
                
                {/* Escrow.com Logo */}
                <a 
                  href="https://www.escrow.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  <span className="font-sans text-sm font-medium">Escrow.com</span>
                </a>
              </div>
              
              {/* Security note */}
              <p className="text-center text-muted-foreground/70 text-xs font-sans mt-4">
                Your payment is protected by industry-leading escrow services
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
