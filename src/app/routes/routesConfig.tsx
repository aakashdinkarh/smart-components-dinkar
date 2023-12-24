import * as React from 'react';

import { ButtonPage } from './Button'
import { SegmentedTabsPage } from './SegmentedTabs';
import { SelectPage } from "./Select"
import { ToastPage } from './Toast';

export const routes = {
	select        : '/select',
	segmentedTabs : '/segmentedTabs',
	toast         : '/toast',
	button        : '/button',
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
	{
		path    : routes.button,
		element : <ButtonPage />,
	},
]