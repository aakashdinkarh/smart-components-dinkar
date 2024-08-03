import type { CSSProperties, RefObject } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Select } from '../../exports';
import { getCombinedClass } from '../../utils/getCombinedClass';
import { MOBILE_ONLY_LOGO_AND_TITLE_ID, THEME_OPTIONS } from '../constants';
import { MIXPANEL_EVENT_PROPERTIES, MIXPANEL_EVENTS } from '../constants/mixpanel';
import { checkIsMobileViewPort } from '../utils';
import { mixpanel } from '../utils/mixpanel';

function windowResizeEventListenerEffect(stickyBelowLogoContainer: RefObject<HTMLDivElement>) {
	if (stickyBelowLogoContainer.current == null) {
		return;
	}

	const isMobileViewPort = checkIsMobileViewPort();

	const logoContainer = document.querySelector(`#${MOBILE_ONLY_LOGO_AND_TITLE_ID}`);
	const { height } = logoContainer?.getBoundingClientRect() ?? {};

	if (Boolean(height) && isMobileViewPort) {
		stickyBelowLogoContainer.current.style.top = `${height}px`;
	} else {
		stickyBelowLogoContainer.current.style.top = `0px`;
	}
}

export function StickyHeader({
	heading,
	subtitle,
	style = {},
	withThemeSelector = false,
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

		mixpanel.track(MIXPANEL_EVENTS.STICKY_HEADER_RENDER, {
			...(withThemeSelector && {
				[MIXPANEL_EVENT_PROPERTIES.THEME]: THEME_OPTIONS.find((option) => option.value === codeStyleTheme)
					?.label,
			}),
		});

		return () => {
			window.removeEventListener('resize', windowResizeEventListener);
		};
	}, []);

	const onThemeChange = (theme: string) => {
		setCodeStyleTheme(theme);
		mixpanel.track(MIXPANEL_EVENTS.THEME_CHANGED, {
			[MIXPANEL_EVENT_PROPERTIES.THEME]: THEME_OPTIONS.find((option) => option.value === theme)?.label,
		});
	};

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
						<Select options={THEME_OPTIONS} value={codeStyleTheme} onChange={onThemeChange} />
					</div>

					<link rel='stylesheet' href={`/codeHighlighterThemes/${codeStyleTheme}.css`}></link>
				</>
			)}
		</div>
	);
}
