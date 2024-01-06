/* eslint-disable max-len */
import type { SVGAttributes } from 'react';
import React, { forwardRef } from 'react';

import { getCombinedClass } from '../utils/getCombinedClass';

interface PropsType extends SVGAttributes<HTMLOrSVGElement> {
	pathAttributes?: Record<string,any>;
}

// todo: find a better way for svg files export

export const CopyIcon = forwardRef<SVGSVGElement, PropsType>((props, ref) => {
	const { pathAttributes, className, ...rest } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 14 14'
			role='img'
			className={getCombinedClass('__scd_icon_svg', className)}
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
});
