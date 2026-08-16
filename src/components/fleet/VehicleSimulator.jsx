import React from 'react';
import { useFleetStore } from '../../store/useFleetStore.js';

export function VehicleSimulator() {
  const selectedVehicleId = useFleetStore((state) => state.selectedVehicleId);
  const vehicle = useFleetStore((state) => (selectedVehicleId ? state.vehicles[selectedVehicleId] : null));
  const recallVehicle = useFleetStore((state) => state.recallVehicle);
  const dockVehicle = useFleetStore((state) => state.dockVehicle);

  if (!vehicle) {
    return (
      <div className="card stack" style={{ alignItems: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        <h2>NO VEHICLE SELECTED</h2>
        <p>Awaiting tactical dispatch from the directory.</p>
      </div>
    );
  }

  return (
    <div className="stack" style={{ gap: '20px' }}>
      <div className="card stack" style={{ borderLeft: '4px solid var(--accent-cyan)' }} data-testid="vehicle-simulator">
        <div className="flex-between">
          <h2 style={{ margin: 0 }}>{vehicle.name} ({vehicle.id})</h2>
          <span 
            className={`badge badge-${vehicle.status === 'SURVEYING' ? 'normal' : vehicle.status === 'READY_TO_DOCK' ? 'normal' : 'warning'}`} 
            data-testid="vehicle-status"
          >
            STATUS: {vehicle.status}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.9rem' }}>
          <p style={{ margin: 0 }}>Sector: <strong>{vehicle.sector}</strong></p>
          <p style={{ margin: 0 }}>Coords: [{vehicle.coords.join(', ')}]</p>
          <p style={{ margin: 0 }}>Mission: <strong style={{ color: 'var(--accent-cyan)' }}>{vehicle.activeMission || 'NONE (IDLE)'}</strong></p>
          <p style={{ margin: 0 }}>Battery: <strong>{vehicle.battery}%</strong></p>
        </div>

        {/* Compact Tactical Activity Log */}
        <div style={{ background: '#040711', padding: '10px 14px', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid var(--border-subtle)' }}>
          <strong style={{ color: 'var(--accent-cyan)' }}>Tactical Mission Log:</strong>
          <ul style={{ paddingLeft: '18px', margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
            {vehicle.history?.map((entry, idx) => (
              <li key={idx} style={{ opacity: idx === 0 ? 1 : 0.6 }}>{entry}</li>
            ))}
          </ul>
        </div>

        <div className="flex-gap">
          {vehicle.status === 'RETURNING' && (
            <button className="btn" disabled style={{ opacity: 0.7 }}>
              ⏳ En Route to Base (In Transit... 3s)
            </button>
          )}

          {vehicle.status === 'READY_TO_DOCK' && (
            <button
              className="btn btn-success"
              onClick={() => dockVehicle(vehicle.id)}
              data-testid="dock-button"
            >
              ⚡ Ready at Base — Click to Dock & Recharge (100%)
            </button>
          )}

          {vehicle.status !== 'RETURNING' && vehicle.status !== 'READY_TO_DOCK' && (
            <button
              className="btn btn-danger"
              onClick={() => recallVehicle(vehicle.id)}
              data-testid="rtb-button"
            >
              🚨 Trigger Return-To-Base
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
