import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Use admin client to ensure we can read all settings and stats
    const supabase = await createAdminClient()

    // Fetch settings
    const { data: settingsData } = await supabase.from('site_settings').select('key, value')

    const settings = {
      price: '100',
      purchase_link: '',
      contact_email: 'sayedxiv@gmail.com',
    }

    if (Array.isArray(settingsData)) {
      settingsData.forEach(item => {
        if (item.key === 'price') settings.price = item.value
        if (item.key === 'purchase_link') settings.purchase_link = item.value
        if (item.key === 'contact_email') settings.contact_email = item.value
      })
    }

    // Fetch visit stats
    const { data: visits } = await supabase.from('visits').select('ip_hash, country')

    const visitsArr = Array.isArray(visits) ? visits : []
    const total_visits = visitsArr.length
    const unique_ips = new Set(visitsArr.map(v => v.ip_hash)).size || 0

    // Get top countries
    const countryMap: Record<string, number> = {}
    visitsArr.forEach(v => {
      const country = v.country || 'Unknown'
      countryMap[country] = (countryMap[country] || 0) + 1
    })

    const top_countries = Object.entries(countryMap)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const stats = {
      total_visits,
      unique_ips,
      top_countries,
    }

    return NextResponse.json({ settings, stats })
  } catch (err) {
    console.error('Settings fetch error:', err)
    return NextResponse.json({ 
      settings: {
        price: '100',
        purchase_link: '',
        contact_email: 'sayedxiv@gmail.com',
      },
      stats: {
        total_visits: 0,
        unique_ips: 0,
        top_countries: [],
      }
    })
  }
}

export async function PUT(req: Request) {
  try {
    const { price, purchase_link, contact_email } = await req.json()
    
    // Use admin client to bypass RLS and ensure we have write permissions
    const supabase = await createAdminClient()

    // Update settings using upsert to handle both inserts and updates
    const updates = [
      { key: 'price', value: price },
      { key: 'purchase_link', value: purchase_link },
      { key: 'contact_email', value: contact_email },
    ]

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          { 
            key: update.key, 
            value: update.value, 
            updated_at: new Date().toISOString() 
          },
          { onConflict: 'key' }
        )
      
      if (error) {
        console.error(`Error updating setting ${update.key}:`, error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Settings update error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
