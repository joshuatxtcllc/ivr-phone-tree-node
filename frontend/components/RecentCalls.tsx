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
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {recentCalls.map((call) => (
          <div key={call.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/60 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl shadow-sm ${
                call.type === 'inbound' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}>
                {call.type === 'inbound' ? (
                  <PhoneArrowDownLeftIcon className="w-5 h-5 text-white" />
                ) : (
                  <PhoneArrowUpRightIcon className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{call.number}</p>
                <p className="text-sm text-slate-500">{call.time}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-slate-900">{call.duration}</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                call.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {call.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}