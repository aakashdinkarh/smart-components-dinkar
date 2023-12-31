import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { routes } from '../routes/routesConfig';

import styles from './styles.module.css';

const sideBarItems = {
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
	]
}

export function SideBar(){
	const location = useLocation();

	return (
		<ul className={styles.list_container}>
			<li className={styles.category_title}>
				<span className={styles.title_text} >Tutorials</span>
				<div className={styles.title_text_line} />
			</li>

			{sideBarItems.tutorials.map((item) => (
				<li key={item.path} className={getCombinedClass(styles.list_item, {
					[styles.active]: item.path === location.pathname
				})} >
					<Link className={styles.link} to={item.path}>{item.label}</Link>
				</li>
			))}

			<li className={styles.category_title}>
				<span className={styles.title_text} >Components</span>
				<div className={styles.title_text_line} />
			</li>

			{sideBarItems.components.map((item) => (
				<li key={item.path} className={getCombinedClass(styles.list_item, {
					[styles.active]: item.path === location.pathname
				})} >
					<Link className={styles.link} to={item.path}>{item.label}</Link>
				</li>
			))}
		</ul>
	)
}