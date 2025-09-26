import React from 'react'
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
  const metrics = [
    {
      title: 'Total Calls Today',
      value: '47',
      change: '+12%',
      changeType: 'positive' as const,
      icon: PhoneIcon,
    },
    {
      title: 'Outbound Calls',
      value: '23',
      change: '+8%',
      changeType: 'positive' as const,
      icon: PhoneArrowUpRightIcon,
    },
    {
      title: 'Inbound Calls',
      value: '24',
      change: '+15%',
      changeType: 'positive' as const,
      icon: PhoneArrowDownLeftIcon,
    },
    {
      title: 'Avg Call Duration',
      value: '4:32',
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