import React from 'react';
import type { ErrorInfo, ReactNode, PropsWithChildren } from 'react';

import { APP_CRASH } from './constants';

interface ErrorBoundaryProps extends PropsWithChildren {
	fallback: ReactNode;
	onError?: (error: ErrorEvent | PromiseRejectionEvent | AppCrashError) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export interface AppCrashError extends Error {
	componentStack: ErrorInfo['componentStack'];
	type: typeof APP_CRASH;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
		this.handleError = this.handleError.bind(this);
	}

	handleError(event: ErrorEvent | PromiseRejectionEvent | AppCrashError) {
		if (this.props.onError) {
			this.props.onError(event);
		}
	}

	componentDidMount() {
		window.addEventListener('error', (event) => {
			this.handleError(event);
		});
		window.addEventListener('unhandledrejection', (event) => {
			this.handleError(event);
		});
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.handleError({ ...error, componentStack: errorInfo.componentStack, type: APP_CRASH });
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
