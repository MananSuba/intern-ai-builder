import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      
      {/* Badge */}
      <div className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full mb-6">
        🚀 AI Powered Resume Builder
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Get Your Dream Internship
        <span className="text-blue-500"> in 5 Minutes</span>
      </h1>

      {/* Subheadline */}
      <p className="text-gray-400 text-center text-lg md:text-xl max-w-xl mb-8">
        Stop sending boring resumes. Our AI builds ATS-friendly 
        resumes tailored for your dream internship role.
      </p>

      {/* CTA Button */}
      

<Link href="/login">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition">
    Build My Resume Free →
  </button>
</Link>

      {/* Social Proof */}
      <p className="text-gray-500 mt-6 text-sm">
        ✅ Free for students  ✅ ATS Optimized  ✅ Download PDF
      </p>
      

    </main>
  )
}