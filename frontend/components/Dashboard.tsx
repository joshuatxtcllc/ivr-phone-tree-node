import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  PhoneIcon,
  PhoneArrowUpRightIcon,
  PhoneArrowDownLeftIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import MetricCard from './MetricCard'
import RecentCalls from './RecentCalls'
import QuickActions from './QuickActions'

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalCalls: 0,
    answerRate: 0,
    avgDuration: 0,
    recentCalls: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/calls/analytics')
      setAnalytics(response.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const metrics = [
    {
      title: 'Total Calls This Week',
      value: loading ? '...' : analytics.totalCalls.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: PhoneIcon,
    },
    {
      title: 'Answer Rate',
      value: loading ? '...' : `${analytics.answerRate}%`,
      change: '+8%',
      changeType: 'positive' as const,
      icon: PhoneArrowUpRightIcon,
    },
    {
      title: 'Recent Calls',
      value: loading ? '...' : analytics.recentCalls.length.toString(),
      change: '+15%',
      changeType: 'positive' as const,
      icon: PhoneArrowDownLeftIcon,
    },
    {
      title: 'Avg Call Duration',
      value: loading ? '...' : formatDuration(analytics.avgDuration),
      change: '-2%',
      changeType: 'negative' as const,
      icon: ClockIcon,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Communications Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your business communications in real-time</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentCalls />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}