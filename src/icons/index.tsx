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

export const GitHubLogo = memo(forwardRef<SVGSVGElement, PropsType>((props, ref) => {
	const { className, ...rest } = props;

	return (
		<svg
			height='20'
			width='20'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 16 16'
			data-view-component='true'
			className={getCombinedClass('__scd_icon_github_logo', className)}
			{...rest}
			ref={ref}
		>
			<path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'></path>
		</svg>
	);
}))
