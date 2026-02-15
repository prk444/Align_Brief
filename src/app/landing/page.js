'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            📋 Briefing Simplifier
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 text-gray-700 hover:text-blue-600 font-semibold transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 px-4 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Technical Jargon Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Crystal Clear</span> Summaries
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stop the communication gap between developers and stakeholders. Our AI-powered platform automatically converts complex technical briefings into executive-friendly summaries that drive understanding and alignment.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg transition shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 font-bold text-lg transition">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-1 shadow-2xl">
                <div className="bg-white rounded-xl p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
            Why Teams Love Briefing Simplifier
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Targeted Summaries</h3>
              <p className="text-gray-700">
                Customize output for different audience levels: executives, managers, clients, or general stakeholders. Each gets exactly what they need.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-700">
                Get executive summaries in seconds, not hours. Spend more time on strategy, less on translation of complex technical information.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-700">
                Your technical briefs are processed securely with enterprise-grade encryption. Your data is yours alone.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Focus</h3>
              <p className="text-gray-700">
                Highlights impact, ROI, and timelines instead of technical details. Decisions made with confidence.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">📤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Sharing</h3>
              <p className="text-gray-700">
                Copy to clipboard or download summaries instantly. Share with your team seamlessly across platforms.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Scalable</h3>
              <p className="text-gray-700">
                From startup to enterprise, our platform grows with your needs. Process unlimited briefings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in under a minute</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Paste Content</h3>
              <p className="text-gray-600">Paste your technical briefing or project update</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select Audience</h3>
              <p className="text-gray-600">Choose your target stakeholder level</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Share & Save</h3>
              <p className="text-gray-600">Get instant summary and share with your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'VP Product',
                company: 'TechCorp',
                quote: 'This tool has revolutionized how we communicate with our board. No more lost-in-translation moments.',
              },
              {
                name: 'Marcus Johnson',
                role: 'Engineering Manager',
                company: 'InnovateLabs',
                quote: 'What used to take hours of rewriting now takes seconds. Our stakeholders finally understand our challenges.',
              },
              {
                name: 'Emily Rodriguez',
                role: 'CEO',
                company: 'StartupXYZ',
                quote: 'Essential tool for any team trying to bridge the gap between technical and business teams.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of teams already using Briefing Simplifier to bridge the gap between technical and business worlds.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold text-lg transition shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 font-bold text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2026 Technical Briefing Simplifier. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
