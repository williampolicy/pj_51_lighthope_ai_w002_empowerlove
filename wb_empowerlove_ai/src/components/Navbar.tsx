"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useUser()
  
  const navItems = [
    { href: '/', label: '首页' },
    { href: '/assets', label: '资产总览' },
    { href: '/training', label: '训练计划' },
    { href: '/community', label: '社区' },
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white">
              EmpowerLove.ai
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 text-sm">
                  {user.name || user.email.split('@')[0]}
                </span>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
