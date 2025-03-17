'use client'

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
    <div className="max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/20 backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 font-mono border border-pink-500/30 text-sm sm:text-base relative overflow-hidden"
      >
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 relative">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 backdrop-blur-sm"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="text-gray-300 relative">
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
              Please enter your name to continue
            </motion.div>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-pink-400">&gt;&gt;&gt;</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 text-xs sm:text-sm font-mono"
                autoFocus
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!name.trim()}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700/30 text-gray-300 rounded-md border border-pink-500/30 transition-all duration-200 font-mono text-xs sm:text-sm backdrop-blur-sm ${
                !name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600/40 hover:border-pink-500/50'
              }`}
            >
              Continue
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 