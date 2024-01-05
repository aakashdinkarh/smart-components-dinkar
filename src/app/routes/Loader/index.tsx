import React from 'react';

import { Loader } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';

export function LoaderPage(){
	return (
		<main>
			<StickyHeader heading='Loader' />

			<h3>Loader 1</h3>
			<Loader variant="spin" />

			<hr style={{ margin: '2rem 0' }} />

			<h3>Loader 2</h3>
			<Loader variant="lines" />

			<hr style={{ margin: '2rem 0' }} />

			<h3>Loader 3</h3>
			<Loader variant="dots-bounce" />

			<hr style={{ margin: '2rem 0' }} />

			<h3>Loader 4</h3>
			<Loader variant="dots-fade" />
		</main>
	)
}
