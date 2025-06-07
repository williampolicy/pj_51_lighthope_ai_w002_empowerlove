"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return <div>加载中...</div>
  }

  // 使用真实用户数据
  const userData = {
    name: user.name || user.email.split('@')[0],
    email: user.email,
    joinDate: new Date().toLocaleDateString('zh-CN'),
    level: 12,
    points: 3580,
    achievements: 28,
    trainings: 45
  }

  const achievements = [
    { id: 1, title: "初学者", description: "完成第一个训练计划", icon: "🎯", date: "2024-01-20" },
    { id: 2, title: "坚持不懈", description: "连续7天完成训练", icon: "🔥", date: "2024-02-05" },
    { id: 3, title: "全面发展", description: "四大资产均达到60分", icon: "⭐", date: "2024-03-10" },
    { id: 4, title: "社交达人", description: "社交资产突破80分", icon: "🤝", date: "2024-04-15" },
  ]

  const stats = [
    { label: "总学习时长", value: "156小时", icon: "⏱" },
    { label: "完成任务", value: "234个", icon: "✅" },
    { label: "连续打卡", value: "45天", icon: "📅" },
    { label: "获得徽章", value: "28个", icon: "🏆" }
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 用户信息头部 */}
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {userData.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
            <p className="text-gray-400 mb-4">{userData.email}</p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">加入时间：{userData.joinDate}</span>
              <span className="text-yellow-500">等级 {userData.level}</span>
              <span className="text-blue-500">{userData.points} 积分</span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            编辑资料
          </button>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: '总览' },
          { id: 'achievements', label: '成就' },
          { id: 'settings', label: '设置' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 资产雷达图 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">资产分布图</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* 简化的雷达图 */}
                <div className="absolute inset-0 border-2 border-gray-700 rounded-full" />
                <div className="absolute inset-4 border-2 border-gray-700 rounded-full" />
                <div className="absolute inset-8 border-2 border-gray-700 rounded-full" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="text-2xl">💪</div>
                  <div className="text-sm text-gray-400">75</div>
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                  <div className="text-2xl">🧠</div>
                  <div className="text-sm text-gray-400">82</div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="text-2xl">🤝</div>
                  <div className="text-sm text-gray-400">68</div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2">
                  <div className="text-2xl">💰</div>
                  <div className="text-sm text-gray-400">90</div>
                </div>
              </div>
            </div>
          </div>

          {/* 最近活动 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">最近活动</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-semibold">完成"晨间运动计划"第15天</p>
                  <p className="text-sm text-gray-400">2小时前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div className="flex-1">
                  <p className="font-semibold">获得成就"社交达人"</p>
                  <p className="text-sm text-gray-400">昨天</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  📚
                </div>
                <div className="flex-1">
                  <p className="font-semibold">开始学习"投资策略进阶"</p>
                  <p className="text-sm text-gray-400">3天前</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(achievement => (
            <div key={achievement.id} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-colors">
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
              <p className="text-xs text-gray-500">获得于 {achievement.date}</p>
            </div>
          ))}
          {/* 未解锁成就 */}
          {[1, 2, 3].map(i => (
            <div key={`locked-${i}`} className="bg-gray-800 rounded-lg p-6 text-center opacity-50">
              <div className="text-5xl mb-4 filter grayscale">🔒</div>
              <h3 className="text-lg font-semibold mb-2">未解锁</h3>
              <p className="text-sm text-gray-400">继续努力解锁更多成就</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">个人设置</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">用户名</label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">邮箱</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  disabled
                  className="w-full bg-gray-700 text-gray-400 rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">密码</label>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                  修改密码
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">通知设置</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>训练提醒</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span>成就通知</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4" />
                <span>营销邮件</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">账户操作</h2>
            <div className="space-y-4">
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                退出登录
              </button>
              <button className="text-red-500 hover:text-red-400 transition-colors">
                删除账户
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
