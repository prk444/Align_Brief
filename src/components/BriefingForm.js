'use client';

import { useState } from 'react';

export default function BriefingForm({ onSubmit, isLoading }) {
  const [technicalText, setTechnicalText] = useState('');
  const [audienceLevel, setAudienceLevel] = useState('executive');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (technicalText.trim()) {
      onSubmit({ technicalText, audienceLevel });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <label htmlFor="technical-input" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Technical Briefing
        </label>
        <textarea
          id="technical-input"
          value={technicalText}
          onChange={(e) => setTechnicalText(e.target.value)}
          placeholder="Paste your technical briefing, update, or project details here..."
          className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="audience" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Audience Level
        </label>
        <select
          id="audience"
          value={audienceLevel}
          onChange={(e) => setAudienceLevel(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isLoading}
        >
          <option value="executive">Executive/C-Level</option>
          <option value="manager">Manager/Team Lead</option>
          <option value="client">Client/Stakeholder</option>
          <option value="general">General Audience</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !technicalText.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {isLoading ? 'Simplifying...' : 'Simplify for Stakeholders'}
      </button>
    </form>
  );
}
