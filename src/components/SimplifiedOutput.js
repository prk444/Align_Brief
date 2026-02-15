'use client';

import { useState } from 'react';

export default function SimplifiedOutput({ simplifiedText, originalLength, simplifiedLength }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(simplifiedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([simplifiedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'executive-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const reductionPercentage = ((1 - simplifiedLength / originalLength) * 100).toFixed(1);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-2 border-green-300 dark:border-green-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">✓ Executive Summary</h2>
        <span className="text-sm bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full font-semibold">
          {reductionPercentage}% shorter
        </span>
      </div>

      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 flex gap-4">
        <span>Original: {originalLength} characters</span>
        <span>Simplified: {simplifiedLength} characters</span>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6 border-l-4 border-green-500 shadow-sm">
        <div className="prose dark:prose-invert max-w-none">
          {simplifiedText.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Download as Text
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Share this summary with your stakeholders for better alignment and understanding of project progress.
        </p>
      </div>
    </div>
  );
}
