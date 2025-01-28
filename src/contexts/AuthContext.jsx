import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session) {
        toast.success('Successfully signed in!')
        navigate('/dashboard')
      } else if (event === 'SIGNED_OUT') {
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleOAuthSignIn = async (provider) => {
    try {
      console.log(`Starting ${provider} sign in...`)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          skipBrowserRedirect: true,
        }
      })
      
      if (error) throw error
      
      if (data?.url) {
        const popup = window.open(data.url, `${provider} Sign In`, 'width=600,height=600')

        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          // Fallback to redirect if popup is blocked
          console.warn('Popup blocked, redirecting instead...')
          window.location.href = data.url
          return
        }

        // Poll for popup closure and auth state change
        const pollTimer = setInterval(() => {
          if (popup.closed) {
            clearInterval(pollTimer)
            supabase.auth.getSession().then(({ data: { session } }) => {
              if (!session) {
                toast.error('Authentication cancelled or failed')
              }
            })
          }
        }, 500)

        return { data, error: null }
      }
    } catch (error) {
      console.error(`${provider} auth error:`, error)
      toast.error('Authentication failed. Please try again.')
      throw error
    }
  }

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signInWithOAuth: handleOAuthSignIn,
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('Error signing out')
      } else {
        toast.success('Signed out successfully')
      }
    },
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
