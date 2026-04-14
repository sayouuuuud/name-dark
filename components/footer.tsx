export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo / Domain */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-foreground">name</span>
            <span 
              className="font-mono text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, oklch(0.65 0.25 280) 0%, oklch(0.5 0.2 300) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              dark
            </span>
            <span className="text-muted-foreground font-sans text-sm">.com</span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground font-sans text-sm text-center">
            &copy; {new Date().getFullYear()} namedark.com. Domain for sale.
          </p>

          {/* Social / Contact */}
          <div className="flex items-center gap-4">
            <a 
              href="mailto:sayedxiv@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Email us"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
