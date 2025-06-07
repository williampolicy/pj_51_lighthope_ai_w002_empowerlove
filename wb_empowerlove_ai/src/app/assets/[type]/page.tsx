"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import AICoach from '@/components/AICoach'
import AssetChart from '@/components/AssetChart'

interface Metric {
  name: string
  value: number
  max: number
  unit?: string
}

interface AssetDetail {
  title: string
  icon: string
  score: number
  color: string
  description: string
  metrics: Metric[]
  plans: {
    title: string
    duration: string
    difficulty: string
  }[]
}

const assetDetails: Record<string, AssetDetail> = {
  physical: {
    title: "身体资产",
    icon: "💪",
    score: 75,
    color: "blue",
    description: "通过科学的运动和营养计划，提升您的身体素质和健康水平",
    metrics: [
      { name: "运动频率", value: 4, max: 7, unit: "天/周" },
      { name: "睡眠质量", value: 7.5, max: 10 },
      { name: "营养均衡", value: 8, max: 10 },
      { name: "体能水平", value: 7, max: 10 }
    ],
    plans: [
      { title: "晨间运动计划", duration: "30分钟/天", difficulty: "中等" },
      { title: "营养优化方案", duration: "持续", difficulty: "简单" },
      { title: "睡眠质量提升", duration: "8周", difficulty: "简单" }
    ]
  },
  mental: {
    title: "心理资产",
    icon: "🧠",
    score: 82,
    color: "purple",
    description: "培养积极心态，提升认知能力和情绪管理水平",
    metrics: [
      { name: "压力管理", value: 8, max: 10 },
      { name: "情绪稳定", value: 7.5, max: 10 },
      { name: "专注力", value: 8.5, max: 10 },
      { name: "学习能力", value: 9, max: 10 }
    ],
    plans: [
      { title: "正念冥想训练", duration: "15分钟/天", difficulty: "简单" },
      { title: "认知能力提升", duration: "6周", difficulty: "中等" },
      { title: "压力管理技巧", duration: "4周", difficulty: "中等" }
    ]
  },
  social: {
    title: "社交资产",
    icon: "🤝",
    score: 68,
    color: "green",
    description: "建立高质量的人际关系，提升社交技能和影响力",
    metrics: [
      { name: "亲密关系", value: 7, max: 10 },
      { name: "社交网络", value: 6, max: 10 },
      { name: "沟通能力", value: 7.5, max: 10 },
      { name: "团队协作", value: 6.5, max: 10 }
    ],
    plans: [
      { title: "社交技能工作坊", duration: "4周", difficulty: "中等" },
      { title: "人际关系深化", duration: "8周", difficulty: "高级" },
      { title: "公众演讲训练", duration: "6周", difficulty: "高级" }
    ]
  },
  economic: {
    title: "经济资产",
    icon: "💰",
    score: 90,
    color: "yellow",
    description: "提升财务管理能力，实现财务自由和职业发展",
    metrics: [
      { name: "收入水平", value: 8.5, max: 10 },
      { name: "储蓄率", value: 9, max: 10 },
      { name: "投资回报", value: 8, max: 10 },
      { name: "职业发展", value: 9.5, max: 10 }
    ],
    plans: [
      { title: "财务规划基础", duration: "4周", difficulty: "简单" },
      { title: "投资策略进阶", duration: "8周", difficulty: "高级" },
      { title: "职业技能提升", duration: "12周", difficulty: "中等" }
    ]
  }
}

export default function AssetDetailPage() {
  const params = useParams()
  const type = params.type as string
  const asset = assetDetails[type]

  if (!asset) {
    return <div>资产类型不存在</div>
  }

  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/assets"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回总览
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：资产卡片 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-6xl mb-4 text-center">{asset.icon}</div>
            <h1 className="text-2xl font-bold text-center mb-4">{asset.title}</h1>
            <div className="text-5xl font-bold text-center mb-6">{asset.score}</div>
            <div className="bg-gray-700 rounded-full h-4 mb-6">
              <div
                className={`${colorClasses[asset.color as keyof typeof colorClasses]} h-4 rounded-full`}
                style={{ width: `${asset.score}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm">{asset.description}</p>
          </div>

          {/* 指标详情 */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">详细指标</h3>
            <div className="space-y-3">
              {asset.metrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{metric.name}</span>
                    <span className="text-white">
                      {metric.value}{'unit' in metric && metric.unit ? ` ${metric.unit}` : `/${metric.max}`}
                    </span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div
                      className={`${colorClasses[asset.color as keyof typeof colorClasses]} h-2 rounded-full opacity-60`}
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：训练计划、图表和AI教练 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 训练计划 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">推荐训练计划</h2>
            <div className="space-y-4">
              {asset.plans.map((plan, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
                      <p className="text-sm text-gray-400">
                        时长：{plan.duration} | 难度：{plan.difficulty}
                      </p>
                    </div>
                    <Link
                      href="/training"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      开始
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 数据可视化 */}
          <AssetChart
            assetType={type}
            assetTitle={asset.title}
            currentScore={asset.score}
            color={asset.color}
          />

          {/* AI教练对话 */}
          <AICoach
            assetType={type}
            assetTitle={asset.title}
          />
        </div>
      </div>
    </div>
  )
}
