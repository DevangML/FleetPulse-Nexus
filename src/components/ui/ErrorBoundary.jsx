import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 💡 METTL MCQ FOCUS: The only way to catch rendering errors in child component trees!
  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 💡 METTL MCQ FOCUS: Used for logging errors to an external service (e.g., Sentry)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#300', color: '#f55', border: '1px solid #f00', borderRadius: '8px' }}>
          <h2>🚨 System Panic: Rendering Failure</h2>
          <p>{this.state.error?.message}</p>
          <button className="btn" onClick={() => window.location.reload()}>Reboot System</button>
        </div>
      );
    }
    return this.props.children;
  }
}
