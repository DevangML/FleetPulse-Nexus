// Raw sensor event emitted by an active field asset (drone/rower/satellite)
export interface TelemetryPacket {
  id: string;
  vehicleId: string;
  velocity: number;
  batteryLevel: number;
  latencyMs: number;
  signalDbm: number;
  timestamp: number;
}

// Aggregated metrics for the dashboard command center
export interface TelemetryStats {
  totalPackets: number;
  avgLatency: number;
  lowBatteryCount: number;
  isStreaming: boolean
}

// Union type for visual card alert states
export type MetricStatus = 'normal' | 'warning' | 'critical';