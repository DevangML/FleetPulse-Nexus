import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';

export function VehicleDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Mettl TODO: Fetch logic goes here tracking `debouncedSearch`
  // Make sure to set `isLoading` to true while fetching, and false when done.

  return (
    <div className="card stack">
      <h2>📁 Asset Directory</h2>
      {/* 
        METTL TODO 1: Attach an onChange to this input to update `searchTerm`.
        METTL TODO 2: Ensure the input retains `id="search-box"` for automated grading!
      */}
      <input 
        type="text" 
        id="search-box"
        placeholder="Search vehicle ID or type..." 
        className="input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 
        METTL TODO 3: Render a loading state (e.g. <div id="loading-spinner">) when searching.
        METTL TODO 4: Map the `results` array into DOM nodes.
        CRITICAL: Use strict boolean evaluation (results.length > 0) to avoid rendering '0' in the DOM if empty!
      */}
      
      {isLoading && <div id="loading-spinner">Searching...</div>}
      
      {results.length > 0 && (
        <ul id="results-list">
          {/* Map your results here */}
        </ul>
      )}
      
      {/* Fallback instruction block if not implemented */}
      {results.length === 0 && !isLoading && (
        <div style={{ color: 'var(--text-muted)' }}>
          Awaiting your implementation for the Mettl Async Search Challenge...
        </div>
      )}
    </div>
  );
}
