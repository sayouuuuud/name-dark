import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()

    // Insert a keep-alive ping
    const { error } = await supabase.from('keep_alive').insert({})

    if (error) {
      console.error('Keep-alive error:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('Keep-alive ping error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
