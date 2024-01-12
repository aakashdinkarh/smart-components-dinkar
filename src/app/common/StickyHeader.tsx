import type { ReactNode, RefObject } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { MOBILE_ONLY_LOGO_AND_TITLE_ID } from '../constants';
import { checkIsMobile } from '../helpers';

function windowResizeEventListenerEffect(stickyBelowLogoContainer: RefObject<HTMLDivElement>) {
	if (stickyBelowLogoContainer.current == null) {
		return;
	}

	const isMobile = checkIsMobile();

	const logoContainer = document.querySelector(`#${MOBILE_ONLY_LOGO_AND_TITLE_ID}`);
	const { height } = logoContainer?.getBoundingClientRect() ?? {};

	if (Boolean(height) && isMobile) {
		stickyBelowLogoContainer.current.style.top = `${height}px`;
	} else {
		stickyBelowLogoContainer.current.style.top = `0px`;
	}
}

export function StickyHeader({
	heading,
	children,
	className = '',
	style = {},
}: {
	heading: string;
	children?: ReactNode;
	className?: string;
	style?: Record<string, any>;
}) {
	const stickyBelowLogoContainer = useRef<HTMLDivElement>(null);

	const windowResizeEventListener = useCallback(() => {
		windowResizeEventListenerEffect(stickyBelowLogoContainer);
	}, [stickyBelowLogoContainer]);

	useEffect(() => {
		windowResizeEventListenerEffect(stickyBelowLogoContainer);
		window.addEventListener('resize', windowResizeEventListener);

		return () => {
			window.removeEventListener('resize', windowResizeEventListener);
		};
	}, []);

	return (
		<div
			ref={stickyBelowLogoContainer}
			className={getCombinedClass(
				'flex sticky-below-logo border-b mb-4 bg-white z1 width-full-section',
				className
			)}
			style={style}
		>
			<h2 className='mobile-text-lg align-self-center'>{heading}</h2>
			{children}
		</div>
	);
}
