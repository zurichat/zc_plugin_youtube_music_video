import { Component } from "react";
import styled from "styled-components";

class ErrorBoundary extends Component<{}, { hasError: false }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError)
      return (
        <Div>
          <h3>An error occured</h3>
        </Div>
      );

    return this.props.children;
  }
}

const Div = styled.div`
  position: fixed;
  bottom: 200px;
  left: 20px;
`;

export default ErrorBoundary;
