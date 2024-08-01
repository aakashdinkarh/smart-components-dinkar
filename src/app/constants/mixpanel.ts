export const MIXPANEL_EVENTS = {
	APP_OPENED                 : 'App Opened',
	STICKY_HEADER_RENDER       : 'Sticky Header Render',
	THEME_CHANGED              : 'Theme Changed',
	LOGO_CLICKED               : 'Logo Clicked',
	HAMBURGER_ICON_CLICKED     : 'Hamburger Icon Clicked',
	SIDEBAR_CLOSE_ICON_CLICKED : 'Sidebar Close Icon Clicked',
	NAVIGATION_CLICKED         : 'Navigation Clicked',
	SOURCE_CODE_LINK_CLICKED   : 'Source Code Link Clicked',
	COPY_CODE_BUTTON_CLICKED   : 'Copy Code Button Clicked',
	CODE_HIGHLIGHTED_SUCCESS   : 'Code Highlighted Success',
	CODE_HIGHLIGHTED_ERROR     : 'Code Highlighted Error',
} as const;

export const MIXPANEL_EVENT_PROPERTIES = {
	APP_LOAD_TIME        : 'App Load Time',
	CURRENT_PAGE         : 'Current Page',
	THEME                : 'Theme',
	LOGO_DISPLAY_CONTEXT : 'Logo Display Context',
	IS_MOBILE            : 'Is Mobile',
	NAVIGATION_CONTEXT   : 'Navigation Context',
	NAVIGATION_TITLE     : 'Navigation Title',
	CURRENT_STEP         : 'Current Step',
	ERROR_MESSAGE        : 'Error Message',
} as const;