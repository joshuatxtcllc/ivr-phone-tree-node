import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import CallCenter from './components/CallCenter'
import Automations from './components/Automations'
import Analytics from './components/Analytics'
import Settings from './components/Settings'

type ActiveView = 'dashboard' | 'calls' | 'automations' | 'analytics' | 'settings'

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'calls':
        return <CallCenter />
      case 'automations':
        return <Automations />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  )
}

export default App