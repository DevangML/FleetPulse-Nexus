import React, { useState } from 'react';

export function DefconThreatAssessor() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="card stack">
      <h2>⚠️ Defcon Threat Assessor</h2>
      {/* 
        METTL TODO 1: Render 5 "Threat Level" blocks dynamically using an array (e.g. [1,2,3,4,5].map).
        METTL TODO 2: Implement onMouseEnter to update hoverRating.
        METTL TODO 3: Implement onMouseLeave to reset hoverRating.
        METTL TODO 4: Implement onClick to set the permanent rating state.
        METTL TODO 5: Apply dynamic inline CSS styles (color/background) based on whether the block index is <= hoverRating (or rating).
      */}
      <div style={{ color: 'var(--text-muted)' }}>
        Awaiting your implementation for the Mettl Star Rating Challenge...
      </div>
    </div>
  );
}
