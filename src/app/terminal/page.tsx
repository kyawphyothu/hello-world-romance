'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from "motion/react"

export default function TerminalPage() {
  const [output, setOutput] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [typedGreeting, setTypedGreeting] = useState('')
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'User'

  const handleRun = () => {
    setOutput(prev => [...prev, `>>> print("Hello World")`])
    // Start typewriter effect
    let currentIndex = 0
    const greeting = `Hello ${name}`
    const interval = setInterval(() => {
      if (currentIndex <= greeting.length) {
        setTypedGreeting(greeting.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowMessage(true), 1000)
      }
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRun()
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
            
            {/* Welcome Message */}
            <div className="mb-4">
              <div className="text-yellow-400">Welcome to Python Terminal!</div>
              <div className="text-gray-400">Press Enter or click Run to execute: print("Hello World")</div>
            </div>

            {/* Command Output */}
            <div className="mb-4 space-y-2">
              {output.map((line, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={line.startsWith('>>>') ? 'text-blue-400' : 'text-gray-300'}
                >
                  {line}
                </motion.div>
              ))}
              {typedGreeting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300"
                >
                  {typedGreeting}
                </motion.div>
              )}
              {showMessage && (
                <div className="relative">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-pink-400 italic text-lg"
                  >
                    (Because you are my world)
                  </motion.div>
                  {/* Floating Love Icons */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: -50
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute text-pink-400"
                      style={{ left: `${i * 20}%` }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Command Input and Run Button */}
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center">
                <span className="text-green-400 mr-2">&gt;&gt;&gt; </span>
                <div className="text-gray-300 flex-1">print("Hello World")</div>
              </div>
              <button
                onClick={handleRun}
                onKeyPress={handleKeyPress}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-all duration-200 font-mono text-sm"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 