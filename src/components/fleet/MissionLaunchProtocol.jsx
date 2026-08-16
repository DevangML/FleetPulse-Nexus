import React, { useActionState } from 'react';

// Mock Server Action
async function submitMission(prevState, formData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const targetGrid = formData.get('targetGrid');
  if (!targetGrid) {
    return { success: false, error: 'Target Grid is required' };
  }
  
  return { success: true, message: `Mission launched to ${targetGrid}` };
}

export function MissionLaunchProtocol() {
  // TODO: React 19 Form Actions & useActionState
  const [state, formAction, isPending] = useActionState(submitMission, null);

  return (
    <div className="card stack">
      <h2>🚀 Mission Launch Protocol</h2>
      
      {/* 
        METTL TODO 1: Wrap this UI in a <form action={formAction}>
        METTL TODO 2: Ensure the input has name="targetGrid" to match the FormData extraction.
        METTL TODO 3: Render the `isPending` state on the submit button.
        METTL TODO 4: Conditionally render the success/error message from `state`.
      */}
      
      <div className="stack" style={{ gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Enter Target Grid (e.g. Alpha-7)" 
          className="input" 
          id="target-grid-input" // Required for Puppeteer testing
        />
        
        <button className="btn btn-primary" id="launch-btn">
          Launch Mission
        </button>
      </div>
    </div>
  );
}
