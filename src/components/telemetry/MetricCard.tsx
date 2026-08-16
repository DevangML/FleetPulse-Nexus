import React, { useRef } from 'react';
import type { MetricStatus } from '../../types/telemetry';

// Interface of props
export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: MetricStatus
}

// Base component
const MetricCardBase: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '',
  status = 'normal'
}) => {
  const renderCount = useRef(1);
  renderCount.current += 1;

  const statusClass = status === 'critical' ? 'card-critical' : status === 'warning' ? 'card-warning' : '';

  return (
    <>
      <div className={`card ${statusClass}`}>
        <div className='flex-between'>
          <span style={{fontSize: '0.8 rem', color: 'var(--muted)', textTransform:'uppercase'}}>{title}</span>
          <kbd>Renders: {renderCount.current}</kbd>
        </div>

        <div style={{ marginTop: '8px', fontSize: '1.75 rem', fontWeight: 700 }}>
          {value}
          <span style={{fontSize: '0.9 rem', color: 'var(--muted)'}}>{unit}</span>
        </div>
      </div>
    </>
  )
};

// Memoized class based on equality

export const MetricCard = React.memo(
  MetricCardBase,
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.status === nextProps.status &&
    prevProps.title === nextProps.title
);