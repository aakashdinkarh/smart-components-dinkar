import React from 'react';

import { ButtonPage } from './Button'
import { NpmPackagePage } from './NpmPackage';
import { SegmentedTabsPage } from './SegmentedTabs';
import { SelectPage } from "./Select"
import { ToastPage } from './Toast';

export const routes = {
	npmPackage    : '/tutorial/npm-package',
	select        : '/component/select',
	segmentedTabs : '/component/segmented-tabs',
	toast         : '/component/toast',
	button        : '/component/button',
}

export const nestedRoutes = [
	{
		path    : routes.npmPackage,
		element : <NpmPackagePage />,
	},
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