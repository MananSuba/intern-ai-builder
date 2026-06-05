'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [resumes, setResumes] = useState([])
  const [activeStep, setActiveStep] = useState(1)

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
      setActiveStep(1)
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
    <main className="min-h-screen bg-black text-white relative">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="aurora opacity-30"></div>
        <div className="absolute inset-0 grid-bg radial-mask"></div>
        <div className="noise"></div>
      </div>

      {/* Floating orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

      {/* Top Navigation */}
      <nav className="relative z-20 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text-purple">ResumeAI</h1>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 glass rounded-full px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-gray-300">{user?.email}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="glass text-white text-sm px-4 py-2 rounded-full hover:bg-white/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-purple-400 text-sm font-semibold mb-3 tracking-wider">
            DASHBOARD
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Let's build your</span>
            <br />
            <span className="gradient-text-purple">dream resume.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Fill in your details and our AI will create a job-winning resume.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form 
              onSubmit={handleSubmit}
              className="glass-strong rounded-3xl p-8 space-y-6"
            >
              
              {/* Section: Personal Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Personal Info</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-xs text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs text-gray-400 uppercase tracking-wider">Phone</label>
                    <input 
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Target Role */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Target Role</h3>
                </div>

                <input 
                  type="text"
                  name="target_role"
                  value={formData.target_role}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition"
                  placeholder="e.g., Software Engineer, Marketing Manager"
                />
              </div>

              {/* Section: Education */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>

                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition resize-none"
                  placeholder="B.Tech in Computer Science, XYZ University, 2022-2026"
                />
              </div>

              {/* Section: Skills */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Skills</h3>
                </div>

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition resize-none"
                  placeholder="JavaScript, React, Node.js, Python, MongoDB"
                />
              </div>

              {/* Section: Projects */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-bold">Projects</h3>
                </div>

                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition resize-none"
                  placeholder="AI Resume Builder - Built using Next.js and OpenAI API. Helped 1000+ users."
                />
              </div>

              {/* Section: Experience */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    6
                  </div>
                  <h3 className="text-xl font-bold">Experience <span className="text-xs text-gray-500 font-normal">(Optional)</span></h3>
                </div>

                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 outline-none transition resize-none"
                  placeholder="Frontend Intern at XYZ Company (June 2024 - Aug 2024)"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    Generate My Resume ✨
                  </>
                )}
              </button>

            </form>
          </motion.div>

          {/* Right Sidebar - Stats & Resumes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            
            {/* Quick Stats */}
            <div className="glass-strong rounded-3xl p-6">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Resumes Created</span>
                  <span className="text-3xl font-bold gradient-text-purple">{resumes.length}</span>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">ATS Score</span>
                  <span className="text-3xl font-bold gradient-text-purple">95%</span>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="glass-strong rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-sm text-gray-400 uppercase tracking-wider">Pro Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-purple-400">→</span>
                  Use action verbs in projects
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">→</span>
                  Include numbers & metrics
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">→</span>
                  List 5-10 relevant skills
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">→</span>
                  Be specific about your role
                </li>
              </ul>
            </div>

            {/* My Resumes */}
            <div className="glass-strong rounded-3xl p-6">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                Recent Resumes ({resumes.length})
              </h3>
              
              {resumes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-gray-500 text-sm">No resumes yet. Create your first one!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resumes.slice(0, 5).map((resume) => (
                    <motion.div
                      key={resume.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-2xl p-4 hover:bg-white/5 transition group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{resume.full_name}</h4>
                          <p className="text-purple-400 text-xs">{resume.target_role}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(resume.id)}
                          className="text-gray-500 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {new Date(resume.created_at).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </div>

    </main>
  )
}