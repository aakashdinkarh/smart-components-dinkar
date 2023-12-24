import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app/App';
import { nestedRoutes } from './app/routes/routesConfig';

const router = createBrowserRouter([
	{
		path         : '/',
		element      : <App />,
		errorElement : <h4>Error</h4>,
		children     : nestedRoutes
	},
])


const root = createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
