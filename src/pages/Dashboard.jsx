import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="hero-section p-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {user?.email}
          </h1>
          <p className="text-gray-300 mb-8">
            Your storytelling journey awaits...
          </p>
          <button
            onClick={handleSignOut}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg 
                     transition shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
