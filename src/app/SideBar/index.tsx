import * as React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../routes';

import styles from './styles.module.css';

const sideBarItems = [
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
]

export default function SideBar(){
	return (
        <div className={styles.list_container} >
            {sideBarItems.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}
        </div>
	)
}