"use client"

export default function AuthSessionProvider({
  children
}: {
  children: React.ReactNode
}) {
  // 暂时不使用 NextAuth，直接返回 children
  return <>{children}</>
}
