import './app.css';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Logo } from '../icons';
import { getCombinedClass } from '../utils/getCombinedClass';

import { SideBar } from './SideBar';
import styles from './styles.module.css';

export function App() {
	return (
		<main className={styles['app-container']}>
			<section className={styles['side-menu']}>
				<Link
					to='/'
					className={getCombinedClass(
						'flex align-items-center',
						'sticky bg-inherit z2',
						'pt-2 pb-3 width-full-section border-b',
						'bold-6 '
					)}
				>
					<Logo width={20} height={20} className='mr-1' />
					<div>DevDinkar CodeBook</div>
				</Link>
				<SideBar />
			</section>
			<section className={styles.content}>
				<Outlet />
			</section>
		</main>
	);
}
