import React from 'react';

import { ButtonPage } from './Button'
import { HomePage } from './Home';
import { LoaderPage } from './Loader';
import { NpmPackagePage } from './NpmPackage';
import { OthersPage } from './Others';
import { SegmentedTabsPage } from './SegmentedTabs';
import { SelectPage } from "./Select"
import { SwitchPage } from './Switch';
import { ToastPage } from './Toast';

export const routes = {
	home          : '/',
	npmPackage    : '/tutorial/npm-package',
	select        : '/component/select',
	segmentedTabs : '/component/segmented-tabs',
	toast         : '/component/toast',
	button        : '/component/button',
	loader        : '/component/loader',
	others        : '/component/others',
	switch        :	'/components/switch',
} as const;

interface SideBarItem { path: (typeof routes)[keyof typeof routes]; label: string }
type SideBarItems = Record<'tutorials' | 'components', SideBarItem[]>;

export const sideBarItems: SideBarItems = {
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
			path  : routes.loader,
			label : 'Loader',
		},
		{
			path  : routes.switch,
			label : 'Switch',
		},
		{
			path  : routes.others,
			label : 'Others',
		}
	]
} as const;


const navTitleMap = {};
Object.keys(sideBarItems).forEach((key) => {
	sideBarItems[key as keyof typeof sideBarItems].forEach((item) => {
		navTitleMap[item.path] = item.label;
	});
});

// Type assertion to inform TypeScript that all properties are now defined
export const navTitleMapping = navTitleMap as Readonly<Record<(typeof routes)[keyof typeof routes], string>>;

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
		path    : routes.loader,
		element : <LoaderPage />,
	},
	{
		path    : routes.switch,
		element : <SwitchPage />,
	},
	{
		path    : routes.others,
		element : <OthersPage />
	}
]
