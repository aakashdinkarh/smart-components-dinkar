import React, { memo, useMemo } from 'react';

import { CodeWrapper } from '../../exports';
import { CODE_INITIALS_LENGTH } from '../constants';
import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { mixpanel } from '../utils/mixpanel';

const trackCopySuccess = (code: string) => {
	mixpanel.track(MIXPANEL_EVENTS.COPY_CODE_BUTTON_CLICKED, {
		[MIXPANEL_EVENT_PROPERTIES.CODE_INITIALS]: code,
	});
};

const trackCopyFail = (errorMsg: string, code: string) => {
	mixpanel.track(MIXPANEL_EVENTS.COPY_CODE_BUTTON_CLICKED, {
		[MIXPANEL_EVENT_PROPERTIES.CODE_INITIALS] : code,
		[MIXPANEL_EVENT_PROPERTIES.ERROR_MESSAGE] : errorMsg,
	});
};

export const AppCodeWrapper = memo(function AppCodeWrapper({
	trackSuccess = true,
	trackFail = true,
	children,
	...rest
}: {
	trackSuccess?: boolean;
	trackFail?: boolean;
} & Omit<React.ComponentProps<typeof CodeWrapper>, 'onCopy' | 'onCopyFail'>) {
	const codeInitials = useMemo(() => {
		return typeof children === 'string'
			? children.slice(0, CODE_INITIALS_LENGTH)
			: String(children).slice(0, CODE_INITIALS_LENGTH);
	}, [children]);

	const handleCopySuccess = () => {
		trackCopySuccess(codeInitials);
	};
	const handleCopyFail = (errorMsg: string) => {
		trackCopyFail(errorMsg, codeInitials);
	};
	return (
		<CodeWrapper
			{...(trackSuccess && { onCopy: handleCopySuccess })}
			{...(trackFail && { onCopyFail: handleCopyFail })}
			{...rest}
		>
			{children}
		</CodeWrapper>
	);
});
