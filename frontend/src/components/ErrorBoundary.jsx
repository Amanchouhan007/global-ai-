import React from 'react';
import HealthOrbitLogo from './common/HealthOrbitLogo';
import { BRAND } from '../config/brand';

/**
 * Health Orbit Pro™ - Robust Application Error Boundary
 * Prevents blank white screens by intercepting runtime crashes,
 * logging diagnostics, and presenting an intuitive recovery interface.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[Health Orbit Pro ErrorBoundary] Caught uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleResetSession = () => {
    try {
      localStorage.removeItem('globalhealth_auth');
      localStorage.removeItem('globalhealth_history');
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({
              error: this.state.error,
              errorInfo: this.state.errorInfo,
              resetError: this.handleReset,
            })
          : this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'An unexpected client error occurred.';
      const componentStack = this.state.errorInfo?.componentStack || '';

      return (
        <div className="min-h-screen w-full bg-[#F8FAF9] dark:bg-[#080D1A] flex items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-100 antialiased">
          <div className="max-w-lg w-full bg-white dark:bg-[#0F172A] rounded-2xl shadow-xl border border-emerald-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 text-center">

            {/* Brand Logo */}
            <div className="flex items-center justify-center gap-2 select-none">
              <HealthOrbitLogo className="w-8 h-8" idPrefix="error-logo" />
              <div className="flex items-center leading-none">
                <span className="text-[22px] font-black text-[#0D5C3A] dark:text-white tracking-tight">
                  {BRAND.prefix}
                </span>
                <span className="text-[13px] font-black text-white bg-[#D81B60] px-2 py-0.5 rounded-full ml-1.5 align-middle shadow-2xs">
                  {BRAND.suffix}™
                </span>
              </div>
            </div>

            {/* Error Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Application Recovery
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We encountered an unexpected interface issue. Your patient records and session data remain safe. You can reload the page or return to the main home screen.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0D5C3A] hover:bg-[#0A4D30] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleResetSession}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                Return to Home
              </button>
            </div>

            {/* Diagnostic Details (Collapsible) */}
            <details className="text-left text-xs bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <summary className="cursor-pointer font-medium text-slate-700 dark:text-slate-300 select-none outline-none">
                Technical Diagnostics (Click to view)
              </summary>
              <div className="mt-2 space-y-1 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap max-h-32 p-2 bg-white dark:bg-slate-950 rounded border border-slate-100 dark:border-slate-800 text-red-600 dark:text-red-400">
                <p><strong>Error:</strong> {errorMessage}</p>
                {componentStack && <p className="mt-1 text-slate-500 dark:text-slate-400">{componentStack}</p>}
              </div>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
