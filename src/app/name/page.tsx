'use client'

// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from "motion/react"

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-pink-900 p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 font-mono border border-pink-500/20"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="text-gray-300">
            <div className="mb-4">
              <span className="text-pink-400">➜</span>
              <span className="text-blue-400"> ~</span>
            </div>
            
            <div className="mb-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-pink-400 text-lg"
              >
                Welcome to the Love Terminal ❤️
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400"
              >
                Please enter your name to begin our journey:
              </motion.div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-pink-400 mr-2">➜</span>
              <span className="text-blue-400 mr-2">~</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-300 flex-1 placeholder-gray-500"
                placeholder="Enter your name..."
                autoFocus
              />
            </form>

            {/* Floating Hearts */}
            {/* {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -50
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute text-pink-400"
                style={{ left: `${i * 30 + 20}%` }}
              >
                ❤️
              </motion.div>
            ))} */}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 