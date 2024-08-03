import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { sideBarItems } from '../routes/routesConfig';
import { checkIsMobile, checkIsMobileViewPort } from '../utils';
import { mixpanel } from '../utils/mixpanel';

import styles from './styles.module.css';

export const SideBar = memo(function SideBar({ hideSideNav }: { hideSideNav: () => void }) {
	const location = useLocation();

	const trackNavClick = (navContext: 'Tutorials' | 'Components', navTitle: string) => {
		mixpanel.track(MIXPANEL_EVENTS.NAVIGATION_CLICKED, {
			[MIXPANEL_EVENT_PROPERTIES.NAVIGATION_CONTEXT]  : navContext,
			[MIXPANEL_EVENT_PROPERTIES.NAVIGATION_TITLE]    : navTitle,
			[MIXPANEL_EVENT_PROPERTIES.IS_MOBILE_VIEW_PORT] : checkIsMobileViewPort(),
			[MIXPANEL_EVENT_PROPERTIES.IS_MOBILE]           : checkIsMobile(),
		})
	}

	return (
		<ul className={styles['list-container']}>
			{/* todo: remove repetitive code */}
			<li className={styles['category-title']}>
				<span className={styles['title-text']}>Tutorials</span>
				<div className={styles['title-text-line']} />
			</li>

			{sideBarItems.tutorials.map((item) => (
				<li
					key={item.path}
					className={getCombinedClass(styles['list-item'], {
						[styles.active]: item.path === location.pathname,
					})}
				>
					<Link
						onClick={() => {
							trackNavClick('Tutorials', item.label);
							checkIsMobileViewPort() && hideSideNav();
						}}
						className={styles.link}
						to={item.path}
					>
						{item.label}
					</Link>
				</li>
			))}

			<li className={styles['category-title']}>
				<span className={styles['title-text']}>Components</span>
				<div className={styles['title-text-line']} />
			</li>

			{sideBarItems.components.map((item) => (
				<li
					key={item.path}
					className={getCombinedClass(styles['list-item'], {
						[styles.active]: item.path === location.pathname,
					})}
				>
					<Link
						onClick={() => {
							trackNavClick('Components', item.label);
							checkIsMobileViewPort() && hideSideNav();
						}}
						className={styles.link}
						to={item.path}
					>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	);
})