import './globals.css'
import AuthSessionProvider from '@/components/providers/SessionProvider'
import { UserProvider } from '@/contexts/UserContext'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'EmpowerLove.ai - 人性资产培养平台',
  description: 'AI驱动的人性资产培养平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-900 text-white">
        <UserProvider>
          <AuthSessionProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </AuthSessionProvider>
        </UserProvider>
      </body>
    </html>
  )
}
