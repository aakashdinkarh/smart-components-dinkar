import { APP_CRASH, UNCAUGHT_ERROR, UNHANDLED_PROMISE_REJECTION } from '../constants';
import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import type { AppCrashError } from '../ErrorBoundary';

import { mixpanel } from './mixpanel';

import { getSafe } from '.';

export function sendErrorAppCrashLogs(error: ErrorEvent | PromiseRejectionEvent | AppCrashError) {
	const errorDetails = {};

	if ('type' in error && error.type === APP_CRASH) {
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_TYPE] = APP_CRASH;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_NAME] = (error as unknown as AppCrashError).name;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_MESSAGE] = 'message' in error ? error.message : 'Unknown error';
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_STACK] =
			error instanceof Error ? error.stack : 'Stack not available';
		errorDetails[MIXPANEL_EVENT_PROPERTIES.COMPONENT_STACK] = (error as unknown as AppCrashError).componentStack;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_DIGEST] = (error as unknown as AppCrashError).digest;
	}

	if (error instanceof ErrorEvent) {
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_TYPE] = UNCAUGHT_ERROR;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_MESSAGE] = error.message;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_FILENAME] = error.filename;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_LINENO] = error.lineno;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_COLNO] = error.colno;
	} else if (error instanceof PromiseRejectionEvent) {
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_TYPE] = UNHANDLED_PROMISE_REJECTION;
		errorDetails[MIXPANEL_EVENT_PROPERTIES.ERROR_REASON] = getSafe(
			() => JSON.stringify(error.reason),
			'Unable to stringify reason'
		);
	}

	mixpanel.track(MIXPANEL_EVENTS.APP_ERROR, errorDetails);
}
