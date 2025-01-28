import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import StorySetup from './pages/StorySetup' // Import the StorySetup page
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen fantasy-bg text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/story-setup" element={<PrivateRoute><StorySetup /></PrivateRoute>} /> {/* Add StorySetup route */}
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  )
}

export default App;
