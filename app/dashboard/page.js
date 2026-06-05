'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [resumes, setResumes] = useState([])

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    target_role: '',
    education: '',
    skills: '',
    projects: '',
    experience: ''
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        setFormData(prev => ({ ...prev, email: user.email }))
        fetchResumes(user.id)
      }
    }
    checkUser()
  }, [])

  const fetchResumes = async (userId) => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error) setResumes(data)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('resumes')
      .insert([{
        user_id: user.id,
        ...formData
      }])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Resume saved! 🎉')
      fetchResumes(user.id)
      setFormData({
        full_name: '',
        email: user.email,
        phone: '',
        target_role: '',
        education: '',
        skills: '',
        projects: '',
        experience: ''
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('resumes').delete().eq('id', id)
    fetchResumes(user.id)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Build Your Resume 🚀</h1>
        <button 
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-6 bg-gray-900 p-8 rounded-2xl mb-12"
      >
        <div>
          <label className="block mb-2 text-sm font-semibold">Full Name</label>
          <input 
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="Manan Suba"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Phone</label>
          <input 
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Target Role 🎯</label>
          <input 
            type="text"
            name="target_role"
            value={formData.target_role}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="Web Developer Intern"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Education 🎓</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="B.Tech in Computer Science, XYZ University, 2022-2026"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Skills 💻</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="JavaScript, React, Node.js"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Projects 🚀</label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="AI Resume Builder - Next.js + OpenAI"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Experience (Optional) 💼</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
            placeholder="Frontend Intern at XYZ"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Resume 💾'}
        </button>
      </form>

      {/* My Resumes */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">My Resumes 📄</h2>
        
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes yet. Create your first one above!</p>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div 
                key={resume.id}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{resume.full_name}</h3>
                    <p className="text-blue-400 text-sm">{resume.target_role}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-2">📧 {resume.email}</p>
                <p className="text-gray-400 text-sm mb-2">📱 {resume.phone}</p>
                <p className="text-gray-400 text-sm mb-2">🎓 {resume.education}</p>
                <p className="text-gray-400 text-sm">💻 {resume.skills}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}