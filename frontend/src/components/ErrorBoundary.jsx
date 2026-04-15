import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('BuzzHome render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-8 text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <h1 className="font-display font-bold text-navy text-2xl mb-2">Page crashed</h1>
            <p className="text-gray-600 mb-6">
              Something went wrong while rendering this page. Please go back to listings or refresh.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/" className="btn-primary">Go Home</Link>
              <Link to="/listings" className="btn-secondary">Browse Listings</Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
