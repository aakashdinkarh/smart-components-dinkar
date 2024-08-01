import React, { memo } from 'react';

import { CodeWrapper } from '../../exports';
import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { getCurrentScreen } from '../routes/routesConfig';
import { mixpanel } from '../utils/mixpanel';

const trackCopySuccess = (title: string) => {
	mixpanel.track(MIXPANEL_EVENTS.COPY_CODE_BUTTON_CLICKED, {
		[MIXPANEL_EVENT_PROPERTIES.CURRENT_PAGE] : getCurrentScreen(),
		[MIXPANEL_EVENT_PROPERTIES.CURRENT_STEP] : title,
	});
};

const trackCopyFail = (errorMsg: string, title: string) => {
	mixpanel.track(MIXPANEL_EVENTS.COPY_CODE_BUTTON_CLICKED, {
		[MIXPANEL_EVENT_PROPERTIES.CURRENT_PAGE]  : getCurrentScreen(),
		[MIXPANEL_EVENT_PROPERTIES.CURRENT_STEP]  : title,
		[MIXPANEL_EVENT_PROPERTIES.ERROR_MESSAGE] : errorMsg,
	});
};

export const AppCodeWrapper = memo(function AppCodeWrapper({
	code,
	isCodeHighlighted,
	title,
	trackSuccess = true,
	trackFail = true,
}: {
	code: string;
	isCodeHighlighted: boolean;
	title: string;
	trackSuccess: boolean;
	trackFail: boolean;
}) {
	const handleCopySuccess = () => {
		trackCopySuccess(title);
	};
	const handleCopyFail = (errorMsg: string) => {
		trackCopyFail(errorMsg, title);
	};
	return (
		<CodeWrapper
			{...(trackSuccess && { onCopy: handleCopySuccess })}
			{...(trackFail && { onCopyFail: handleCopyFail })}
			isCodeHighlighted={isCodeHighlighted}
		>
			{code}
		</CodeWrapper>
	);
});
