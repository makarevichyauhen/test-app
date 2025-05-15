import React, { ErrorInfo, ReactNode } from 'react';
import { Alert } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    Alert.alert(typeof error === 'string' ? error : 'Something went wrong');
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
