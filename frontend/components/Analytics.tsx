import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const callVolumeData = [
  { name: 'Mon', calls: 24 },
  { name: 'Tue', calls: 31 },
  { name: 'Wed', calls: 28 },
  { name: 'Thu', calls: 35 },
  { name: 'Fri', calls: 42 },
  { name: 'Sat', calls: 18 },
  { name: 'Sun', calls: 12 },
]

const callDurationData = [
  { name: '9 AM', duration: 4.2 },
  { name: '10 AM', duration: 3.8 },
  { name: '11 AM', duration: 5.1 },
  { name: '12 PM', duration: 3.5 },
  { name: '1 PM', duration: 4.8 },
  { name: '2 PM', duration: 5.5 },
  { name: '3 PM', duration: 4.1 },
  { name: '4 PM', duration: 6.2 },
  { name: '5 PM', duration: 3.9 },
]

export default function Analytics() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Insights into your communication patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Call Volume This Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Average Call Duration by Hour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callDurationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Calls</h3>
          <p className="text-3xl font-bold text-primary-600">1,247</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Answer Rate</h3>
          <p className="text-3xl font-bold text-green-600">94.2%</p>
          <p className="text-sm text-gray-500 mt-1">Calls answered</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Duration</h3>
          <p className="text-3xl font-bold text-blue-600">4:32</p>
          <p className="text-sm text-gray-500 mt-1">Minutes per call</p>
        </div>
      </div>
    </div>
  )
}