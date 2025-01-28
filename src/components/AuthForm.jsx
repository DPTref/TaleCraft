import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

export default function AuthForm({ mode = 'login' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, signInWithOAuth } = useAuth()
  const navigate = useNavigate()
  const [showPopupPrompt, setShowPopupPrompt] = useState(false) // Ensure this is defined
  const [activeProvider, setActiveProvider] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = mode === 'login'
        ? await signIn({ email, password })
        : await signUp({ email, password })

      if (error) throw error

      if (mode === 'login') {
        toast.success('Welcome back!')
        navigate('/dashboard')
      } else {
        toast.success('Please check your email for the confirmation link!')
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider) => {
    if (loading) return
    setShowPopupPrompt(false)
    setActiveProvider(provider)

    try {
      setLoading(true)
      await signInWithOAuth(provider)
    } catch (error) {
      if (error.message === 'POPUP_BLOCKED') {
        setShowPopupPrompt(true)
      } else {
        toast.error(`${provider} authentication failed. Please try again.`)
        console.error(`${provider} auth error:`, error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 fantasy-bg">
      <div className="hero-section p-8 sm:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          {mode === 'login' ? 'Welcome Back' : 'Join TaleCraft'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                       text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 
                       text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg 
                     font-semibold transition shadow-[0_0_15px_rgba(168,85,247,0.5)] 
                     hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 
                       border border-gray-700 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 
                       transition-colors duration-200 group disabled:opacity-50"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-gray-300 group-hover:text-white">
                Sign in with Google
              </span>
            </button>

            <button
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 
                       rounded-lg bg-[#1877F2] hover:bg-[#0c60d3] 
                       transition-colors duration-200 disabled:opacity-50"
            >
              <FaFacebook className="w-5 h-5 text-white" />
              <span className="text-white">
                Continue with Facebook
              </span>
            </button>
          </div>

          {showPopupPrompt && activeProvider === 'google' && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 mb-3">
                Pop-up was blocked. Please either:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 mb-3">
                <li>Enable pop-ups for this site</li>
                <li>Use the redirect method below</li>
              </ul>
              <button
                onClick={() => handleOAuthRedirect(activeProvider)}
                className="w-full mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 
                         rounded-lg text-sm transition-colors duration-200"
              >
                Continue with Redirect
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-gray-400">
          {mode === 'login' ? (
            <>
              New to TaleCraft?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
