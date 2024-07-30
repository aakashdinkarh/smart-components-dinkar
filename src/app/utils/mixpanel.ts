import type { OverridedMixpanel } from 'mixpanel-browser';

import { DEVELOPMENT, PRODUCTION } from '../constants';

const getMixpanel = async (): Promise<OverridedMixpanel> => {
	const module = (await import('mixpanel-browser')).default;
	return module;
};

const getMixpanelToken = () => {
	switch (process.env.REACT_APP_ENVIRONMENT) {
		case DEVELOPMENT:
			return process.env.REACT_APP_MIXPANEL_TOKEN_DEV;
		case PRODUCTION:
			return process.env.REACT_APP_MIXPANEL_TOKEN_PROD;
		default:
			return null;
	}
};

export const mixpanel = {
	mixpanel : null as OverridedMixpanel | null,
	queue    : [] as (() => void)[],

	async init() {
		try {
			this.mixpanel = await getMixpanel();
			const mixpanelToken = getMixpanelToken();
			if (mixpanelToken != null && mixpanelToken !== '') {
				this.mixpanel.init(mixpanelToken);
			}
			this.queue.forEach((fn: () => void) => { fn(); });
			this.queue = [];
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	},
	track(eventName: string, properties?: Record<string, unknown>) {
		if (this.mixpanel) {
			// todo: remove console.log	
			console.log('Mixpanel track', eventName, properties);
			// this.mixpanel.track(eventName, properties);
		} else {
			this.queue.push(() => {
				this.track(eventName, properties);
			});
		}
	},
} as const;
