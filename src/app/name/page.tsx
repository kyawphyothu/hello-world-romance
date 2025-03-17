'use client'

// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NamePage() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    console.log('handleSubmit', name)
    e.preventDefault()
    if (name.trim()) {
      console.log('pushing', name)
      console.log(encodeURIComponent(name.trim()))
      router.push(`/terminal?name=${encodeURIComponent(name.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 font-mono">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="text-gray-300">
            <div className="mb-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400"> ~</span>
            </div>
            
            <div className="mb-4">
              <div className="text-yellow-400">Welcome to the Python Terminal!</div>
              <div className="text-gray-400">Please enter your name to continue:</div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">➜</span>
              <span className="text-blue-400 mr-2">~</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-300 flex-1"
                placeholder="Enter your name..."
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 