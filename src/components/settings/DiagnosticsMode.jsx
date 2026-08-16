import React, { useState } from 'react';
import { VehicleDirectory } from '../directory/VehicleDirectory.jsx';
import { MissionLaunchProtocol } from '../fleet/MissionLaunchProtocol.jsx';
import { MaintenanceChecklist } from '../fleet/MaintenanceChecklist.jsx';
import { LegacyMissionArchives } from '../telemetry/LegacyMissionArchives.jsx';

export function DiagnosticsMode() {
  const [activeTab, setActiveTab] = useState('directory');

  return (
    <div className="stack" style={{ paddingBottom: '40px', height: '100%', overflow: 'hidden' }}>
      <div style={{ marginBottom: '12px', padding: '16px', borderBottom: '2px solid var(--accent-cyan)' }}>
        <h1 style={{ margin: 0, color: 'var(--accent-cyan)', fontSize: '1.4rem' }}>⚙️ Diagnostics & Calibration Sandbox</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Phase 1 Environment: Isolated automated assessment components.
        </p>
      </div>

      <nav className="tab-bar" style={{ marginBottom: '20px' }}>
        <button 
          className={`tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
          style={{ borderBottom: activeTab === 'directory' ? '2px solid var(--accent-cyan)' : 'none' }}
          onClick={() => setActiveTab('directory')}
        >
          🔍 Async Search
        </button>
        <button 
          className={`tab-btn ${activeTab === 'launch' ? 'active' : ''}`}
          style={{ borderBottom: activeTab === 'launch' ? '2px solid var(--accent-cyan)' : 'none' }}
          onClick={() => setActiveTab('launch')}
        >
          🚀 React 19 Forms
        </button>
        <button 
          className={`tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
          style={{ borderBottom: activeTab === 'maintenance' ? '2px solid var(--accent-cyan)' : 'none' }}
          onClick={() => setActiveTab('maintenance')}
        >
          🔧 Array Mutations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'archives' ? 'active' : ''}`}
          style={{ borderBottom: activeTab === 'archives' ? '2px solid var(--accent-cyan)' : 'none' }}
          onClick={() => setActiveTab('archives')}
        >
          💾 Pagination Math
        </button>
      </nav>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 16px' }}>
        {activeTab === 'directory' && <VehicleDirectory />}
        {activeTab === 'launch' && <MissionLaunchProtocol />}
        {activeTab === 'maintenance' && <MaintenanceChecklist />}
        {activeTab === 'archives' && <LegacyMissionArchives />}
      </div>
    </div>
  );
}
