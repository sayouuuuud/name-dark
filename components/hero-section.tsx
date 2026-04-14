"use client"

import { useEffect, useState, useRef } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.06 0.01 280)",
      }}
    >
      {/* Dynamic mouse-tracked glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, oklch(0.65 0.25 280 / 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Static corner glow */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.25 280 / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Horizontal rule lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-foreground"
            style={{ top: `${(i + 1) * 8.33}%` }}
          />
        ))}
      </div>

      {/* Top nav bar */}
      <header
        className={`relative z-10 flex items-center justify-between px-8 md:px-16 pt-10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "oklch(0.65 0.25 280)" }}
          />
          <span
            className="text-xs uppercase tracking-[0.35em] font-sans"
            style={{ color: "oklch(0.55 0.1 280)" }}
          >
            Domain For Sale
          </span>
        </div>
        <a
          href="mailto:sayedxiv@gmail.com"
          className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-sans px-5 py-2.5 border transition-all duration-300 hover:bg-foreground hover:text-background"
          style={{
            color: "oklch(0.7 0 0)",
            borderColor: "oklch(0.25 0.02 280)",
          }}
        >
          Contact
        </a>
      </header>

      {/* Main content — asymmetric vertical layout */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 pb-8 pt-8">

        {/* Overline label */}
        <div
          className={`mb-8 md:mb-12 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.25 280)" }}
            />
            <span
              className="text-xs uppercase tracking-[0.4em] font-sans"
              style={{ color: "oklch(0.65 0.25 280)" }}
            >
              Premium .com
            </span>
          </div>
        </div>

        {/* Giant stacked display typography — THE UNFORGETTABLE ELEMENT */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="font-mono font-black leading-none select-none"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 18rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {/* "name" — outlined stroke text */}
            <div
              className="block relative"
              style={{
                WebkitTextStroke: "1.5px oklch(0.35 0.05 280)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
              aria-hidden="true"
            >
              name
            </div>

            {/* "dark" — filled + glow */}
            <div
              className="block relative -mt-[0.05em]"
              style={{
                color: "oklch(0.97 0 0)",
              }}
            >
              dark
              {/* Violet glow layer */}
              <span
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                  color: "oklch(0.65 0.25 280)",
                  filter: "blur(40px)",
                  opacity: 0.4,
                }}
                aria-hidden="true"
              >
                dark
              </span>
            </div>

            {/* .com — small, offset */}
            <div
              className="block font-sans font-light"
              style={{
                fontSize: "clamp(1rem, 3.5vw, 3.5rem)",
                letterSpacing: "0.15em",
                color: "oklch(0.45 0.05 280)",
                marginTop: "0.15em",
              }}
            >
              .com
            </div>
          </div>
        </div>

        {/* Bottom row — price + CTA side by side */}
        <div
          className={`mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-end gap-8 sm:gap-16 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Price block */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.35em] font-sans mb-2"
              style={{ color: "oklch(0.45 0.05 280)" }}
            >
              One-time price
            </p>
            <div className="flex items-start gap-1">
              <span
                className="font-mono font-bold mt-1 text-xl"
                style={{ color: "oklch(0.65 0.25 280)" }}
              >
                $
              </span>
              <span
                className="font-mono font-black leading-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  color: "oklch(0.97 0 0)",
                  letterSpacing: "-0.03em",
                }}
              >
                100
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block h-20 w-px self-center"
            style={{ background: "oklch(0.22 0.02 280)" }}
          />

          {/* CTA block */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs uppercase tracking-[0.35em] font-sans"
              style={{ color: "oklch(0.45 0.05 280)" }}
            >
              Instant transfer
            </p>
            <a
              href="#purchase"
              className="group relative inline-flex items-center gap-4 overflow-hidden font-sans font-semibold text-sm sm:text-base uppercase tracking-[0.2em] px-8 py-4"
              style={{
                background: "oklch(0.65 0.25 280)",
                color: "oklch(0.97 0 0)",
              }}
            >
              <span className="relative z-10">Acquire This Domain</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "oklch(0.72 0.26 280)" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div
        className={`relative z-10 border-t overflow-hidden transition-all duration-700 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ borderColor: "oklch(0.18 0.01 280)" }}
      >
        <div
          className="flex gap-0 py-4 whitespace-nowrap"
          style={{
            animation: "marquee 20s linear infinite",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 px-8 text-xs uppercase tracking-[0.3em] font-sans"
              style={{ color: "oklch(0.3 0.03 280)" }}
            >
              <span>namedark.com</span>
              <span style={{ color: "oklch(0.65 0.25 280)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
