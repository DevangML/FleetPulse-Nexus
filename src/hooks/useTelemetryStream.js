import { useState, useEffect, useCallback } from 'react';

export function useTelemetryStream(initialFrequency = 500) {
  const [isStreaming, setIsStreaming] = useState(true);
  const [frequencyMs, setFrequencyMs] = useState(initialFrequency);
  const [latestPacket, setLatestPacket] = useState(null);
  const [stats, setStats] = useState({
    totalPackets: 0,
    avgLatency: 0,
    lowBatteryCount: 0,
  });

  const generatePacket = useCallback(() => {
    const assets = ['DRONE-ALPHA', 'DRONE-BRAVO', 'DRONE-CHARLIE', 'ROVER-DELTA', 'SAT-ECHO'];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];

    return {
      id: `pkt-${Date.now().toString().slice(-4)}`,
      vehicleId: randomAsset,
      batteryLevel: Math.floor(Math.random() * 100),
      latencyMs: Math.floor(Math.random() * 90) + 10,
      timestamp: Date.now(),
    };
  }, []);

  useEffect(() => {
    if (!isStreaming) return;

    const timer = setInterval(() => {
      const packet = generatePacket();
      setLatestPacket(packet);

      setStats((prev) => {
        const nextTotal = prev.totalPackets + 1;
        const nextAvg = Math.round((prev.avgLatency * prev.totalPackets + packet.latencyMs) / nextTotal);
        const nextLow = packet.batteryLevel < 20 ? prev.lowBatteryCount + 1 : prev.lowBatteryCount;

        return {
          totalPackets: nextTotal,
          avgLatency: nextAvg,
          lowBatteryCount: nextLow,
        };
      });
    }, frequencyMs);

    return () => clearInterval(timer);
  }, [isStreaming, frequencyMs, generatePacket]);

  const toggleStream = () => setIsStreaming((prev) => !prev);
  const resetStream = () => {
    setIsStreaming(false);
    setLatestPacket(null);
    setStats({ totalPackets: 0, avgLatency: 0, lowBatteryCount: 0 });
  };

  return { isStreaming, frequencyMs, setFrequencyMs, latestPacket, stats, toggleStream, resetStream };
}
