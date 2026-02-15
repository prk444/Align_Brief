'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!authToken || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Legitimate initialization from localStorage
    setUser((prev) => prev ?? parsedUser);
    setFormData((prev) => Object.keys(prev).length === 0 ? parsedUser : prev);

    const savedHistory = localStorage.getItem('simplificationHistory');
    if (savedHistory) {
      setHistory((prev) => prev.length === 0 ? JSON.parse(savedHistory) : prev);
    }
  }, [router]);

  const handleSaveProfile = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to delete all chat history? This cannot be undone.')) {
      localStorage.removeItem('simplificationHistory');
      setHistory([]);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const totalChats = history.length;
  const totalCharactersSaved = history.reduce(
    (total, chat) => total + (chat.original.length - chat.summary.length),
    0
  );
  const averageReduction = totalChats > 0 ? Math.round((totalCharactersSaved / history.reduce((total, chat) => total + chat.original.length, 0)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  {editMode ? '❌ Cancel' : '✏️ Edit'}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.fullName || ''}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold">{user.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company/Organization
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold">{user.company}</p>
                  )}
                </div>

                {editMode && (
                  <button
                    onClick={handleSaveProfile}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition mt-4"
                  >
                    💾 Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Actions</h2>

              <div className="space-y-3">
                <button
                  onClick={handleClearHistory}
                  className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition border-2 border-red-200 dark:border-red-800"
                >
                  🗑️ Clear All Chat History
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                  className="w-full px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition border-2 border-orange-200 dark:border-orange-800"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Statistics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📊 Your Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm">Total Simplifications</p>
                  <p className="text-3xl font-bold">{totalChats}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Characters Saved</p>
                  <p className="text-3xl font-bold">{totalCharactersSaved.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Average Reduction</p>
                  <p className="text-3xl font-bold">{averageReduction}%</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="/dashboard"
                  className="block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition text-center"
                >
                  ✏️ New Simplification
                </a>
                <a
                  href="/chat-history"
                  className="block px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition text-center"
                >
                  📜 View History
                </a>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl shadow-lg p-6 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3">💡 Need Help?</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                Check out our documentation or contact our support team.
              </p>
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                📧 Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
