'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SiteSettings {
  price: string
  purchase_link: string
  contact_email: string
}

interface VisitStats {
  total_visits: number
  unique_ips: number
  top_countries: { country: string; count: number }[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettings>({
    price: '100',
    purchase_link: '',
    contact_email: '',
  })
  const [stats, setStats] = useState<VisitStats>({
    total_visits: 0,
    unique_ips: 0,
    top_countries: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
        setStats(data.stats)
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      
      if (response.ok) {
        alert('Settings saved successfully!')
        fetchData()
      }
    } catch (err) {
      alert('Failed to save settings')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/30 sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <p className="text-muted-foreground text-sm font-sans mb-2">Total Visits</p>
            <p className="text-3xl font-bold text-foreground">{stats.total_visits}</p>
          </div>
          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <p className="text-muted-foreground text-sm font-sans mb-2">Unique IPs</p>
            <p className="text-3xl font-bold text-foreground">{stats.unique_ips}</p>
          </div>
          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <p className="text-muted-foreground text-sm font-sans mb-2">Current Price</p>
            <p className="text-3xl font-bold" style={{ color: 'oklch(0.65 0.25 280)' }}>
              ${settings.price}
            </p>
          </div>
        </div>

        {/* Top Countries */}
        {stats.top_countries.length > 0 && (
          <div className="p-6 rounded-lg border border-border/30 bg-card">
            <h2 className="text-xl font-bold mb-4 text-foreground">Top Visiting Countries</h2>
            <div className="space-y-3">
              {stats.top_countries.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-foreground">{item.country || 'Unknown'}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.count / Math.max(...stats.top_countries.map(c => c.count))) * 200}px`,
                        background: 'oklch(0.65 0.25 280)',
                      }}
                    />
                    <span className="text-muted-foreground text-sm w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Form */}
        <div className="p-6 rounded-lg border border-border/30 bg-card">
          <h2 className="text-xl font-bold mb-6 text-foreground">Site Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Domain Price ($)</label>
              <input
                type="text"
                value={settings.price}
                onChange={(e) => setSettings({ ...settings, price: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Purchase Link</label>
              <input
                type="text"
                value={settings.purchase_link}
                onChange={(e) => setSettings({ ...settings, purchase_link: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary break-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: saving ? 'oklch(0.55 0.2 280)' : 'oklch(0.65 0.25 280)',
                color: 'oklch(0.97 0 0)',
              }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
