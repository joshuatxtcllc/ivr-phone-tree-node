import React from 'react'
import { PlusIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

const automations = [
  {
    id: 1,
    name: 'Jay\'s Frames IVR',
    description: 'Main phone tree for customer calls',
    status: 'active',
    triggers: 'Incoming calls to main number',
    lastRun: '2 minutes ago',
  },
  {
    id: 2,
    name: 'After Hours Message',
    description: 'Automated response outside business hours',
    status: 'active',
    triggers: 'Calls outside 9 AM - 6 PM',
    lastRun: '1 hour ago',
  },
  {
    id: 3,
    name: 'Appointment Reminders',
    description: 'SMS reminders for framing consultations',
    status: 'paused',
    triggers: '24 hours before appointment',
    lastRun: 'Yesterday',
  },
]

export default function Automations() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-gray-600 mt-1">Manage your communication workflows</p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Automation
        </button>
      </div>

      <div className="space-y-6">
        {automations.map((automation) => (
          <div key={automation.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{automation.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    automation.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {automation.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{automation.description}</p>
                <div className="text-sm text-gray-500">
                  <p><strong>Triggers:</strong> {automation.triggers}</p>
                  <p><strong>Last run:</strong> {automation.lastRun}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-6">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  {automation.status === 'active' ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </button>
                <button className="btn-secondary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}