import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function StorySetup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { storyId } = useParams() // Get storyId from URL parameters
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [themes, setThemes] = useState([])
  const [environment, setEnvironment] = useState('')
  const [characters, setCharacters] = useState([{ name: '', description: '' }])

  useEffect(() => {
    const fetchStory = async () => {
      if (storyId) {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('id', storyId)
          .single()

        if (error) {
          console.error('Error fetching story:', error)
          toast.error('Failed to load story data.')
          return
        }

        if (data) {
          setTitle(data.title)
          setGenre(data.genre)
          setThemes(data.themes || [])
          setEnvironment(data.environment)
          setCharacters(data.characters || [{ name: '', description: '' }])
        }
      }
    }

    fetchStory()
  }, [storyId])

  const handleAddCharacter = () => {
    setCharacters([...characters, { name: '', description: '' }])
  }

  const handleCharacterChange = (index, field, value) => {
    const newCharacters = [...characters]
    newCharacters[index][field] = value
    setCharacters(newCharacters)
  }

  const handleDeleteCharacter = (index) => {
    const newCharacters = characters.filter((_, i) => i !== index)
    setCharacters(newCharacters)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !genre) {
      toast.error('Please fill in all required fields.')
      return
    }

    const storyData = {
      user_id: user.id,
      title,
      genre,
      themes,
      environment,
      characters,
      created_at: new Date().toISOString(),
    }

    try {
      if (storyId) {
        // Update existing story
        const { error } = await supabase
          .from('stories')
          .update(storyData)
          .eq('id', storyId)

        if (error) {
          console.error('Error updating story:', error)
          toast.error('Failed to update story.')
        } else {
          toast.success('Story updated successfully!')
        }
      } else {
        // Create new story
        const { error } = await supabase.from('stories').insert([storyData])

        if (error) {
          console.error('Error creating story:', error)
          toast.error('Failed to create story.')
        } else {
          toast.success('Story created successfully!')
        }
      }

      navigate(`/editor/${storyId || 'new'}`) // Redirect to editor
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('Unexpected error occurred.')
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{storyId ? 'Edit Your Story' : 'Create Your Story'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Story Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter your story title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
            <select
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            >
              <option value="">Select a genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Themes</label>
            <select
              multiple
              value={themes}
              onChange={(e) => setThemes([...e.target.selectedOptions].map(option => option.value))}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            >
              <option value="Betrayal">Betrayal</option>
              <option value="Friendship">Friendship</option>
              <option value="Growth">Growth</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Environment</label>
            <select
              required
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            >
              <option value="">Select an environment</option>
              <option value="City">City</option>
              <option value="Forest">Forest</option>
              <option value="Space Station">Space Station</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-300">Characters</h2>
            {characters.map((character, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                  placeholder="Character Name"
                  className="flex-grow px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={character.description}
                  onChange={(e) => handleCharacterChange(index, 'description', e.target.value)}
                  placeholder="Character Description"
                  className="flex-grow px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 ml-2"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteCharacter(index)}
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCharacter}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add Character
            </button>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Start Story
          </button>
        </form>
      </div>
    </div>
  )
}
