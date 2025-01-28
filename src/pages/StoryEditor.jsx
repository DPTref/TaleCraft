import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function StoryEditor() {
  const { story_id } = useParams()
  const [story, setStory] = useState(null)
  const [userResponse, setUserResponse] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', story_id)
        .single()

      if (error) {
        console.error('Error fetching story:', error)
        toast.error('Failed to load story.')
      } else {
        setStory(data)
        // Generate AI introduction based on story settings
        generateAIIntroduction(data)
      }
      setLoading(false)
    }

    fetchStory()
  }, [story_id])

  const generateAIIntroduction = (storyData) => {
    // Placeholder for AI-generated introduction
    const introduction = `Once upon a time in a ${storyData.environment}, a story began...`
    setAiSuggestions([
      'The hero embarks on a journey.',
      'A mysterious figure appears.',
      'A great challenge arises.',
    ])
    setStory((prev) => ({ ...prev, introduction }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userResponse) {
      toast.error('Please provide a response.')
      return
    }

    const newContent = {
      user_response: userResponse,
      // Here you would generate the next section based on the user response
      next_section: `The story continues with: ${userResponse}`,
    }

    const { error } = await supabase
      .from('stories')
      .update(newContent)
      .eq('id', story_id)

    if (error) {
      console.error('Error saving response:', error)
      toast.error('Failed to save response.')
    } else {
      toast.success('Response saved successfully!')
      setUserResponse('')
      // Optionally, fetch the updated story or generate the next section
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Story Editor</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="story-text mb-4">
              <h2 className="text-xl font-semibold">Your Story</h2>
              <p className="text-gray-800">{story.introduction}</p>
              {/* Display the rest of the story here */}
            </div>
            <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
            <div className="ai-suggestions mb-4">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setUserResponse(suggestion)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Write your response..."
                className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 
                         text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                rows="4"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
