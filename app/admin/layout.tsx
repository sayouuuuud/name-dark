'use client'

import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const adminPassword = localStorage.getItem('admin_auth')
    if (adminPassword === 'authed') {
      setIsAuthed(true)
    } else if (pathname !== '/admin/login') {
      redirect('/admin/login')
    } else {
      setIsAuthed(false)
    }
  }, [pathname])

  if (isAuthed === null) return null

  return <>{children}</>
}
