'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <div className="aurora opacity-40"></div>
        <div className="absolute inset-0 grid-bg radial-mask"></div>
        <div className="noise"></div>
      </div>

      {/* Spotlight follows mouse */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.06), transparent 40%)`
        }}
      ></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-6 py-3 flex items-center gap-8"
      >
        <h1 className="text-lg font-bold gradient-text-purple">ResumeAI</h1>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </div>
        <Link href="/login">
          <button className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 transition">
            Sign In
          </button>
        </Link>
      </motion.nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32">
        
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 text-xs"
        >
          <span className="bg-purple-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">NEW</span>
          <span className="text-gray-300">GPT-4 powered resume optimization</span>
          <span className="text-gray-500">→</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-center leading-[0.9] tracking-tight mb-6"
        >
          <span className="gradient-text">Resumes that</span>
          <br />
          <span className="gradient-text-purple">get you hired.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-400 text-center text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
        >
          The AI resume builder trusted by professionals at Google, Meta, and Amazon. Beat the ATS. Land the interview.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 mb-16"
        >
          <Link href="/login">
            <button className="btn-primary group flex items-center gap-2">
              Start Building Free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
          <button className="glass text-white font-semibold py-3.5 px-8 rounded-full hover:bg-white/5 transition flex items-center gap-2">
            <span>▶</span> Watch demo
          </button>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs text-gray-500 mb-8"
        >
          TRUSTED BY PROFESSIONALS AT
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center items-center gap-12 text-gray-400 font-bold text-xl"
        >
          <span>Google</span>
          <span>Meta</span>
          <span>Amazon</span>
          <span>Microsoft</span>
          <span>Netflix</span>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-20 max-w-5xl w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-20"></div>
          <div className="relative glass-strong rounded-2xl p-2 border border-white/10">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-12 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📄✨</div>
                <p className="text-gray-500">Your beautiful resume preview</p>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-purple-400 text-sm font-semibold mb-4 tracking-wider">FEATURES</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Built for the</span>
              <br />
              <span className="gradient-text-purple">modern job seeker.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🤖', title: 'AI-Powered Writing', desc: 'GPT-4 crafts bullet points that recruiters love' },
              { icon: '✅', title: 'ATS Optimized', desc: 'Pass any tracking system with confidence' },
              { icon: '⚡', title: '5 Minute Setup', desc: 'From zero to professional resume in minutes' },
              { icon: '🎯', title: 'Job Tailored', desc: 'Customize for any role automatically' },
              { icon: '📄', title: 'Beautiful PDFs', desc: 'Stunning designs that stand out' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your data stays yours. Always.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glow-border rounded-2xl p-8 hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-purple-400 text-sm font-semibold mb-4 tracking-wider">LOVED BY THOUSANDS</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text-purple">Don't take our word for it.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Rahul Sharma', role: 'SDE at Google', text: 'Got 8 interview calls in one week. This tool is unreal. The AI literally wrote better bullet points than I could.', avatar: '🧑‍💻' },
              { name: 'Priya Mehta', role: 'PM at Meta', text: 'I tried 5 resume builders before this. Nothing compares. The ATS optimization actually works. Landed my dream job.', avatar: '👩‍💼' },
              { name: 'Amit Kumar', role: 'Data Scientist', text: 'OMG. Just OMG. I built my resume in 4 minutes and got shortlisted at Amazon, Microsoft, and Netflix.', avatar: '🧑‍🔬' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8"
              >
                <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto glass-strong rounded-3xl p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10K+', label: 'Resumes Built' },
              { num: '95%', label: 'Interview Rate' },
              { num: '4.9★', label: 'Avg Rating' },
              { num: '<5min', label: 'Build Time' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold gradient-text-purple mb-2">{s.num}</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-3xl opacity-20"></div>
          
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 relative">
            <span className="gradient-text">Your dream job</span>
            <br />
            <span className="gradient-text-purple">is one resume away.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 relative">
            Join thousands of professionals getting hired with ResumeAI.
          </p>
          <Link href="/login">
            <button className="btn-primary text-lg relative">
              Get Started — It's Free →
            </button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>© 2025 ResumeAI. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  )
}