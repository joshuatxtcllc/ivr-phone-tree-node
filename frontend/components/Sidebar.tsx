import React from 'react'
import {
  HomeIcon,
  PhoneIcon,
  CogIcon,
  ChartBarIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, id: 'dashboard' },
  { name: 'Call Center', icon: PhoneIcon, id: 'calls' },
  { name: 'Automations', icon: CommandLineIcon, id: 'automations' },
  { name: 'Analytics', icon: ChartBarIcon, id: 'analytics' },
  { name: 'Settings', icon: CogIcon, id: 'settings' },
]

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Communications Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Jay's Frames</p>
      </div>
      
      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          )
        })}
      </nav>
    </div>
  )
}