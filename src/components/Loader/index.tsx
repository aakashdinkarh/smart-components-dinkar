import React from 'react';
import type { JSX } from 'react';

import { Switch } from '../../exports';

import styles from './loader.module.css';

export type loaderVariant = 'spin' | 'lines' | 'dots-bounce' | 'dots-fade';

interface LoaderPropsCommon {
	/**
	 * The variant of the loader animation
	 * @default 'spin'
	 */
	variant: loaderVariant;
	/**
	 * The color of the loader animation.
	 * @default '#3498db'
	 */
	color?: string;
	/**
	 * The size of the loader animation. For variants spin, dots-bounce, dots-fade size meaning is self explanatory,
	 * for variant lines size implies the height of lines.
	 * defaultSize = {
	 *	spin : 50px,
	 *	lines : 40px,
	 *	dots-bounce : 1rem,
	 *	dots-fade : 1rem,
	 * };
	 */
	size?: string;
}

const defaultSizes = {
	spin          : '50px',
	lines         : '40px',
	'dots-bounce' : '1rem',
	'dots-fade'   : '1rem',
};

/**
 * Loader component displays a loading animation based on the specified variant.
 *
 * @component
 * @param {Object} props - The properties of the Loader component.
 * @returns {JSX.Element} - The rendered Loader component.
 *
 * @example
 * // Example usage of Loader component:
 * <Loader variant="spin" color="#ff5733" size="50px" />
 * <Loader variant="lines" color="#ff5733" size="40px" />
 * <Loader variant="dots-bounce" color="#ff5733" size="1rem" />
 * <Loader variant="dots-fade" color="#ff5733" size="1rem" />
 */
export function Loader({
	variant = 'spin',
	color = '#3498db',
	size = '',
} : LoaderPropsCommon ) : JSX.Element {
	const cssVariable = variant === 'lines' ? '--loader-height' : '--loader-size';
	const defaultSize = size || defaultSizes[variant] || '1rem';

	return (
		<div
			className={styles[`loader-${variant}`]}
			style={{
				[cssVariable]  : defaultSize,
				borderTopColor : color,
			}}
		>
			<Switch>
				<Switch.Case condition={variant === 'lines'}>
					{Array(5).fill(null).map((_, i) => (
						<div
							key={i}
							className={styles.line}
							style={{
								animationDelay  : `${i * 0.2}s`,
								backgroundColor : color,
							}}
						/>
					))}
				</Switch.Case>
				
				<Switch.Case condition={variant === 'dots-bounce'}>
					{Array(3).fill(null).map((_, i) => (
						<div
							key={i}
							className={styles.bounce}
							style={{
								animationDelay  : `${i * 0.2}s`,
								backgroundColor : color,
							}}
						/>
					))}
				</Switch.Case>

				<Switch.Case condition={variant === 'dots-fade'}>
					{Array(3).fill(null).map((_, i) => (
						<div
							key={i}
							className={styles.dot}
							style={{
								animationDelay  : `${i * 0.2}s`,
								backgroundColor : color,
							}}
						/>
					))}
				</Switch.Case>
			</Switch>
		</div>
	)
}
