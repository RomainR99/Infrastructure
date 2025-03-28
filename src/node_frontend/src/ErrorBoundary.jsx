import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erreur détectée :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Une erreur est survenue. Veuillez réessayer plus tard.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
