'use client'

// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"

export default function NamePage() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      router.push(`/terminal?name=${encodeURIComponent(name.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-pink-900 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 font-mono border border-pink-500/20 text-sm sm:text-base"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="text-gray-300">
            <div className="mb-3 sm:mb-4">
              <span className="text-pink-400">➜</span>
              <span className="text-blue-400"> ~</span>
            </div>
            
            {/* Welcome Message */}
            <div className="mb-3 sm:mb-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-pink-400 text-base sm:text-lg"
              >
                Welcome to the Love Terminal ❤️
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-xs sm:text-sm"
              >
                Please enter your name to begin your journey
              </motion.div>
            </div>

            {/* Name Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-pink-400 text-xs sm:text-sm">&gt;&gt;&gt; </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1 bg-transparent border-none outline-none text-gray-300 text-xs sm:text-sm placeholder-gray-500"
                  autoFocus
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700/80 text-gray-300 rounded-md border border-pink-500/30 hover:bg-gray-600/80 hover:border-pink-500/50 transition-all duration-200 font-mono text-xs sm:text-sm"
              >
                <svg 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                Continue
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 