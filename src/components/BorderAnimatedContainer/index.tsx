import type { ReactNode, JSX} from 'react';
import React, { useMemo } from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './borderAnimated.module.css';

interface BorderAnimatedContainerProps {
	/**
	 * Additional class names to be applied to the component.
	 */
	className?: string;
	/**
	 * The color of the animated border.
	 * @default '#f68b21'
	 */
	animatedBorderColor?: string;
	/**
	 * The duration of the animation in seconds.
	 * @default '2s'
	 */
	animationDuration?: string;
	/**
	 * The delay in animation in seconds.
	 * @default '0s'
	 */
	animationDelay?: string;
	/**
	 * Determines the positioning of the border animation within the component.
	 *
	 * - If set to 'outset', the animation will appear outside the border.
	 * - If set to 'inset', the animation will be positioned on the border.
	 *
	 * @default 'inset'
	 */
	borderPositioning?: 'outset' | 'inset';
	/**
	 * The content to be rendered within the component.
	 */
	children: ReactNode;
}

/**
 * A container component with an animated border.
 * @component
 * @example
 * // Usage example:
 *	<BorderAnimatedContainer
 *		className='my-border-animated-container'
 *		animatedBorderColor='#f68b21'
 *		animationDuration='2s'
 *		animationDelay='0s'
 *		borderPositioning='outset'
 *	>
 *		<div>
 *			Outset 2s Duration Container
 *		</div>
 *	</BorderAnimatedContainer>
 * @param {BorderAnimatedContainerProps} props - The props of the component.
 * @returns {JSX.Element} The rendered component wrapped inside a animated border container.
 */
export function BorderAnimatedContainer({
	className = '',
	animatedBorderColor = '#f68b21',
	animationDuration = '2s',
	animationDelay = '0s',
	borderPositioning = 'inset',
	children,
}: BorderAnimatedContainerProps): JSX.Element {
	const parsedAnimationDelay : number = useMemo(() => {
		const parsedDelay = parseFloat(animationDelay);

		return typeof parsedDelay === 'number' && !Number.isNaN(parsedDelay)
			? parsedDelay
			: 0;
	}, []);

	const animationDelayExtra : number = useMemo(() => {
		let parsedDuration = parseFloat(animationDuration);

		parsedDuration = typeof parsedDuration === 'number' && !Number.isNaN(parsedDuration)
			? parsedDuration
			: 2;
		
		return parsedDuration / 2;
	}, []);

	return (
		<section
			style={{ ['--border-color' as string]: animatedBorderColor }}
			className={getCombinedClass(styles.container, className, {
				[styles['border-position-outset']]: borderPositioning === 'outset',
			})}
		>
			<span
				className={styles['internal-span']}
				style={{
					animationDuration,
					animationDelay: `${parsedAnimationDelay}s`,
				}}
			/>
			<span
				className={styles['internal-span']}
				style={{
					animationDuration,
					animationDelay: `${parsedAnimationDelay + animationDelayExtra}s`,
				}}
			/>
			<span
				className={styles['internal-span']}
				style={{
					animationDuration,
					animationDelay: `${parsedAnimationDelay}s`,
				}}
			/>
			<span
				className={styles['internal-span']}
				style={{
					animationDuration,
					animationDelay: `${parsedAnimationDelay + animationDelayExtra}s`,
				}}
			/>
			{children}
		</section>
	);
}
