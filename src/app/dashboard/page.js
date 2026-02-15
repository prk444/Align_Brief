'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BriefingForm from '@/components/BriefingForm';
import SimplifiedOutput from '@/components/SimplifiedOutput';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!authToken || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));

    // Load history from localStorage
    const savedHistory = localStorage.getItem('simplificationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, [router]);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/simplify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setResult(result);

        // Add to history
        const newEntry = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          audience: data.audienceLevel,
          original: data.technicalText,
          summary: result.simplifiedText,
        };

        const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50
        setHistory(updatedHistory);
        localStorage.setItem('simplificationHistory', JSON.stringify(updatedHistory));
      } else {
        setError(result.error || 'Failed to simplify briefing');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {!result && !error && (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Create New Simplification
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Paste your technical briefing and select your audience
                  </p>
                  <BriefingForm onSubmit={handleSubmit} isLoading={loading} />

                  {/* Features Overview */}
                  <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">✨ AI-Powered</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Advanced simplification</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-semibold text-green-900 dark:text-green-300">🔐 Secure</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Enterprise-grade encryption</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm font-semibold text-purple-900 dark:text-purple-300">⚡ Fast</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Results in seconds</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm font-semibold text-orange-900 dark:text-orange-300">📤 Shareable</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Export & share easily</p>
                    </div>
                  </div>
                </>
              )}

              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Simplifying your briefing...</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This may take a moment</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">❌ Error</h3>
                  <p className="text-red-700 dark:text-red-200 mb-4">{error}</p>
                  <button
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {result && (
                <div>
                  <SimplifiedOutput
                    simplifiedText={result.simplifiedText}
                    originalLength={result.originalLength}
                    simplifiedLength={result.simplifiedLength}
                  />
                  <button
                    onClick={handleReset}
                    className="w-full mt-6 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    ← Create Another Simplification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📊 Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100 text-sm">Total Simplifications</p>
                  <p className="text-3xl font-bold">{history.length}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Characters Reduced</p>
                  <p className="text-2xl font-bold">
                    {history.reduce(
                      (total, entry) =>
                        total + (entry.original.length - entry.summary.length),
                      0
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {history.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                  <a href="/chat-history" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                    View All →
                  </a>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {history.slice(0, 5).map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => {
                        setResult({
                          simplifiedText: entry.summary,
                          originalLength: entry.original.length,
                          simplifiedLength: entry.summary.length,
                        });
                      }}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      <p className="text-xs text-gray-600 dark:text-gray-400">{entry.timestamp}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {entry.original.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 capitalize mt-1">
                        {entry.audience.replace('-', ' ')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/chat-history"
                  className="block w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition text-center"
                >
                  📜 View Chat History
                </a>
                <a
                  href="/profile"
                  className="block w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition text-center"
                >
                  ⚙️ Profile Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
