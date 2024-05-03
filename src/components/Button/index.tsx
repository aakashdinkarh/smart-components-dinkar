import type { LegacyRef, PropsWithChildren} from 'react';
import React, { forwardRef, memo } from 'react'

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

type IFunction = (...arr: any[]) => void;

export type themeType = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warn';

interface IButton extends PropsWithChildren {
	className: string;
	type: "button" | "submit" | "reset" | undefined;
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	themeType: themeType;
	onClick: IFunction,
	outline: boolean;
	disabled: boolean;
	[key: string]: any;
}

/**
 * A container component with an animated border.
 * @param {IButton} props - The props of the component.
 * @param {IButton} [props.className] - Additional class names to be applied to the component.
 * @param {IButton} [props.type='button'] - The type of the button.
 * @param {IButton} [props.size='md'] - The size of the button.
 * @param {IButton} [props.themeType='primary'] - The theme type of the button.
 * @param {IButton} [props.onClick=()=>{}] - The function to be called when the button is clicked.
 * @param {IButton} [props.outline=false] - Whether the button should have an outline.
 * @param {IButton} [props.disabled=false] - Whether the button is disabled. Defaults to false.
 * @returns {JSX.Element} The rendered button component.
 * @example
 * // Usage example:
 *	<Button themeType="primary" onClick={() => alert('Button clicked')}>Primary Button</Button>
 */
export const Button = memo(forwardRef(function Button({
	children = null,
	type = 'button',
	size = 'md',
	themeType = 'primary',
	className = '',
	onClick = () => {},
	outline = false,
	disabled = false,
	...rest
}: Partial<IButton>, ref: LegacyRef<HTMLButtonElement>) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={getCombinedClass(styles.button,
				styles[size],
				styles[themeType],
				{ [styles.outline]: outline },
				className,
			)}
			disabled={disabled}
			ref={ref}
			{...rest}
		>
			{children}
		</button>
	)
}));
