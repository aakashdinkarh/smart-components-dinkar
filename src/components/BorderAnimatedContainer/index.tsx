import type { JSX, PropsWithChildren } from 'react';
import React, { memo, useMemo } from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './borderAnimated.module.css';

export type borderPositioningTypes = 'outset' | 'inset';

interface BorderAnimatedContainerProps extends PropsWithChildren {
	className?: string;
	animatedBorderColor?: string;
	animationDuration?: string;
	animationDelay?: string;
	borderPositioning?: borderPositioningTypes;
}

/**
 * A container component with an animated border.
 * @param {BorderAnimatedContainerProps} props - The props of the component.
 * @param {string} [props.className] - Additional class names to be applied to the component.
 * @param {string} [props.animatedBorderColor='#f68b21'] - The color of the animated border.
 * @param {string} [props.animationDuration='2s'] - The duration of the animation in seconds.
 * @param {string} [props.animationDelay='0s'] - The delay in animation in seconds.
 * @param {borderPositioningTypes} [props.borderPositioning='inset'] - Determines the positioning 
 * of the border animation within the component.
 * @returns {JSX.Element} The rendered component wrapped inside a animated border container.
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
 */
export const BorderAnimatedContainer = memo(function BorderAnimatedContainer({
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
});