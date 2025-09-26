import React from 'react'
import { PhoneArrowUpRightIcon, PhoneArrowDownLeftIcon } from '@heroicons/react/24/outline'

const recentCalls = [
  {
    id: 1,
    type: 'inbound',
    number: '+1 (713) 555-0123',
    duration: '5:23',
    time: '2 minutes ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'outbound',
    number: '+1 (281) 555-0456',
    duration: '3:45',
    time: '15 minutes ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'inbound',
    number: '+1 (832) 555-0789',
    duration: '1:12',
    time: '32 minutes ago',
    status: 'missed',
  },
  {
    id: 4,
    type: 'outbound',
    number: '+1 (713) 555-0321',
    duration: '7:56',
    time: '1 hour ago',
    status: 'completed',
  },
]

export default function RecentCalls() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Calls</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {recentCalls.map((call) => (
          <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                call.type === 'inbound' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {call.type === 'inbound' ? (
                  <PhoneArrowDownLeftIcon className={`w-4 h-4 ${
                    call.type === 'inbound' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                ) : (
                  <PhoneArrowUpRightIcon className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{call.number}</p>
                <p className="text-sm text-gray-500">{call.time}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-gray-900">{call.duration}</p>
              <p className={`text-sm ${
                call.status === 'completed' ? 'text-green-600' : 'text-red-600'
              }`}>
                {call.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}