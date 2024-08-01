import React from 'react';
import { Helmet } from 'react-helmet';

import { getCurrentScreen } from './routesConfig';

export const HelmetComponent = () => {
	return (
		<Helmet>
			<title>{getCurrentScreen()} - DevDinkar CodeBook</title>
		</Helmet>
	);
};
