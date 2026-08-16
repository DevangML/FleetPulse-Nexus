import { LiveTelemetryStream } from './components/telemetry/LiveTelemetryStream';
import './App.css'

export default function App() {
  return (
    <div>
      <header style={{ marginBottom: '24px', borderBottom: '1 px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', color: 'var(--cyan)' }}>🛰️ FLEETPULSE NEXUS
        </h1>
        <p style={{margin: '4px 0 0', color: 'var(--muted)', fontSize: '0.9 rem'}}>
          Mission Fleet Telemetry & Event Ingestion Control Console
        </p>
      </header>

      <main>
        <LiveTelemetryStream />
      </main>
    </div>
  );
}
