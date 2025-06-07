import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            欢迎来到 EmpowerLove.ai
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            AI驱动的人性资产培养平台，助您全面提升生活品质
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始您的旅程
            </Link>
            <Link
              href="/assets"
              className="inline-block bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              探索四大资产
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
