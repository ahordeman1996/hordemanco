import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-hc-black text-hc-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden text-center relative">
          <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <h1 className="font-heading text-6xl md:text-8xl text-hc-red uppercase mb-6 tracking-tighter">System Failure</h1>
            <p className="font-mono text-xl text-hc-white/60 mb-8 uppercase tracking-widest">An unexpected tactical error occurred.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-magnetic bg-hc-white text-hc-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-widest hover:bg-hc-red hover:text-hc-white transition-colors duration-300 rounded-full"
            >
              Reboot System
            </button>
            <div className="mt-12 text-left font-mono text-xs text-hc-white/40 overflow-auto bg-hc-white/5 p-6 rounded-xl border border-hc-white/10 w-full">
              <pre>{this.state.error && this.state.error.toString()}</pre>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
