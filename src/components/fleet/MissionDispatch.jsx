import React, { useState } from 'react';
import { useFleetStore } from '../../store/useFleetStore.js';

export function MissionDispatch() {
  const vehicles = useFleetStore((state) => state.vehicles);
  const dispatchMission = useFleetStore((state) => state.dispatchMission);
  
  const [selectedId, setSelectedId] = useState('');
  const [missionName, setMissionName] = useState('');
  const [targetSector, setTargetSector] = useState('SECTOR-1');
  const [dispatchStatus, setDispatchStatus] = useState('');

  // Filter only IDLE vehicles for dispatch
  const availableVehicles = Object.values(vehicles).filter(v => v.status === 'IDLE');

  const handleDispatch = (e) => {
    e.preventDefault();
    if (!selectedId || !missionName.trim()) {
      setDispatchStatus('Error: Missing parameters.');
      return;
    }

    dispatchMission(selectedId, missionName.toUpperCase(), targetSector);
    setDispatchStatus(`Success: ${selectedId} deployed to ${targetSector}`);
    setMissionName('');
    setSelectedId('');
  };

  return (
    <div className="card stack" style={{ maxWidth: '600px', margin: '0 auto', borderTop: '4px solid var(--accent-cyan)' }}>
      <h2 style={{ color: 'var(--accent-cyan)' }}>📡 Strategic Dispatch Hub (Zustand Core)</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Select an available asset and deploy it to an active sector.
      </p>

      <form onSubmit={handleDispatch} className="stack">
        <label>
          <strong>Select Asset</strong>
          <select 
            className="input" 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value)}
            style={{ width: '100%', marginTop: '5px' }}
          >
            <option value="">-- Choose an IDLE Vehicle --</option>
            {availableVehicles.map(v => (
              <option key={v.id} value={v.id}>{v.name} ({v.battery}% Battery)</option>
            ))}
          </select>
        </label>

        <label>
          <strong>Mission Name / Directive</strong>
          <input 
            type="text" 
            className="input" 
            placeholder="e.g. PERIMETER_SWEEP"
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>

        <label>
          <strong>Target Sector</strong>
          <select 
            className="input" 
            value={targetSector} 
            onChange={(e) => setTargetSector(e.target.value)}
            style={{ width: '100%', marginTop: '5px' }}
          >
            <option value="SECTOR-1">Sector 1 (North Grid)</option>
            <option value="SECTOR-2">Sector 2 (East Grid)</option>
            <option value="SECTOR-3">Sector 3 (South Grid)</option>
            <option value="SECTOR-4">Sector 4 (West Grid)</option>
          </select>
        </label>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={!selectedId || !missionName.trim()}
          style={{ marginTop: '10px' }}
        >
          🚀 Authorize Launch
        </button>
      </form>

      {dispatchStatus && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          borderRadius: '4px', 
          background: dispatchStatus.startsWith('Error') ? 'rgba(255,50,50,0.1)' : 'rgba(0,255,200,0.1)',
          color: dispatchStatus.startsWith('Error') ? 'var(--accent-red)' : 'var(--accent-cyan)' 
        }}>
          {dispatchStatus}
        </div>
      )}
    </div>
  );
}
