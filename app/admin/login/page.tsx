'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Admin credentials
    const adminEmail = 'sayedxiv@gmail.com'
    const adminPassword = 'S@yed2121'
    
    // Simple check - for production, use proper authentication
    if (password === adminPassword) {
      localStorage.setItem('admin_auth', 'authed')
      localStorage.setItem('admin_email', adminEmail)
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Enter password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
            style={{
              background: 'oklch(0.65 0.25 280)',
              color: 'oklch(0.97 0 0)',
            }}
          >
            Login
          </button>
        </form>


      </div>
    </div>
  )
}
