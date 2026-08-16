import React, { useState } from 'react';

// Mock large array of 100 items
const mockLargeDataset = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  logName: `Legacy Mission Log #${i + 1}`
}));

export function LegacyMissionArchives() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  return (
    <div className="card stack">
      <h2>💾 Legacy Mission Archives</h2>
      {/* 
        METTL TODO 1: Calculate the exact slice of `mockLargeDataset` to render based on `currentPage` and `itemsPerPage`.
        METTL TODO 2: Render the sliced array using .map() (Don't forget the key prop!).
        CRITICAL: Render pagination controls with explicit IDs (`id="prev-btn"` and `id="next-btn"`) for Puppeteer.
      */}
      <p style={{ color: 'var(--text-secondary)' }}>
        [Mettl Sandbox] User must implement pagination array slice math logic here.
      </p>
      
      <div className="flex-gap">
        <button id="prev-btn" className="btn" disabled={currentPage === 1}>
          Previous Page
        </button>
        <span id="page-indicator">Page {currentPage}</span>
        <button id="next-btn" className="btn" disabled={currentPage === 10}>
          Next Page
        </button>
      </div>
    </div>
  );
}
