'use client'
import { supabase } from '@/lib/supabase'

export default function Login() {
  
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) console.log(error)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      
      <h1 className="text-3xl font-bold mb-2">
        Welcome to InternAI 👋
      </h1>
      
      <p className="text-gray-400 mb-8">
        Sign in to build your resume
      </p>

      <button
        onClick={handleGoogleLogin}
        className="bg-white text-black font-bold py-3 px-8 rounded-full flex items-center gap-3 hover:bg-gray-100 transition"
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-5 h-5"
        />
        Continue with Google
      </button>

    </main>
  )
}