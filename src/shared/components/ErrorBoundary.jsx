import * as React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.captureReject = this.captureReject.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  captureReject(e) {
    e.preventDefault();
    this.setState({ hasError: true });
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.captureReject);
  }

  resetError() {
    this.setState({ hasError: false });
    this.props.onReset?.();
  }

  render() {
    const { fallback: Fallback, children } = this.props;

    if (this.state.hasError) {
      return <Fallback resetError={this.resetError} />;
    }

    return children;
  }
}
