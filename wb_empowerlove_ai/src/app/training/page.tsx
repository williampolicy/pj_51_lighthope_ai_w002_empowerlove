"use client"

import { useState } from 'react'
import Link from 'next/link'

const trainingPlans = {
  physical: {
    title: "身体资产训练",
    icon: "💪",
    color: "blue",
    plans: [
      {
        id: 1,
        title: "21天运动习惯养成",
        description: "通过科学的运动计划，帮助您建立持续的运动习惯",
        duration: "21天",
        difficulty: "初级",
        progress: 45,
        tasks: ["每日30分钟有氧运动", "力量训练3次/周", "柔韧性训练"]
      },
      {
        id: 2,
        title: "8周体能提升计划",
        description: "系统性提升心肺功能和肌肉力量",
        duration: "8周",
        difficulty: "中级",
        progress: 20,
        tasks: ["HIIT训练", "核心力量强化", "耐力提升"]
      }
    ]
  },
  mental: {
    title: "心理资产训练",
    icon: "🧠",
    color: "purple",
    plans: [
      {
        id: 3,
        title: "正念冥想入门",
        description: "学习正念技巧，提升专注力和情绪管理能力",
        duration: "30天",
        difficulty: "初级",
        progress: 80,
        tasks: ["每日10分钟冥想", "呼吸练习", "身体扫描"]
      },
      {
        id: 4,
        title: "认知能力提升",
        description: "通过脑力训练游戏和练习提升认知功能",
        duration: "6周",
        difficulty: "中级",
        progress: 60,
        tasks: ["记忆力训练", "逻辑推理练习", "创造力培养"]
      }
    ]
  },
  social: {
    title: "社交资产训练",
    icon: "🤝",
    color: "green",
    plans: [
      {
        id: 5,
        title: "社交技能提升",
        description: "学习有效沟通技巧，建立更好的人际关系",
        duration: "4周",
        difficulty: "初级",
        progress: 30,
        tasks: ["主动倾听练习", "非暴力沟通", "肢体语言改善"]
      },
      {
        id: 6,
        title: "领导力培养",
        description: "发展领导才能，提升团队影响力",
        duration: "12周",
        difficulty: "高级",
        progress: 10,
        tasks: ["团队管理技巧", "公众演讲训练", "决策能力提升"]
      }
    ]
  },
  economic: {
    title: "经济资产训练",
    icon: "💰",
    color: "yellow",
    plans: [
      {
        id: 7,
        title: "个人理财基础",
        description: "掌握基本的理财知识和技能",
        duration: "4周",
        difficulty: "初级",
        progress: 90,
        tasks: ["预算制定", "储蓄计划", "债务管理"]
      },
      {
        id: 8,
        title: "投资策略进阶",
        description: "学习多元化投资策略，实现财富增长",
        duration: "8周",
        difficulty: "高级",
        progress: 25,
        tasks: ["资产配置", "风险评估", "投资组合优化"]
      }
    ]
  }
}

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const categories = [
    { value: 'all', label: '全部' },
    { value: 'physical', label: '身体资产' },
    { value: 'mental', label: '心理资产' },
    { value: 'social', label: '社交资产' },
    { value: 'economic', label: '经济资产' }
  ]

  const difficulties = [
    { value: 'all', label: '全部难度' },
    { value: '初级', label: '初级' },
    { value: '中级', label: '中级' },
    { value: '高级', label: '高级' }
  ]

  const getFilteredPlans = () => {
    let allPlans: any[] = []
    
    Object.entries(trainingPlans).forEach(([category, data]) => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        data.plans.forEach(plan => {
          if (selectedDifficulty === 'all' || selectedDifficulty === plan.difficulty) {
            allPlans.push({
              ...plan,
              category,
              categoryTitle: data.title,
              categoryIcon: data.icon,
              categoryColor: data.color
            })
          }
        })
      }
    })
    
    return allPlans
  }

  const filteredPlans = getFilteredPlans()

  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">训练计划</h1>
        <p className="text-xl text-gray-400">选择适合您的训练计划，系统提升各项资产</p>
      </div>

      {/* 筛选器 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {difficulties.map(diff => (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedDifficulty === diff.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* 训练计划列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <div key={plan.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{plan.categoryIcon}</span>
              <span className="text-sm text-gray-400">{plan.categoryTitle}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>⏱ {plan.duration}</span>
              <span>📊 {plan.difficulty}</span>
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">进度</span>
                <span className="text-white">{plan.progress}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <div
                  className={`${colorClasses[plan.categoryColor as keyof typeof colorClasses]} h-2 rounded-full`}
                  style={{ width: `${plan.progress}%` }}
                />
              </div>
            </div>

            {/* 任务预览 */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">包含内容：</p>
              <ul className="text-sm text-gray-300 space-y-1">
                {plan.tasks.slice(0, 3).map((task: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full ${plan.progress > 0 ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md transition-colors`}>
              {plan.progress > 0 ? '继续学习' : '开始学习'}
            </button>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-12 bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">我的学习统计</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500">4</div>
            <div className="text-gray-400">进行中</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500">2</div>
            <div className="text-gray-400">已完成</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500">156</div>
            <div className="text-gray-400">学习天数</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500">89%</div>
            <div className="text-gray-400">完成率</div>
          </div>
        </div>
      </div>
    </div>
  )
}
