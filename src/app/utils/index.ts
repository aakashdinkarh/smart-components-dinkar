import { MOBILE_BREAKPOINT } from "../constants";

import type { ExtendedNavigator } from "./sendPerfAnalytics";

export const getSafe = <F,T>(func: () => F, defaultValue?: T) => {
	try {
		return func();
	} catch (error) {
		return defaultValue;
	}
}

export function checkIsMobileViewPort(){
	return document.body.clientWidth <= MOBILE_BREAKPOINT;
}

export function checkIsMobile(){
	return getSafe(() => (window.navigator as ExtendedNavigator).userAgentData?.mobile, null)
}