import React, { useState, useEffect } from 'react';
import { useLocation, Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

import { Button, Logo } from '../../exports';

import styles from './appFallback.module.css';

const getRouteErrorMessage = (error: any) => {
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return "Dang! This page doesn't exist!";
		}
  
		if (error.status === 401) {
			return "You aren't authorized to see this";
		}
  
		if (error.status === 503) {
			return "Dang! Looks like our Service is down";
		}
  
		if (error.status === 418) {
			return "Dang! 🫖";
		}
	}
}

export function AppFallback() {
	const location = useLocation();
	const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

	const error = useRouteError();
	const routeErrorMessage = getRouteErrorMessage(error);

	useEffect(() => {
		const newBubbles = Array.from({ length: 20 }, (_, i) => (
			<div
				key={i}
				className={styles.bubble}
				style={
					{
						'--size'          : `${20 + (Math.random() * 60)}px`,
						'--left'          : `${Math.random() * 100}%`,
						'--anim-duration' : `${3 + (Math.random() * 4)}s`,
					} as React.CSSProperties
				}
			/>
		));
		setBubbles(newBubbles);
	}, []);

	return (
		<div className={styles['app-fallback']}>
			<div className={styles['content-wrapper']}>
				<Logo width={100} height={100} className={styles.logo} />
				<h1 className={styles.title}>{routeErrorMessage ?? 'Dang! Something is off'}</h1>
				<p className={styles.subtitle}>Don't worry, even the best adventurers sometimes lose their way.</p>
				<Button
					onClick={() => {
						window.location.reload();
					}}
					themeType='primary'
					className={styles['refresh-button']}
				>
					Retry Adventure
				</Button>
				{location.pathname !== '/' && (
					<Link to='/' className={styles['home-link']}>
						Return to Base Camp
					</Link>
				)}
			</div>
			<div className={styles.submarine}>
				<div className={styles.periscope} />
				<div className={styles.body} />
				<div className={styles.propeller} />
			</div>
			{bubbles}
		</div>
	);
}
