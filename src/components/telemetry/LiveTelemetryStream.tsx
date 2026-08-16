import React from 'react';
import { MetricCard } from './MetricCard';
import { useTelemetryStream } from '../../hooks/useTelemetryStream';

export const LiveTelemetryStream: React.FC = () => {
  const {
    isStreaming,
    frequencyMs,
    setFrequencyMs,
    latestPacket,
    stats,
    toggleStream,
    resetStream
  } = useTelemetryStream(500);

  return (
    <div className='stack'>
      {/* Control Bar */}
      <div className="card flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className='flex-gap'>
          <button
            onClick={toggleStream}
            className={`btn ${isStreaming ? 'btn-danger' : 'btn-success'}`}
          >{isStreaming ? '⏸️ Pause Stream' : '▶️ Resume Stream'}</button>
          <button className="btn" onClick={resetStream}>
            🔄 Reset
          </button>
        </div>

        <div className="flex-gap">
          <label style={{ fontSize: '0.85rem', color: 'var(--muted' }}>
            Frequency: <strong style={{ color: 'var(--cyan)' }}>{frequencyMs}ms</strong>
          </label>
          <input type="range" min="100" max="2000" step="100" value={frequencyMs} onChange={((e) => setFrequencyMs(Number(e.target.value)))}
            style={{ cursor: 'pointer', accentColor: 'var(--cyan' }}
          />
        </div>
      </div>

      {/* Memoized Metric Cards */}
      <div className="grid">
        <MetricCard
          title='Total Packets'
          value={stats.totalPackets}
          status="normal"
        />
        <MetricCard
          title='Average Latency'
          value={stats.avgLatency}
          unit='ms'
          status={stats.avgLatency > 70 ? 'warning' : 'normal'}
        />
        <MetricCard
          title='Low Battery Alerts'
          value={stats.lowBatteryCount}
          status={stats.lowBatteryCount > 5 ? 'critical' : 'normal'}
        />
        <MetricCard
          title='Active Unit'
          value={latestPacket ? latestPacket.vehicleId : 'STANDBY'}
          status="normal"
        />
      </div>

      {/* Raw Packet Feed */}
      {(latestPacket) ?
        (<div className="card">
          <div
            style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '8px' }}
          >
            RAW TELEMETRY INGESTION FEED ({latestPacket.id})
          </div>
          <pre>{JSON.stringify(latestPacket, null, 2)}</pre>
        </div>) : (<></>)}
    </div>
  );
};