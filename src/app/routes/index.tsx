import * as React from 'react';

import SegmentedTabsPage from './SegmentedTabs';
import SelectPage from "./Select"
import ToastPage from './Toast';

export const routes = {
	select        : '/select',
	segmentedTabs : '/segmentedTabs',
	toast         : '/toast',
}

export const nestedRoutes = [
	{
		path    : routes.select,
		element : <SelectPage />,
	},
	{
		path    : routes.segmentedTabs,
		element : <SegmentedTabsPage />,
	},
	{
		path    : routes.toast,
		element : <ToastPage />,
	},
]