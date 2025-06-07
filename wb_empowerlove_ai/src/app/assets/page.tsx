"use client"

import Link from 'next/link'

export default function AssetsPage() {
  const assets = [
    { 
      title: "身体资产", 
      icon: "💪", 
      score: 75, 
      color: "blue",
      type: "physical",
      description: "运动、营养、睡眠"
    },
    { 
      title: "心理资产", 
      icon: "🧠", 
      score: 82, 
      color: "purple",
      type: "mental",
      description: "认知、情绪、压力管理"
    },
    { 
      title: "社交资产", 
      icon: "🤝", 
      score: 68, 
      color: "green",
      type: "social",
      description: "人际关系、沟通能力"
    },
    { 
      title: "经济资产", 
      icon: "💰", 
      score: 90, 
      color: "yellow",
      type: "economic",
      description: "财务、职业发展"
    }
  ]

  const totalScore = Math.round(
    assets.reduce((sum, asset) => sum + asset.score, 0) / assets.length
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          您的人性资产总览
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          全面评估和提升您的四大核心资产
        </p>
        
        <div className="inline-flex items-center bg-gray-800 rounded-full px-8 py-4">
          <span className="text-lg text-gray-400 mr-4">综合评分</span>
          <span className="text-5xl font-bold">{totalScore}</span>
          <span className="text-2xl text-gray-400 ml-2">/ 100</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <Link key={asset.type} href={`/assets/${asset.type}`}>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer h-full">
              <div className="text-4xl mb-4">{asset.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{asset.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{asset.description}</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                  <div
                    className={`bg-${asset.color}-500 h-2 rounded-full`}
                    style={{ width: `${asset.score}%` }}
                  />
                </div>
                <span className="text-2xl font-bold">{asset.score}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">AI 智能建议</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-green-500/20 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">优势领域</h3>
              <p className="text-gray-400">
                您的经济资产(90分)表现出色，继续保持良好的理财习惯
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-yellow-500/20 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">提升重点</h3>
              <p className="text-gray-400">
                社交资产(68分)有较大提升空间，建议加强人际交往
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
