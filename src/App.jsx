import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LiveTelemetryStream } from './components/telemetry/LiveTelemetryStream.jsx';
import { VehicleSimulator } from './components/fleet/VehicleSimulator.jsx';
import { MissionDispatch } from './components/fleet/MissionDispatch.jsx';
import { DiagnosticsMode } from './components/settings/DiagnosticsMode.jsx';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-viewport">
      {/* Glanceable Compact Header */}
      <header className="flex-between" style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>
            🛰️ FLEETPULSE NEXUS
          </h1>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Single-Screen Mission Command Hub (Routed Mode)
          </span>
        </div>
      </header>

      {/* Glanceable Zero-Scroll Tab Navigation using NavLink */}
      <nav className="tab-bar">
        <NavLink 
          to="/" 
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          style={{ borderBottom: location.pathname === '/' ? '2px solid var(--accent-cyan)' : 'none' }}
        >
          🛰️ Tactical HUD
        </NavLink>
        <NavLink 
          to="/dispatch" 
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          style={{ borderBottom: location.pathname === '/dispatch' ? '2px solid var(--accent-cyan)' : 'none' }}
        >
          📡 Mission Dispatch
        </NavLink>
        <NavLink 
          to="/telemetry" 
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          style={{ borderBottom: location.pathname === '/telemetry' ? '2px solid var(--accent-cyan)' : 'none' }}
        >
          📊 Live Telemetry Stream
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          style={{ borderBottom: location.pathname === '/settings' ? '2px solid var(--accent-cyan)' : 'none', marginLeft: 'auto' }}
        >
          ⚙️ Diagnostics (Mettl)
        </NavLink>
      </nav>

      {/* Main Single-Screen Viewport - Handled by React Router Routes */}
      <main style={{ flexGrow: 1, overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<VehicleSimulator />} />
          <Route path="/dispatch" element={<MissionDispatch />} />
          <Route path="/telemetry" element={<LiveTelemetryStream />} />
          <Route path="/settings" element={<DiagnosticsMode />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={
            <div style={{ color: 'var(--accent-red)', padding: '20px' }}>
              <h2>🚨 404: Sector Not Found</h2>
              <p>The requested route does not exist in the navigation map.</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}
