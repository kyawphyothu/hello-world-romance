'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from "framer-motion"
import { motion } from 'motion/react'

// Separate client component for the terminal content
function TerminalContent() {
  const [output, setOutput] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [typedGreeting, setTypedGreeting] = useState('')
  const [hasRun, setHasRun] = useState(false)
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/heartbeat.mp3') : null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const fullName = searchParams.get('name') || 'User'
  const firstName = fullName.split(' ')[0]

  useEffect(() => {
    if (audio) {
      audio.volume = 1
      audio.playbackRate = 0.96
      
      // Set up infinite playback
      audio.addEventListener('ended', () => {
        audio.currentTime = 0
        audio.play()
      })
    }

    // Cleanup function to stop audio when component unmounts
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audio])

  const handleRun = () => {
    if (hasRun) return
    setHasRun(true)
    setOutput(prev => [...prev, `>>> print("Hello World")`])
    // Start typewriter effect
    let currentIndex = 0
    const greeting = `Hello ${fullName}`
    const interval = setInterval(() => {
      if (currentIndex <= greeting.length) {
        setTypedGreeting(greeting.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setShowMessage(true)
          if (audio) {
            audio.currentTime = 0
            audio.play()
          }
        }, 1000)
      }
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !hasRun) {
      handleRun()
    }
  }

  const handleReset = () => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    router.push('/name')
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-gray-700/30 text-gray-300 rounded-md border border-pink-500/30 hover:bg-gray-600/40 hover:border-pink-500/50 transition-all duration-200 font-mono text-xs sm:text-sm backdrop-blur-sm"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </motion.button>
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
              {!hasRun ? 'Click Run to print "Hello World"' : 'Program completed. Click Reset to start over.'}
            </motion.div>
          </div>

          {/* Command Output */}
          <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
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
                Hello <span className="line-through">World</span> {fullName}
              </motion.div>
            )}
            {showMessage && (
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-pink-400 italic text-base sm:text-lg inline-block"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1.1, 1.2, 1],
                      color: ["#f472b6", "#ff1493", "#ff1493", "#ff1493", "#f472b6"]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.1, 0.2, 0.3, 1]
                    }}
                    className="inline-block"
                  >
                    Because {firstName}, you are my world{" "}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1.2, 1.3, 1],
                        rotate: [0, 20, -10, 10, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2, 0.3, 1]
                      }}
                      className="inline-block"
                    >
                      ❤️
                    </motion.div>
                  </motion.div>
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
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 flex items-center">
              <span className="text-pink-400 mr-1.5 sm:mr-2">&gt;&gt;&gt; </span>
              <div className="text-gray-300 flex-1 text-xs sm:text-sm">print("Hello World")</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              onKeyPress={handleKeyPress}
              disabled={hasRun}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700/30 text-gray-300 rounded-md border border-pink-500/30 transition-all duration-200 font-mono text-xs sm:text-sm backdrop-blur-sm ${
                hasRun ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600/40 hover:border-pink-500/50'
              }`}
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {hasRun ? 'Completed' : 'Run'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-800/20 backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 font-mono border border-pink-500/30 text-sm sm:text-base relative overflow-hidden">
        <div className="text-gray-300 text-center py-8">Loading...</div>
      </div>
    </div>
  )
}

// Main page component
export default function TerminalPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TerminalContent />
    </Suspense>
  )
} 