import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Hero() {
  const { user } = useAuth()

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.className = 'magic-sparkle'
      sparkle.style.left = Math.random() * window.innerWidth + 'px'
      document.querySelector('.fantasy-bg')?.appendChild(sparkle)
      
      setTimeout(() => {
        sparkle.remove()
      }, 4000)
    }

    const interval = setInterval(() => {
      createSparkle()
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="text-center hero-section p-8 sm:p-12 max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Craft Your Story with AI
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Become a co-author in AI-powered interactive adventures. 
          Shape your narrative, make choices, and create unique stories.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to={user ? "/dashboard" : "/login"}
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition
                     shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]"
          >
            {user ? "Continue Your Journey" : "Start Your Journey"}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
