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
    <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl border-r border-slate-700/50">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <PhoneIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CommHub Pro</h1>
            <p className="text-sm text-slate-400">Jay's Frames</p>
          </div>
        </div>
      </div>
      
      <nav className="px-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveView(item.id)}
              className={`sidebar-item w-full ${
                isActive
                  ? 'sidebar-item-active bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'sidebar-item-inactive text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-4" />
              {item.name}
            </button>
          )
        })}
      </nav>
    </div>
  )
}