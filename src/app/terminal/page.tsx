'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from "motion/react"

export default function TerminalPage() {
  const [output, setOutput] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'User'

  const handleRun = () => {
    setOutput(prev => [...prev, `>>> print("Hello World")`, `Hello ${name}`])
    setTimeout(() => setShowMessage(true), 1500)
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
              {showMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-green-400 italic"
                >
                  (Because you are my world)
                </motion.div>
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
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 