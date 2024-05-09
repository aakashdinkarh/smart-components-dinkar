/* eslint-disable max-len */
import type { SVGAttributes } from 'react';
import React, { memo, forwardRef } from 'react';

import { getCombinedClass } from '../utils/getCombinedClass';

interface PropsType extends SVGAttributes<HTMLOrSVGElement> {
	pathAttributes?: Record<string, any>;
}

export const CopyIcon = memo(forwardRef<SVGSVGElement, PropsType>((props, ref) => {
	const { pathAttributes, className, ...rest } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 14 14'
			role='img'
			className={getCombinedClass('__scd_icon_copy', className)}
			{...rest}
			ref={ref}
		>
			<path
				className='copy_outline_svg'
				fill='#5b00ff'
				{...pathAttributes}
				d='M8.895 2.455A.455.455 0 0 0 8.44 2H3.842C3.38 2 3 2.41 3 2.91v5.942a.421.421 0 1 0 .842 0V2.909H8.44a.455.455 0 0 0 .455-.454Zm1.263 1.363H5.526c-.463 0-.842.41-.842.91v6.363c0 .5.38.909.842.909h4.632c.463 0 .842-.41.842-.91V4.728c0-.5-.379-.909-.842-.909Zm0 7.273H5.526V4.727h4.632v6.364Z'
			></path>
		</svg>
	);
}));

export const Logo = memo(forwardRef<SVGSVGElement, PropsType>((props, ref) => {
	const { className, ...rest } = props;

	return (
		<svg
			viewBox='0 0 80 100'
			width='50'
			height='50'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			role='img'
			className={getCombinedClass('__scd_icon_logo', className)}
			{...rest}
			ref={ref}
			>
			<defs>
				<linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
					<stop offset='0%' stopColor='#007bff' />
					<stop offset='100%' stopColor='#f1f1f1' />
				</linearGradient>
			</defs>
			<path d='M-10 100h30c30 0 50-20 50-50s-20-50-50-50H0v100z' fill='url(#grad)' />
			<path d='M20 100h70c-30 0-50-20-50-50s20-50 50-50v100H80z' fill='url(#grad)' />
		</svg>
	);
}));