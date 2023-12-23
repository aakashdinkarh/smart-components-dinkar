import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { routes } from '../routes/routesConfig';

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
	{
		path  : routes.button,
		label : 'Button',
	},
]

export default function SideBar(){
	const location = useLocation();

	return (
        <ul className={styles.list_container}>
			{sideBarItems.map((item) => (
				<li key={item.path} className={getCombinedClass(styles.list_item, {
					[styles.active]: item.path === location.pathname
				})} >
					<Link className={styles.link} to={item.path}>{item.label}</Link>
				</li>
			))}
        </ul>
	)
}