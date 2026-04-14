"use client"

import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Memorable & Brandable",
    description: "Short, punchy, and impossible to forget. Perfect for tech, gaming, or creative ventures.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Transfer",
    description: "Domain transferred safely through a verified registrar. Your purchase is protected.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Ownership",
    description: "Once payment clears, the domain is yours within 24 hours. No waiting, no hassle.",
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-6">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <h2 
          className={`font-mono text-3xl sm:text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Why <span className="text-primary">namedark</span>?
        </h2>
        <p 
          className={`text-muted-foreground font-sans text-lg sm:text-xl max-w-xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          A domain that speaks volumes before your visitors even see your content.
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`group relative p-8 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/80 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="font-mono text-lg sm:text-xl font-semibold mb-3 text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
              {feature.description}
            </p>

            {/* Hover gradient border effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, oklch(0.65 0.25 280 / 0.1) 0%, transparent 50%)',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
