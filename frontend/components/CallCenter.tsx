import React, { useState } from 'react'
import axios from 'axios'
import {
  PhoneIcon,
  PhoneXMarkIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline'

export default function CallCenter() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  const handleCall = () => {
    if (phoneNumber) {
      setIsCallActive(true)
      
      // Make actual call via Twilio API
      axios.post('/api/calls/make', {
        to: phoneNumber,
        from: process.env.VITE_TWILIO_PHONE_NUMBER || '+13466392728'
      })
      .then(response => {
        console.log('Call initiated:', response.data)
        // Keep call active state for demo purposes
      })
      .catch(error => {
        console.error('Call failed:', error)
        setIsCallActive(false)
        
        // Show more detailed error message
        const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred'
        alert(`Failed to make call: ${errorMessage}`)
      })
    }
  }

  const handleHangup = () => {
    setIsCallActive(false)
    setPhoneNumber('')
    setIsMuted(false)
    setIsSpeakerOn(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Call Center</h1>
        <p className="text-slate-600 mt-2 text-lg">Make and manage calls directly from your dashboard</p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="card card-hover">
          {!isCallActive ? (
            <div className="space-y-8">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (713) 555-0123"
                  className="input-field text-lg"
                />
              </div>
              
              <button
                onClick={handleCall}
                disabled={!phoneNumber}
                className="w-full flex items-center justify-center px-8 py-4 btn-success disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none text-lg"
              >
                <PhoneIcon className="w-6 h-6 mr-3" />
                Call
              </button>
            </div>
          ) : (
            <div className="text-center space-y-8">
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <PhoneIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-bold text-slate-900">Calling...</p>
                <p className="text-slate-600 text-lg">{phoneNumber}</p>
              </div>
              
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-xl transition-all duration-200 shadow-lg ${
                    isMuted ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <MicrophoneIcon className="w-7 h-7" />
                </button>
                
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`p-4 rounded-xl transition-all duration-200 shadow-lg ${
                    isSpeakerOn ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <SpeakerWaveIcon className="w-7 h-7" />
                </button>
              </div>
              
              <button
                onClick={handleHangup}
                className="w-full flex items-center justify-center px-8 py-4 btn-danger text-lg"
              >
                <PhoneXMarkIcon className="w-6 h-6 mr-3" />
                Hang Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}