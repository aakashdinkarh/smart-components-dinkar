import './app.css';

import React, { useCallback, useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button, Logo, BorderAnimatedContainer } from '../exports';
import { GitHubLogo } from '../icons';
import { getCombinedClass } from '../utils/getCombinedClass';

import { MOBILE_ONLY_LOGO_AND_TITLE_ID, SOURCE_CODE } from './constants';
import { SideBar } from './SideBar';
import styles from './styles.module.css';

function MenuIcon(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	const { className, ...rest } = props;

	return (
		<Button
			data-role='menu-icon'
			themeType='tertiary'
			className={getCombinedClass(styles['menu-icon'], 'mobile-flex', className)}
			{...rest}
		>
			<div className={styles['menu-icon-bar']} />
			<div className={styles['menu-icon-bar']} />
			<div className={styles['menu-icon-bar']} />
		</Button>
	);
}

export function App() {
	const [mobileSideNavShow, setMobileSideNavShow] = useState(false);

	const showSideNav = useCallback(() => {
		setMobileSideNavShow(true);
	}, []);

	const hideSideNav = useCallback(() => {
		setMobileSideNavShow(false);
	}, []);

	return (
		<main className={styles['app-container']}>
			<section
				className={getCombinedClass(styles['side-menu'], { [styles['show-mobile-nav']]: mobileSideNavShow })}
			>
				<div
					className={getCombinedClass(
						'flex align-items-center',
						'sticky bg-inherit z2',
						'pt-2 pb-3 width-full-section border-b',
						'bold-6'
					)}
				>
					<Link to='/'>
						<Logo width={20} height={20} className='mr-1' />
					</Link>

					<Link to='/'>DevDinkar CodeBook</Link>
				</div>

				{/* visible in mobile only */}
				<Button
					onClick={hideSideNav}
					themeType='tertiary'
					className={getCombinedClass(styles['close-icon'], 'mobile-block')}
				>
					x
				</Button>

				<SideBar />

				<div
					className={getCombinedClass(styles['github-logo-container'], 'border-t width-full-section pt-2')}
				>
					<BorderAnimatedContainer borderPositioning='outset' animatedBorderColor='#79c0ff'>
						<Link className='flex align-items-center p-1' to={SOURCE_CODE}>
							<GitHubLogo style={{ marginRight: '0.25rem' }} /> Source Code
						</Link>
					</BorderAnimatedContainer>
				</div>
			</section>

			<section className={styles.content}>
				{/* visible in mobile only -- start -- */}
				<div
					id={MOBILE_ONLY_LOGO_AND_TITLE_ID}
					className={getCombinedClass(
						'mobile-flex',
						'sticky',
						'width-full-section border-b align-items-center py-2 bg-white z1'
					)}
				>
					<MenuIcon onClick={showSideNav} style={{ marginRight: '1rem' }} />

					<Link to='/' className={getCombinedClass('flex align-items-center', 'bg-inherit', 'bold-6')}>
						<Logo width={20} height={20} className='mr-1' />

						<div>DevDinkar CodeBook</div>
					</Link>
				</div>
				{/* visible in mobile only -- end -- */}

				<Outlet />
			</section>
		</main>
	);
}
