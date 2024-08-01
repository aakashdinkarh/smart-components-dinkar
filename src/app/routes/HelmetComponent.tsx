import React from 'react';
import { Helmet } from 'react-helmet';

import { getCurrentScreen } from './routesConfig';

export const HelmetComponent = () => {
	return (
		<Helmet>
			<title>DevDinkar CodeBook - {getCurrentScreen()}</title>
		</Helmet>
	);
};
