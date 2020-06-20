import React, { Component } from 'react';
import ErrorIndicator from '../components/ErrorIndicator/ErrorIndicator';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  handleCloseError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator handleCloseError={this.handleCloseError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
