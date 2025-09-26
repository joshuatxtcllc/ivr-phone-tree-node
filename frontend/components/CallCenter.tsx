import React, { useState } from 'react'
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
      // Here you would integrate with Twilio to make the actual call
      console.log('Making call to:', phoneNumber)
    }
  }

  const handleHangup = () => {
    setIsCallActive(false)
    setPhoneNumber('')
    setIsMuted(false)
    setIsSpeakerOn(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Call Center</h1>
        <p className="text-gray-600 mt-1">Make and manage calls directly from your dashboard</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="card">
          {!isCallActive ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (713) 555-0123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <button
                onClick={handleCall}
                disabled={!phoneNumber}
                className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div>
                <p className="text-lg font-medium text-gray-900">Calling...</p>
                <p className="text-gray-600">{phoneNumber}</p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <MicrophoneIcon className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    isSpeakerOn ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <SpeakerWaveIcon className="w-6 h-6" />
                </button>
              </div>
              
              <button
                onClick={handleHangup}
                className="w-full flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <PhoneXMarkIcon className="w-5 h-5 mr-2" />
                Hang Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}