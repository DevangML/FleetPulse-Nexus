import React from 'react';
import { useTelemetryStream } from '../../hooks/useTelemetryStream.js';
import { MetricCard } from './MetricCard.jsx';

export function LiveTelemetryStream() {
  const { isStreaming, frequencyMs, setFrequencyMs, latestPacket, stats, toggleStream, resetStream } = useTelemetryStream(500);

  return (
    <div className="stack">
      <div className="card flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="flex-gap">
          <button onClick={toggleStream} className={`btn ${isStreaming ? 'btn-danger' : 'btn-success'}`}>
            {isStreaming ? '⏸️ Pause Stream' : '▶️ Resume Stream'}
          </button>
          <button onClick={resetStream} className="btn">🔄 Reset</button>
        </div>

        <div className="flex-gap">
          <label style={{ fontSize: '0.85rem' }}>Frequency: {frequencyMs}ms</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={frequencyMs}
            onChange={(e) => setFrequencyMs(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid">
        <MetricCard title="Total Packets" value={stats.totalPackets} />
        <MetricCard title="Average Latency" value={stats.avgLatency} unit="ms" />
        <MetricCard title="Low Battery Alerts" value={stats.lowBatteryCount} status={stats.lowBatteryCount > 5 ? 'critical' : 'normal'} />
        <MetricCard title="Active Unit" value={latestPacket ? latestPacket.vehicleId : 'STANDBY'} />
      </div>
      
      <div className="card" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
        <p>Enterprise Virtualized Data Grid will deploy here in Phase 2.</p>
      </div>
    </div>
  );
}
