import * as React from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from './SideBar'
import styles from './styles.module.css';

function App() {
	return (
		<main className={styles.app_container}>
			<div className={styles.side_menu}  >
				<SideBar />
			</div>
			<div className={styles.content} >
				<Outlet />
			</div>
		</main>
	);
}

export default App;
