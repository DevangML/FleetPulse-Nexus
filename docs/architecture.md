# FleetPulse Nexus: System Architecture & Reconciliation Flow

This document details the React component hierarchy, Fiber reconciliation guards, and event ingestion sequence for Level 1.

---

## 1. Component Hierarchy & Reconciliation Guard

```mermaid
flowchart TD
    Root["Host DOM Root Element"] --> App["App Component"]

    subgraph Level1 ["Level 1: Telemetry Stream Engine"]
        App --> Stream["LiveTelemetryStream Engine"]

        Stream --> Card1["MetricCard: Total Packets"]
        Stream --> Card2["MetricCard: Average Latency"]
        Stream --> Card3["MetricCard: Low Battery Alerts"]
        Stream --> Card4["MetricCard: Active Unit"]

        Card2 -.-> Guard["React.memo Equality Check"]
        Card3 -.-> Guard
        Card4 -.-> Guard

        Guard -->|Props Equal| Skip["Skip Render (DOM Reused)"]
        Guard -->|Props Changed| Render["Execute Render (DOM Updated)"]
    end
```

---

## 2. Ingestion Loop & Memory Lifecycle (Sequence Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Stream as LiveTelemetryStream (React)
    participant Engine as React Fiber Engine
    participant Timer as setInterval (Browser API)

    User->>Stream: Click Start Stream
    Stream->>Engine: setState(isStreaming = true)
    Engine->>Timer: useEffect -> start setInterval

    loop Every intervalMs
        Timer->>Stream: generatePacket()
        Timer->>Stream: setStats(prev => calculateNext(prev, packet))
        Stream->>Engine: Scheduled Re-render
        Engine-->>User: Re-paint only changed MetricCards
    end

    User->>Stream: Click Pause Stream
    Stream->>Engine: setState(isStreaming = false)
    Engine->>Timer: useEffect cleanup -> clearInterval
```
