import { useEffect, useState } from 'react';

import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { highlightCode } from '../helpers/highlightCode';
import { mixpanel } from '../utils/mixpanel';

export function useHighlightCode() {
	const [isCodeHighlighted, setIsCodeHighlighted] = useState<boolean | null>(null);

	useEffect(() => {
		void (async () => {
			try {
				const res = await highlightCode();
				setIsCodeHighlighted(res);
				mixpanel.track(MIXPANEL_EVENTS.CODE_HIGHLIGHTED_SUCCESS);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('Error highlighting code', err);
				mixpanel.track(MIXPANEL_EVENTS.CODE_HIGHLIGHTED_ERROR, {
					[MIXPANEL_EVENT_PROPERTIES.ERROR_MESSAGE]: err instanceof Error ? err.message : 'Unknown error',
				});	
				setIsCodeHighlighted(false);
			}
		})();
	}, []);

	return {
		isCodeHighlighted,
	};
}
