import type { Metric } from 'web-vitals';

import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';

import { mixpanel } from './mixpanel';

export function sendPerfAnalytics({ id, name, value, rating, navigationType } : Metric) {
	mixpanel.track(MIXPANEL_EVENTS.APP_WEB_VITAL_SCORE, {
		[MIXPANEL_EVENT_PROPERTIES.EVENT_NAME]      : name,
		[MIXPANEL_EVENT_PROPERTIES.EVENT_VALUE]     : Math.round(name === 'CLS' ? value * 1000 : value),
		[MIXPANEL_EVENT_PROPERTIES.EVENT_ID]        : id,
		[MIXPANEL_EVENT_PROPERTIES.RATING]          : rating,
		[MIXPANEL_EVENT_PROPERTIES.NAVIGATION_TYPE] : navigationType,
	});
}
