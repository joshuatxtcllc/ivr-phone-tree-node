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
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="w-full flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-left"
            >
              <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}