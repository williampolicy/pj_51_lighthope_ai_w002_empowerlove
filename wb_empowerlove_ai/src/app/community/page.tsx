"use client"

import { useState, useEffect } from 'react'

const posts = [
  {
    id: 1,
    author: "李明",
    avatar: "李",
    title: "终于突破80分！分享我的身体资产提升经验",
    content: "坚持了3个月的晨跑计划，配合合理饮食，我的身体资产从65分提升到了82分！最大的感受是精力充沛了很多...",
    category: "physical",
    categoryName: "身体资产",
    likes: 128,
    comments: 23,
    time: "2小时前",
    tags: ["经验分享", "晨跑", "饮食"]
  },
  {
    id: 2,
    author: "王芳",
    avatar: "王",
    title: "冥想真的有用！一个月让我的心理资产提升15分",
    content: "作为一个焦虑症患者，我尝试了平台推荐的正念冥想课程。刚开始很难静下心，但坚持下来效果真的很明显...",
    category: "mental",
    categoryName: "心理资产",
    likes: 256,
    comments: 45,
    time: "5小时前",
    tags: ["冥想", "心理健康", "焦虑管理"]
  },
  {
    id: 3,
    author: "张强",
    avatar: "张",
    title: "从社恐到社牛：我的社交资产提升之路",
    content: "以前的我见人就紧张，现在能够自信地在公司做演讲了。分享几个对我帮助最大的技巧...",
    category: "social",
    categoryName: "社交资产",
    likes: 189,
    comments: 67,
    time: "1天前",
    tags: ["社交技巧", "公众演讲", "自信"]
  },
  {
    id: 4,
    author: "刘洋",
    avatar: "刘",
    title: "理财小白的进阶之路：3个月实现20%收益",
    content: "从完全不懂理财到现在能够独立制定投资策略，感谢平台的经济资产课程。今天分享一下我的学习路径...",
    category: "economic",
    categoryName: "经济资产",
    likes: 342,
    comments: 89,
    time: "2天前",
    tags: ["理财", "投资", "财务自由"]
  }
]

const discussions = [
  {
    id: 1,
    title: "大家都是怎么坚持早起运动的？",
    author: "小明",
    replies: 45,
    lastReply: "10分钟前"
  },
  {
    id: 2,
    title: "有没有人一起组队学习投资课程？",
    author: "投资新手",
    replies: 23,
    lastReply: "1小时前"
  },
  {
    id: 3,
    title: "社交恐惧症的朋友们，我们建个互助群吧",
    author: "慢慢来",
    replies: 67,
    lastReply: "3小时前"
  }
]

// 固定的热门话题数据
const hotTopics = [
  { name: '21天运动打卡', count: 86 },
  { name: '冥想初体验', count: 72 },
  { name: '理财第一课', count: 95 },
  { name: '社交突破计划', count: 58 }
]

// 固定的活跃用户数据
const activeUsers = [
  { name: '健身达人小李', shareCount: 42 },
  { name: '冥想导师Alice', shareCount: 38 },
  { name: '理财专家老王', shareCount: 56 },
  { name: '社交达人Mary', shareCount: 31 }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('posts')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    { value: 'all', label: '全部', icon: '🌟' },
    { value: 'physical', label: '身体资产', icon: '💪' },
    { value: 'mental', label: '心理资产', icon: '🧠' },
    { value: 'social', label: '社交资产', icon: '🤝' },
    { value: 'economic', label: '经济资产', icon: '💰' }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const categoryColors = {
    physical: 'text-blue-500 bg-blue-500/10',
    mental: 'text-purple-500 bg-purple-500/10',
    social: 'text-green-500 bg-green-500/10',
    economic: 'text-yellow-500 bg-yellow-500/10'
  }

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">社区</h1>
        <p className="text-xl text-gray-400">与志同道合的伙伴一起成长</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-500">1,234</div>
          <div className="text-gray-400">活跃用户</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-500">5,678</div>
          <div className="text-gray-400">帖子总数</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-500">23,456</div>
          <div className="text-gray-400">互动次数</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-500">89</div>
          <div className="text-gray-400">今日新帖</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'posts'
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          精选分享
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'discussions'
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          话题讨论
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          排行榜
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 分类筛选 */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* 帖子列表 */}
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{post.author}</h3>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-gray-400 text-sm">{post.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[post.category as keyof typeof categoryColors]}`}>
                        {post.categoryName}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.062 18 14.518 18 14c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M9 20l.879-2.636m2.242 2.636L11.121 17m6.758 3l-.879-2.636m-2.242 2.636L15.879 17M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        分享
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 发帖按钮 */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              发布分享
            </button>

            {/* 热门话题 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">🔥 热门话题</h3>
              <div className="space-y-3">
                {hotTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">#{topic.name}</span>
                    <span className="text-xs text-gray-500">{topic.count}讨论</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 活跃用户 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">⭐ 活跃贡献者</h3>
              <div className="space-y-3">
                {activeUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.shareCount}篇分享</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {discussions.map(discussion => (
            <div key={discussion.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>发起人：{discussion.author}</span>
                    <span>{discussion.replies} 回复</span>
                    <span>最后回复：{discussion.lastReply}</span>
                  </div>
                </div>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                  参与讨论
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 总分排行 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">🏆 综合排行榜</h3>
            <div className="space-y-4">
              {[
                { rank: 1, name: '王大明', score: 356, avatar: '王' },
                { rank: 2, name: '李小花', score: 342, avatar: '李' },
                { rank: 3, name: '张三丰', score: 338, avatar: '张' },
                { rank: 4, name: '赵四海', score: 325, avatar: '赵' },
                { rank: 5, name: '刘德华', score: 318, avatar: '刘' }
              ].map(user => (
                <div key={user.rank} className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${user.rank <= 3 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    #{user.rank}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">综合得分：{user.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 月度进步榜 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">📈 月度进步榜</h3>
            <div className="space-y-4">
              {[
                { rank: 1, name: '新手小白', progress: '+45%', avatar: '新' },
                { rank: 2, name: '努力向上', progress: '+38%', avatar: '努' },
                { rank: 3, name: '坚持不懈', progress: '+32%', avatar: '坚' },
                { rank: 4, name: '勇往直前', progress: '+28%', avatar: '勇' },
                { rank: 5, name: '永不放弃', progress: '+25%', avatar: '永' }
              ].map(user => (
                <div key={user.rank} className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${user.rank <= 3 ? 'text-green-500' : 'text-gray-400'}`}>
                    #{user.rank}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">进步幅度：{user.progress}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
