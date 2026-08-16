import React from 'react';

export function MetricCard({ title, value, unit = '', status = 'normal' }) {
  return (
    <div className="card" data-testid="metric-card">
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{title}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '8px 0', color: status === 'critical' ? 'var(--accent-red)' : 'inherit' }}>
        {value} {unit}
      </div>
    </div>
  );
}
