import './app.css';
import './codeHighlighterThemes/atom-one-dark.css';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { SideBar } from './SideBar'
import styles from './styles.module.css';

export function App() {
	return (
		<main className={styles['app-container']}>
			<section className={styles['side-menu']}>
				<SideBar />
			</section>
			<section className={styles.content} >
				<Outlet />
			</section>
		</main>
	);
}
