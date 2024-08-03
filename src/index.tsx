import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app/App';
import { ErrorBoundary } from './app/ErrorBoundary';
import { nestedRoutes } from './app/routes/routesConfig';
import { sendPerfAnalytics } from './app/utils/sendPerfAnalytics';
import { reportWebVitals } from './reportWebVitals';

const AppFallback = lazy(() => import('./app/common/AppFallback').then((module) => ({ default: module.AppFallback })));

const appLoadStartTime = Date.now();

const router = createBrowserRouter([
	{
		path    : '/',
		element : (
			<ErrorBoundary
				fallback={
					<Suspense>
						<AppFallback />
					</Suspense>
				}
			>
				<App appLoadStartTime={appLoadStartTime} />
			</ErrorBoundary>
		),
		errorElement: (
			<Suspense>
				<AppFallback />
			</Suspense>
		),
		children: nestedRoutes,
	},
]);

const root = createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals(sendPerfAnalytics);
