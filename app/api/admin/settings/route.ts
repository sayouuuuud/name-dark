import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch settings
    const { data: settingsData } = await supabase.from('site_settings').select('key, value')

    const settings = {
      price: '100',
      purchase_link: '',
      contact_email: 'sayedxiv@gmail.com',
    }

    if (settingsData) {
      settingsData.forEach(item => {
        if (item.key === 'price') settings.price = item.value
        if (item.key === 'purchase_link') settings.purchase_link = item.value
        if (item.key === 'contact_email') settings.contact_email = item.value
      })
    }

    // Fetch visit stats
    const { data: visits } = await supabase.from('visits').select('ip_hash, country')

    const total_visits = visits?.length || 0
    const unique_ips = new Set(visits?.map(v => v.ip_hash)).size || 0

    // Get top countries
    const countryMap: Record<string, number> = {}
    visits?.forEach(v => {
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
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { price, purchase_link, contact_email } = await req.json()
    const supabase = await createClient()

    // Update settings
    const updates = [
      { key: 'price', value: price },
      { key: 'purchase_link', value: purchase_link },
      { key: 'contact_email', value: contact_email },
    ]

    for (const update of updates) {
      await supabase
        .from('site_settings')
        .update({ value: update.value, updated_at: new Date().toISOString() })
        .eq('key', update.key)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Settings update error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
