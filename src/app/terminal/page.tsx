'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from "motion/react"

export default function TerminalPage() {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [autoTypedCommand, setAutoTypedCommand] = useState('')
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'User'

  useEffect(() => {
    const command = 'print("Hello World")'
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= command.length) {
        setAutoTypedCommand(command.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setCommand(command)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [name])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim() === 'print("Hello World")') {
      setOutput(prev => [...prev, `>>> ${command}`, `Hello ${name}`])
      setCommand('')
      setTimeout(() => setShowMessage(true), 1000)
    } else {
      setOutput(prev => [...prev, `>>> ${command}`, 'Error: Please run print("Hello World")'])
      setCommand('')
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
              <div className="text-gray-400">Please run: print("Hello World")</div>
            </div>

            {/* Command Output */}
            <div className="mb-4 space-y-2">
              {output.map((line, index) => (
                <div key={index} className={line.startsWith('>>>') ? 'text-blue-400' : 'text-gray-300'}>
                  {line}
                </div>
              ))}
              {showMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-green-400"
                >
                  (Because you are my world)
                </motion.div>
              )}
            </div>
            
            {/* Command Input */}
            <form onSubmit={handleCommand} className="flex items-center">
              <span className="text-green-400 mr-2">&gt;&gt;&gt; </span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-300 flex-1"
                placeholder="Enter Python command..."
                autoFocus
              />
            </form>

            {/* Auto-typed Command */}
            {autoTypedCommand && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 mt-2"
              >
                {autoTypedCommand}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 