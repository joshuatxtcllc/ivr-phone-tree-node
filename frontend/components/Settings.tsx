import React, { useState } from 'react'
import { PhoneIcon, ChatBubbleLeftRightIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Settings() {
  const [settings, setSettings] = useState({
    businessHours: {
      monday: { start: '09:00', end: '18:00', enabled: true },
      tuesday: { start: '09:00', end: '18:00', enabled: true },
      wednesday: { start: '09:00', end: '18:00', enabled: true },
      thursday: { start: '09:00', end: '18:00', enabled: true },
      friday: { start: '09:00', end: '18:00', enabled: true },
      saturday: { start: '10:00', end: '16:00', enabled: true },
      sunday: { start: '10:00', end: '16:00', enabled: false },
    },
    notifications: {
      missedCalls: true,
      newVoicemails: true,
      smsMessages: true,
    },
    forwarding: {
      enabled: false,
      number: '',
    }
  })

  const days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your communication preferences</p>
      </div>

      <div className="space-y-8">
        {/* Business Hours */}
        <div className="card">
          <div className="flex items-center mb-6">
            <PhoneIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Business Hours</h2>
          </div>
          
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.businessHours[day].enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: {
                        ...settings.businessHours,
                        [day]: { ...settings.businessHours[day], enabled: e.target.checked }
                      }
                    })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="font-medium text-gray-900 capitalize w-20">{day}</span>
                </div>
                
                {settings.businessHours[day].enabled && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={settings.businessHours[day].start}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessHours: {
                          ...settings.businessHours,
                          [day]: { ...settings.businessHours[day], start: e.target.value }
                        }
                      })}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={settings.businessHours[day].end}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessHours: {
                          ...settings.businessHours,
                          [day]: { ...settings.businessHours[day], end: e.target.value }
                        }
                      })}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="flex items-center mb-6">
            <BellIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Missed call alerts</span>
              <input
                type="checkbox"
                checked={settings.notifications.missedCalls}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, missedCalls: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-900">New voicemail notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.newVoicemails}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, newVoicemails: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-900">SMS message alerts</span>
              <input
                type="checkbox"
                checked={settings.notifications.smsMessages}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsMessages: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Call Forwarding */}
        <div className="card">
          <div className="flex items-center mb-6">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Call Forwarding</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.forwarding.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  forwarding: { ...settings.forwarding, enabled: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-gray-900">Enable call forwarding</span>
            </div>
            
            {settings.forwarding.enabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forward to number
                </label>
                <input
                  type="tel"
                  value={settings.forwarding.number}
                  onChange={(e) => setSettings({
                    ...settings,
                    forwarding: { ...settings.forwarding, number: e.target.value }
                  })}
                  placeholder="+1 (713) 555-0123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  )
}