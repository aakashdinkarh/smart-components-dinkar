import type { ReactNode } from 'react';
import React from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';

export function StickyHeader({ heading, children, className = '', style = {} } : {
	heading: string;
	children?: ReactNode;
	className?: string;
	style?: Record<string,any>
}) {
	return (
		<div
			className={getCombinedClass(
				'flex sticky border-b mb-4 bg-white z1 width-full-section',
				className
			)}
			style={style}
		>
			<h2>{heading}</h2>
			{children}
		</div>
	);
}
