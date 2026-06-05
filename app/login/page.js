'use client'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Login() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center p-6">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="aurora opacity-40"></div>
        <div className="absolute inset-0 grid-bg radial-mask"></div>
        <div className="noise"></div>
      </div>

      {/* Mouse spotlight */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.08), transparent 40%)`
        }}
      ></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 z-20 text-gray-400 hover:text-white transition flex items-center gap-2 text-sm">
        ← Back to home
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-10 relative overflow-hidden">
          
          {/* Gradient border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl"></div>
          
          <div className="relative z-10">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <Link href="/">
                <div className="text-3xl font-bold gradient-text-purple cursor-pointer">
                  ResumeAI
                </div>
              </Link>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl font-bold gradient-text mb-3 tracking-tight">
                Welcome back
              </h1>
              <p className="text-gray-400 text-base">
                Sign in to continue building your future
              </p>
            </motion.div>

            {/* Google Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center my-8"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="px-4 text-gray-500 text-xs uppercase tracking-wider">Secure Sign In</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {[
                { icon: '🔒', text: 'End-to-end encrypted' },
                { icon: '⚡', text: 'Login in seconds' },
                { icon: '🚀', text: 'Start building instantly' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-lg">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 text-xs text-center mt-8"
            >
              By continuing, you agree to our{' '}
              <a href="#" className="text-gray-400 hover:text-white transition underline">Terms</a>
              {' & '}
              <a href="#" className="text-gray-400 hover:text-white transition underline">Privacy Policy</a>
            </motion.p>

          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Trusted by <span className="text-white font-semibold">10,000+</span> professionals worldwide ✨
        </motion.p>
      </motion.div>

    </main>
  )
}