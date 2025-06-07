"use client"

import { useState } from 'react'

interface ChartData {
  date: string
  value: number
}

interface AssetChartProps {
  assetType: string
  assetTitle: string
  currentScore: number
  color: string
}

export default function AssetChart({ assetType, assetTitle, currentScore, color }: AssetChartProps) {
  const [timeRange, setTimeRange] = useState('month')

  // 模拟历史数据
  const generateMockData = (): ChartData[] => {
    const data: ChartData[] = []
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90
    const today = new Date()
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // 生成趋势向上的随机数据
      const baseValue = currentScore - (days - i) * 0.5
      const randomVariation = Math.random() * 10 - 5
      const value = Math.max(0, Math.min(100, baseValue + randomVariation))
      
      data.push({
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        value: Math.round(value)
      })
    }
    
    return data
  }

  const data = generateMockData()
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))

  const colorClasses = {
    blue: 'text-blue-500 bg-blue-500',
    purple: 'text-purple-500 bg-purple-500',
    green: 'text-green-500 bg-green-500',
    yellow: 'text-yellow-500 bg-yellow-500'
  }

  const improvement = currentScore - data[0].value
  const improvementPercent = ((improvement / data[0].value) * 100).toFixed(1)

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{assetTitle}趋势分析</h3>
        <div className="flex gap-2">
          {['week', 'month', 'quarter'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range === 'week' ? '一周' : range === 'month' ? '一月' : '三月'}
            </button>
          ))}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-400">当前分数</p>
          <p className={`text-2xl font-bold ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`}>
            {currentScore}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-400">提升幅度</p>
          <p className="text-2xl font-bold text-green-500">
            +{improvement.toFixed(1)}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-400">增长率</p>
          <p className="text-2xl font-bold text-green-500">
            +{improvementPercent}%
          </p>
        </div>
      </div>

      {/* 简单的折线图 */}
      <div className="relative h-64 bg-gray-900 rounded-lg p-4">
        <div className="absolute inset-0 p-4">
          {/* Y轴标签 */}
          <div className="absolute left-0 top-4 text-xs text-gray-400">{maxValue}</div>
          <div className="absolute left-0 bottom-4 text-xs text-gray-400">{minValue}</div>
          
          {/* 网格线 */}
          <div className="absolute inset-x-4 top-8 border-t border-gray-800" />
          <div className="absolute inset-x-4 top-1/2 border-t border-gray-800" />
          <div className="absolute inset-x-4 bottom-8 border-t border-gray-800" />
          
          {/* SVG 折线图 */}
          <svg className="absolute inset-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={`url(#gradient-${color})`}
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100
                const y = 100 - ((d.value - minValue) / (maxValue - minValue)) * 100
                return `${x},${y}`
              }).join(' ')}
            />
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={colorClasses[color as keyof typeof colorClasses].split(' ')[1]} stopOpacity="0.6" />
                <stop offset="100%" className={colorClasses[color as keyof typeof colorClasses].split(' ')[1]} stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* 数据点 */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100
            const y = 100 - ((d.value - minValue) / (maxValue - minValue)) * 100
            return (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses].split(' ')[1]}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={`${d.date}: ${d.value}`}
              />
            )
          })}
        </div>
      </div>

      {/* X轴标签 */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{data[0].date}</span>
        <span>{data[Math.floor(data.length / 2)].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>

      {/* 分析建议 */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className={`font-semibold ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`}>
            AI分析：
          </span>
          您的{assetTitle}在过去{timeRange === 'week' ? '一周' : timeRange === 'month' ? '一个月' : '三个月'}
          内呈现{improvement > 0 ? '上升' : '下降'}趋势，
          {improvement > 0 ? '继续保持当前的训练计划' : '建议加强相关训练'}。
          {currentScore >= 80 ? '您在这个领域表现优秀！' : 
           currentScore >= 60 ? '您正在稳步提升，继续努力！' : 
           '还有很大的提升空间，让我们一起加油！'}
        </p>
      </div>
    </div>
  )
}
