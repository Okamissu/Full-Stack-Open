import React from 'react'
import { ErrorBoundaryCard, Button } from '../styles'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.log('ErrorBounary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryCard>
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <Button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </Button>
        </ErrorBoundaryCard>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
