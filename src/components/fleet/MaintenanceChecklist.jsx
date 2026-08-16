import React, { useState } from 'react';

export function MaintenanceChecklist() {
  const [tasks, setTasks] = useState([]);
  
  return (
    <div className="card stack">
      <h2>🔧 Live Active Anomaly Queue</h2>
      {/* 
        METTL TODO 1: Create an input and button to add a new task object to the `tasks` array.
        METTL TODO 2: Map over the tasks array. Ensure you provide a unique `key` prop!
        METTL TODO 3: Implement the remove functionality using `.filter`.
        CRITICAL: Ensure your submit button has `id="add-task-btn"` for headless testing.
      */}
      <p style={{ color: 'var(--text-secondary)' }}>
        [Mettl Sandbox] User must implement state-driven Array Mutation logic here.
      </p>
      
      {/* 
        CRITICAL: Strict boolean rendering is required for automated tests.
        Do NOT use `{tasks.length && ...}`. Use `{tasks.length > 0 && ...}`.
      */}
      {tasks.length > 0 && (
        <ul id="task-list">
          {/* Map tasks here */}
        </ul>
      )}
    </div>
  );
}
