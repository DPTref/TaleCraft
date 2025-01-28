import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TaleCraft</h3>
            <p className="text-gray-300">AI-powered interactive storytelling platform</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-purple-400">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-purple-400">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">support@talecraft.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} TaleCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
