import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleNewStory = () => {
    navigate('/story-setup') // Navigate to the StorySetup page
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.email}!</h1>
          <div className="flex space-x-4">
            <button 
              onClick={handleNewStory}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
            >
              Start a New Story
            </button>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Unfinished Stories</h2>
            <div className="space-y-4">
              {/* Placeholder for unfinished stories */}
              <div className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Story Title 1</h3>
                  <p className="text-sm text-gray-500">Word Count: 1200</p>
                  <p className="text-sm text-gray-500">Last Edited: 2023-10-01</p>
                </div>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Story Title 2</h3>
                  <p className="text-sm text-gray-500">Word Count: 800</p>
                  <p className="text-sm text-gray-500">Last Edited: 2023-09-28</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Finished Stories</h2>
            <div className="space-y-4">
              {/* Placeholder for finished stories */}
              <div className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Completed Story Title 1</h3>
                  <p className="text-sm text-gray-500">Word Count: 2500</p>
                  <p className="text-sm text-gray-500">Last Edited: 2023-08-15</p>
                </div>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Completed Story Title 2</h3>
                  <p className="text-sm text-gray-500">Word Count: 3000</p>
                  <p className="text-sm text-gray-500">Last Edited: 2023-07-10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="mt-8 text-center text-gray-500">
          <p>Future features: Search, Favorites, Achievements</p>
        </div>
      </div>
    </div>
  )
}
