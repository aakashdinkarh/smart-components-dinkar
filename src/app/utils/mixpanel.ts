import type { OverridedMixpanel } from 'mixpanel-browser';

import { DEVELOPMENT, PRODUCTION } from '../constants';

class MixpanelService {
	private mixpanel: OverridedMixpanel | null = null;
	private queue: (() => void)[] = [];

	public isInitialized = false;

	private static isDevelopment = process.env.REACT_APP_ENVIRONMENT === DEVELOPMENT;
	private static isProduction = process.env.REACT_APP_ENVIRONMENT === PRODUCTION;

	private static getMixpanelToken(): string | null {
		switch (process.env.REACT_APP_ENVIRONMENT) {
			case DEVELOPMENT:
				return process.env.REACT_APP_MIXPANEL_TOKEN_DEV ?? null;
			case PRODUCTION:
				return process.env.REACT_APP_MIXPANEL_TOKEN_PROD ?? null;
			default:
				return null;
		}
	}

	private static async getMixpanel(): Promise<OverridedMixpanel> {
		const module = (await import('mixpanel-browser')).default;
		return module;
	}

	public async init(): Promise<void> {
		try {
			this.mixpanel = await MixpanelService.getMixpanel();
			const mixpanelToken = MixpanelService.getMixpanelToken();
			if (mixpanelToken != null && mixpanelToken !== '') {
				this.mixpanel.init(mixpanelToken, { debug: MixpanelService.isDevelopment, ip: true });
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
			if (MixpanelService.isProduction) {
				this.mixpanel.track(eventName, properties);
				return;
			}
			console.log(eventName, properties);
		} else {
			this.queue.push(() => {
				this.track(eventName, properties);
			});
		}
	}
}

export const mixpanel = new MixpanelService();