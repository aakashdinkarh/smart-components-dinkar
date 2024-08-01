import type { Metric } from 'web-vitals';

import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { getCurrentScreen } from '../routes/routesConfig';

import { mixpanel } from './mixpanel';

import { getSafe } from '.';

export interface ExtendedNavigator {
	connection?: {
		effectiveType?: string;
	};
	userAgentData?: {
		mobile?: boolean;
	};
}

export function sendPerfAnalytics({ id, name, value, rating, navigationType } : Metric) {
	const userAgentData = getSafe(() => (window.navigator as ExtendedNavigator).userAgentData, null);
	const connectionData = getSafe(() => (window.navigator as ExtendedNavigator).connection, null);

	mixpanel.track(MIXPANEL_EVENTS.APP_WEB_VITAL_SCORE, {
		[MIXPANEL_EVENT_PROPERTIES.EVENT_NAME]      : name,
		[MIXPANEL_EVENT_PROPERTIES.EVENT_VALUE]     : Math.round(name === 'CLS' ? value * 1000 : value),
		[MIXPANEL_EVENT_PROPERTIES.EVENT_ID]        : id,
		[MIXPANEL_EVENT_PROPERTIES.IS_MOBILE]       : userAgentData?.mobile,
		[MIXPANEL_EVENT_PROPERTIES.CONNECTION_MODE] : connectionData?.effectiveType ?? 'unknown',
		[MIXPANEL_EVENT_PROPERTIES.CURRENT_PAGE]    : getCurrentScreen(),
		[MIXPANEL_EVENT_PROPERTIES.RATING]          : rating,
		[MIXPANEL_EVENT_PROPERTIES.NAVIGATION_TYPE] : navigationType,
	});
}
