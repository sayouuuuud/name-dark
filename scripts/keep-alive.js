#!/usr/bin/env node

/**
 * Keep-Alive Cron Script for namedark.com
 * 
 * This script pings the database every day to keep the Supabase
 * connection active. If the database doesn't receive a request
 * for 5+ days, it may be paused by Supabase.
 * 
 * Run this script daily using:
 * - Vercel Cron (recommended)
 * - External cron service (easiest)
 * - GitHub Actions
 * - Local machine with cron
 */

async function keepAlive() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/keep-alive`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NameDark-KeepAlive/1.0',
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log(`✓ Keep-alive ping sent successfully at ${data.timestamp}`)
      return { success: true }
    } else {
      console.error(`✗ Keep-alive ping failed with status ${response.status}`)
      return { success: false }
    }
  } catch (error) {
    console.error('✗ Keep-alive ping error:', error)
    return { success: false }
  }
}

// Run the keep-alive ping
keepAlive().then(result => {
  process.exit(result.success ? 0 : 1)
})
