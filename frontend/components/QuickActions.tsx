import React from 'react'
import {
  PhoneIcon,
  MicrophoneIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const actions = [
  {
    title: 'Make Call',
    description: 'Start a new outbound call',
    icon: PhoneIcon,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: 'Record Message',
    description: 'Create a new voicemail',
    icon: MicrophoneIcon,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: 'Send SMS',
    description: 'Send a text message',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: 'IVR Settings',
    description: 'Manage phone tree',
    icon: Cog6ToothIcon,
    color: 'bg-gray-500 hover:bg-gray-600',
  },
]

export default function QuickActions() {
  return (
    <div className="card card-hover">
      <h2 className="text-xl font-bold text-slate-900 mb-8">Quick Actions</h2>
      
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="w-full flex items-center p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-white hover:to-slate-50 rounded-xl transition-all duration-200 text-left border border-slate-200/60 hover:shadow-md hover:-translate-y-0.5 group"
            >
              <div className={`p-3 rounded-xl ${action.color} text-white mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-slate-800">{action.title}</p>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}