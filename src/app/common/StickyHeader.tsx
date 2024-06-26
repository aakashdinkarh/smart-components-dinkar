import type { CSSProperties, RefObject } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Select } from '../../exports';
import { getCombinedClass } from '../../utils/getCombinedClass';
import { MOBILE_ONLY_LOGO_AND_TITLE_ID, THEME_OPTIONS } from '../constants';
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
	subtitle,
	style = {},
	withThemeSelector = false
}: {
	heading: string;
	subtitle?: string;
	style?: CSSProperties;
	withThemeSelector?: boolean;
}) {
	const [codeStyleTheme, setCodeStyleTheme] = useState(THEME_OPTIONS[0].value);

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
				'flex sticky-below-logo border-b mb-4 bg-white z1 width-full-section justify-space-between',
			)}
			style={style}
		>
			<div>
				<h2 className='mobile-text-lg align-self-center'>{heading}</h2>
				{(subtitle != null) && <p className='mb-1' style={{ marginTop: '-1rem'}} >{subtitle}</p>}
			</div>

			{withThemeSelector && (
				<>
					<div
						className={getCombinedClass(
							'flex align-items-center py-2',
							'mobile-flex-col mobile-align-flex-start mobile-justify-content-center'
						)}
					>
						<div>Code Theme:</div>
						<Select options={THEME_OPTIONS} value={codeStyleTheme} onChange={setCodeStyleTheme} />
					</div>

					<link rel='stylesheet' href={`/codeHighlighterThemes/${codeStyleTheme}.css`}></link>
				</>
			)}
		</div>
	);
}
