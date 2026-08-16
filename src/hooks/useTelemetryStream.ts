import { useState, useEffect, useCallback } from 'react';
import type { TelemetryPacket, TelemetryStats } from '../types/telemetry';

export function useTelemetryStream(initialFrequencyMs: number = 500) {
    // State Variables
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [frequencyMs, setFrequencyMs] = useState<number>(initialFrequencyMs);
  const [latestPacket, setLatestPacket] = useState<TelemetryPacket | null>(null);
  const [stats, setStats] = useState<TelemetryStats>({
    totalPackets: 0,
    avgLatency: 0,
    lowBatteryCount: 0,
    isStreaming: true,
  });

  // Mock sensor data generator (wrapped in useCallback for stable reference)
  const generatePacket = useCallback((): TelemetryPacket => {
    const assets = ['DRONE-ALPHA', 'DRONE-BRAVO', 'DRONE-CHARLIE', 'ROVER-DELTA', 'SAT-ECHO'];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];

    return {
      id: `pkt-${Date.now().toString().slice(-4)}`,
      vehicleId: randomAsset,
      velocity: Math.floor(Math.random() * 80) + 20,   // (22-100 km/h)
      batteryLevel: Math.floor(Math.random() * 100),   // 0-100%
      latencyMs: Math.floor(Math.random() * 90) + 10,    // 10-100 ms
      signalDbm: -1 * (Math.floor(Math.random() * 50) + 30), // -30 to -80 dBm
      timestamp: Date.now()
    };
  }, []);

  // Live Streaming Effect (Timer + Cleanup + No Stale Closures)
  useEffect(() => {
    if (!isStreaming) return;

    const timer = setInterval(() => {
      const packet = generatePacket();
      setLatestPacket(packet);

      setStats((prev) => {
        const nextTotal = prev.totalPackets + 1;
        const nextAvg = Math.round(
          (prev.avgLatency * prev.totalPackets + packet.latencyMs) / nextTotal
        );
        const nextLowBattery =
          packet.batteryLevel < 20 ? prev.lowBatteryCount + 1 : prev.lowBatteryCount;

        return {
          totalPackets: nextTotal,
          avgLatency: nextAvg,
          lowBatteryCount: nextLowBattery,
          isStreaming: true
        };

      });
    }, frequencyMs);

    // When page is disposed, cleanup
    return (() => clearInterval(timer));
  }, [isStreaming, frequencyMs, generatePacket])

  // Action handlers
  const toggleStream = () => setIsStreaming((prev) => !prev);

  const resetStream = () => {
    setIsStreaming(false);
    setLatestPacket(null);
    setStats({
      totalPackets: 0,
      avgLatency: 0,
      lowBatteryCount: 0,
      isStreaming: false,
    });
  };

  return { isStreaming, frequencyMs, setFrequencyMs, latestPacket, stats, toggleStream, resetStream };
}