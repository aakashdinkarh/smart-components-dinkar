import React from 'react'

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

type IFunction = (...arr: any[]) => void;

export type themeType = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warn';

interface IButton {
	children: any
	className: string;
	type: "button" | "submit" | "reset" | undefined;
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	themeType: themeType;
	onClick: IFunction,
	outline: boolean;
	disabled: boolean;
	[key: string]: any;
}

function Button({ 
	children = null,
	type = 'button',
	size = 'md',
	themeType = 'primary',
	className = '',
	onClick = () => {},
	outline = false,
	disabled = false,
	...rest
}: Partial<IButton>) {
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
			{...rest}
		>
			{children}
		</button>
	)
}

export { Button };
