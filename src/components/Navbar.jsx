import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">TaleCraft</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-purple-400 transition">Home</Link>
            <Link to="/about" className="hover:text-purple-400 transition">About</Link>
            {user ? (
              <Link 
                to="/dashboard" 
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                Start Your Story
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
