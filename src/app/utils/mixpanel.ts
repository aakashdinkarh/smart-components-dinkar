import type { OverridedMixpanel } from 'mixpanel-browser';

import { STAGING, PRODUCTION } from '../constants';

class MixpanelService {
	private mixpanel: OverridedMixpanel | null = null;
	private queue: (() => void)[] = [];

	public isInitialized = false;

	private static isProduction = process.env.REACT_APP_ENVIRONMENT === PRODUCTION;
	private static isStaging = process.env.REACT_APP_ENVIRONMENT === STAGING;
	private static mixpanelToken = process.env.REACT_APP_MIXPANEL_TOKEN ?? '';

	private static async getMixpanel(): Promise<OverridedMixpanel> {
		const module = (await import('mixpanel-browser')).default;
		return module;
	}

	public async init(): Promise<void> {
		try {
			this.mixpanel = await MixpanelService.getMixpanel();
			if (MixpanelService.mixpanelToken !== '') {
				this.mixpanel.init(MixpanelService.mixpanelToken);
				this.isInitialized = true;
			}
			this.queue.forEach((fn: () => void) => { fn(); });
			this.queue = [];
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}

	public track(eventName: string, properties?: Record<string, unknown>): void {
		if (this.isInitialized && this.mixpanel) {
			if (MixpanelService.isProduction || MixpanelService.isStaging) {
				// defer the track call to the next event loop to avoid blocking the main thread
				setTimeout(() => {
					this.mixpanel?.track(eventName, properties);
				}, 0);
			} else {
				// eslint-disable-next-line no-console
				console.log(eventName, properties);
			}
		} else {
			this.queue.push(() => {
				this.track(eventName, properties);
			});
		}
	}
}

export const mixpanel = new MixpanelService();