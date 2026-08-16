import React, { useState, useEffect } from 'react';

// MOCK API: Fleet Database Search Endpoint
const MOCK_ASSET_API = "https://jsonplaceholder.typicode.com/users";

export function VehicleDirectory() {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // METTL TODO: Implement the debounce logic here (500ms delay before fetching).
  // CRITICAL: Ensure you clear the timer on every keystroke to prevent network leaks.
  
  return (
    <div className="card stack">
      <h2>📁 Asset Directory (Debounced Auto-Filter Grid)</h2>
      
      {/* REQUIRED ID: search-input */}
      <input 
        type="text" 
        id="search-input"
        placeholder="Filter system records..." 
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* CONDITIONAL RENDER: Safe boolean check avoids rendering '0' strings */}
      {loading && <div id="loading-indicator">Synchronizing records...</div>}
      {apiError && <div id="error-display" style={{ color: 'var(--accent-red)' }}>{apiError}</div>}
      
      {/* REQUIRED ID: results-grid */}
      {records.length > 0 && (
        <ul id="results-grid">
          {/* Map your results here. Don't forget the unique key! */}
        </ul>
      )}
      
      {/* EDGE CASE: Array is empty and user isn't waiting for a fetch response */}
      {!loading && query.trim() && records.length === 0 && (
        <div id="empty-state" style={{ color: 'var(--text-muted)' }}>
          No matching asset logs found.
        </div>
      )}

      {/* Sandbox placeholder (remove when coding) */}
      {!loading && records.length === 0 && !query.trim() && (
        <div style={{ color: 'var(--text-muted)' }}>
          Awaiting debounced fetch implementation...
        </div>
      )}
    </div>
  );
}
