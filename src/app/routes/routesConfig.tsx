import React from 'react';

import { ButtonPage } from './Button'
import { Home } from './Home';
import { NpmPackagePage } from './NpmPackage';
import { SegmentedTabsPage } from './SegmentedTabs';
import { SelectPage } from "./Select"
import { ToastPage } from './Toast';

export const routes = {
	home          : '/',
	npmPackage    : '/tutorial/npm-package',
	select        : '/component/select',
	segmentedTabs : '/component/segmented-tabs',
	toast         : '/component/toast',
	button        : '/component/button',
}

export const nestedRoutes = [
	{
		path    : routes.home,
		element : <Home />,
	},
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