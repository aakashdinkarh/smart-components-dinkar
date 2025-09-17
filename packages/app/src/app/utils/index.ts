import { MOBILE_BREAKPOINT } from '../constants';

interface ExtendedNavigator {
	connection?: {
		effectiveType?: string;
		downlink?: string;
	};
	userAgentData?: {
		mobile?: boolean;
	};
}

export const getSafe = <F, T>(func: () => F, defaultValue?: T) => {
	try {
		return func();
	} catch (error) {
		return defaultValue;
	}
};

export function checkIsMobileViewPort() {
	return document.body.clientWidth <= MOBILE_BREAKPOINT;
}

/**
 * Checks if the current device is a mobile device.
 * 
 * This function uses the `userAgentData.mobile` property if available.
 * If not available, it falls back to `null`.
 * 
 * @param {boolean} [getBool=false] - If true, always returns a boolean value.
 * @returns {boolean | null | undefined} Returns `true` for mobile devices, `false` for non-mobile devices.
 * If the mobile status can't be determined and `getBool` is false, returns `null` or `undefined`.
 * 
 * @example
 * // To get a nullable result
 * const isMobile = checkIsMobile();
 * 
 * @example
 * // To always get a boolean result
 * const isMobileBoolean = checkIsMobile(true);
 */
export function checkIsMobile(getBool: true): boolean;
export function checkIsMobile(getBool?: false): boolean | null | undefined;
export function checkIsMobile(getBool = false) {
	const res = getSafe(() => (window.navigator as ExtendedNavigator).userAgentData?.mobile, null);
	if (getBool) {
		return Boolean(res);
	}
	return res;
}

export function getConnectionMode() {
	return getSafe(() => (window.navigator as ExtendedNavigator).connection?.effectiveType, 'unknown');
}

export function getConnectionSpeed() {
	return getSafe(() => (window.navigator as ExtendedNavigator).connection?.downlink, 'unknown');
}
