export const MIXPANEL_EVENTS = {
	APP_OPENED               : 'App Opened',
	THEME_CHANGED            : 'Theme Changed',
	LOGO_CLICKED             : 'Logo Clicked',
	NAVIGATION_CLICKED       : 'Navigation Clicked',
	SOURCE_CODE_LINK_CLICKED : 'Source Code Link Clicked',
	PAGE_SCROLLED_TILL_END   : 'Page Scrolled Till End',
	COPY_CODE_BUTTON_CLICKED : 'Copy Code Button Clicked',
} as const;

export const MIXPANEL_EVENT_PROPERTIES = {
	APP_LOAD_TIME : 'App Load Time',
	CURRENT_PAGE  : 'Current Page',
	THEME         : 'Theme',
} as const;