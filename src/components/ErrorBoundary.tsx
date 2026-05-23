import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null; info: ErrorInfo | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, info: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReport = (): void => {
    const subject = encodeURIComponent('JobFilter Error Report');
    const body = encodeURIComponent(
      `Error: ${this.state.error?.message ?? 'Unknown'}\n\nComponent: ${this.state.info?.componentStack ?? 'N/A'}\n\nURL: ${window.location.href}\n\n---\nPlease describe what you were doing when this happened:`
    );
    window.location.href = `mailto:support@jobfilter.uk?subject=${subject}&body=${body}`;
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6">
        <div className="jf-box bg-white p-8 max-w-lg w-full text-center">
          <p className="micro-label text-[var(--orange)]">SOMETHING WENT WRONG</p>
          <h1 className="headline mt-4 text-4xl leading-none text-[var(--navy)]">
            THE SITE HIT A SNAG.
          </h1>
          <p className="mt-4 text-lg font-black text-[var(--muted)]">
            Not your fault. Ours. The page crashed but the rest of the site is fine.
          </p>

          {process.env.DEV && this.state.error && (
            <details className="mt-4 text-left border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <summary className="font-black text-sm cursor-pointer">DEV: Error details</summary>
              <pre className="mt-2 text-xs font-mono text-[var(--orange)] overflow-auto max-h-48">
                {this.state.error.message}
                {this.state.info?.componentStack}
              </pre>
            </details>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={this.handleReload}
              className="jf-button bg-[var(--navy)] text-white"
            >
              RELOAD PAGE
            </button>
            <button
              type="button"
              onClick={this.handleReport}
              className="jf-button bg-white text-[var(--ink)]"
            >
              REPORT ISSUE
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs font-black text-[var(--muted)]">
            <a href="/" className="text-[var(--navy)] underline underline-offset-2 hover:text-[var(--yellow)]">Home</a>
            <span>·</span>
            <a href="/find-jobs" className="text-[var(--navy)] underline underline-offset-2 hover:text-[var(--yellow)]">Find Jobs</a>
            <span>·</span>
            <a href="/pricing" className="text-[var(--navy)] underline underline-offset-2 hover:text-[var(--yellow)]">Pricing</a>
          </div>
        </div>
      </div>
    );
  }
}
