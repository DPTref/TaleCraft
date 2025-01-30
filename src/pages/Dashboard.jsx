import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ongoingStories, setOngoingStories] = useState([])
  const [completedStories, setCompletedStories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data: ongoing, error: ongoingError } = await supabase
          .from('stories')
          .select('*')
          .eq('user_id', user.id)
          .is('finished_at', null)
          .order('created_at', { ascending: false })

        const { data: completed, error: completedError } = await supabase
          .from('stories')
          .select('*')
          .eq('user_id', user.id)
          .not('finished_at', 'is', null)
          .order('finished_at', { ascending: false })

        if (ongoingError || completedError) {
          throw new Error('Error fetching stories')
        }

        setOngoingStories(ongoing)
        setCompletedStories(completed)
      } catch (error) {
        console.error('Error fetching stories:', error)
        toast.error('Failed to load stories.')
      }
    }

    fetchStories()
  }, [user.id])

  const openStory = async (storyId) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('story_content')
        .select('content')
        .eq('story_id', storyId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching story content:', error)
        toast.error('Failed to fetch story content.')
        return
      }

      if (!data || !data.content || data.content.trim() === '') {
        navigate(`/story-setup/${storyId}`)
      } else {
        navigate(`/story-editor/${storyId}`)
      }
    } catch (error) {
      console.error('Unexpected error checking story content:', error)
      toast.error('Unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleNewStory = () => {
    navigate('/story-setup')
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.email}!</h1>
          <button 
            onClick={handleNewStory}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Create Your Story
          </button>
        </header>

        {loading && <p>Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Ongoing Stories 📖</h2>
            <div className="space-y-4">
              {ongoingStories.map((story) => (
                <div
                  key={story.id}
                  className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => openStory(story.id)}
                >
                  <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                    <p className="text-sm text-gray-500">Created: {new Date(story.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Completed Stories ✅</h2>
            <div className="space-y-4">
              {completedStories.map((story) => (
                <div
                  key={story.id}
                  className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/read/${story.id}`)}
                >
                  <div className="w-16 h-24 bg-gray-300 rounded-lg mr-4"></div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                    <p className="text-sm text-gray-500">Finished: {new Date(story.finished_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
