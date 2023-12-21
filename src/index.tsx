import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';

const root = createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<App name='Super Mario' />
	</React.StrictMode>
);
