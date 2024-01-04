import React from 'react';

import { ButtonPage } from './Button'
import { HomePage } from './Home';
import { NpmPackagePage } from './NpmPackage';
import { OthersPage } from './Others';
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
	others        : '/component/others',
};

export const sideBarItems = {
	tutorials: [
		{
			path  : routes.npmPackage,
			label : 'NPM Package',
		},
	],
	components: [
		{
			path  : routes.select,
			label : 'Select',
		},
		{
			path  : routes.segmentedTabs,
			label : 'Segmented Tabs',
		},
		{
			path  : routes.toast,
			label : 'Toast',
		},
		{
			path  : routes.button,
			label : 'Button',
		},
		{
			path  : routes.others,
			label : 'Others',
		}
	]
}


export const nestedRoutes = [
	{
		path    : routes.home,
		element : <HomePage />,
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
	{
		path    : routes.others,
		element : <OthersPage />
	}
]
