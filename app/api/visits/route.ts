import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { country, city, userAgent } = await req.json()
    const supabase = await createClient()

    // Get client IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const ipHash = Buffer.from(ip).toString('hex').substring(0, 16)

    // Insert visit record
    const { error } = await supabase.from('visits').insert({
      country,
      city,
      ip_hash: ipHash,
      user_agent: userAgent,
      page: '/',
    })

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Visit tracking error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
