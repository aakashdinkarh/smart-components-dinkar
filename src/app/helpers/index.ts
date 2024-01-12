import { MOBILE_BREAKPOINT } from '../constants';

export function checkIsMobile(){
	return document.body.clientWidth <= MOBILE_BREAKPOINT;
}
