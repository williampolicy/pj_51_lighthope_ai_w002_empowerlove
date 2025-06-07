"use client"

import { useState } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface AICoachProps {
  assetType: string
  assetTitle: string
}

export default function AICoach({ assetType, assetTitle }: AICoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `您好！我是您的${assetTitle}AI教练。我可以帮助您制定个性化的提升计划，解答相关问题，或提供专业建议。请问有什么可以帮助您的吗？`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const suggestions = {
    physical: [
      "如何制定适合我的运动计划？",
      "改善睡眠质量的方法有哪些？",
      "如何保持健康的饮食习惯？"
    ],
    mental: [
      "如何管理日常压力？",
      "提高专注力的技巧有哪些？",
      "如何培养积极的心态？"
    ],
    social: [
      "如何改善人际关系？",
      "怎样提升沟通技巧？",
      "如何扩大社交圈？"
    ],
    economic: [
      "如何制定个人理财计划？",
      "投资入门需要注意什么？",
      "如何提升职业竞争力？"
    ]
  }

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputText('')
    setIsTyping(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputText, assetType),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (input: string, type: string): string => {
    // 这里是模拟的AI响应，实际项目中应该调用真实的AI API
    const responses = {
      physical: "基于您的问题，我建议您从以下几个方面着手：1) 设定明确的目标 2) 制定循序渐进的计划 3) 保持规律的作息。需要我为您详细说明某个方面吗？",
      mental: "这是一个很好的问题。心理健康需要持续的关注和练习。我建议您尝试：1) 每日冥想5-10分钟 2) 保持gratitude journal 3) 定期进行self-reflection。您想从哪个开始？",
      social: "提升社交能力是一个渐进的过程。建议：1) 主动倾听他人 2) 学习非暴力沟通 3) 参加感兴趣的社交活动。您在社交中遇到的主要困难是什么？",
      economic: "财务规划非常重要。我建议：1) 先建立应急基金 2) 学习基础投资知识 3) 制定长期财务目标。您目前的财务状况如何？我可以提供更具体的建议。"
    }
    return responses[type as keyof typeof responses] || "感谢您的提问！让我为您提供一些个性化的建议..."
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-800 rounded-lg">
      {/* 聊天头部 */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">AI智能教练</h3>
        <p className="text-sm text-gray-400">24小时为您提供专业指导</p>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 快捷建议 */}
      <div className="px-6 py-3 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-2">快捷提问：</p>
        <div className="flex flex-wrap gap-2">
          {suggestions[assetType as keyof typeof suggestions]?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="px-6 py-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
