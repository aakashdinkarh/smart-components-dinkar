import * as React from 'react'

import { Button, toast } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';

import styles from './styles.module.css';

const onClick = () => { toast(`I'm a toast`); };

export function ButtonPage() {
	return (
		<main>
			<StickyHeader heading='Button' />

			<div className={styles['button-group']} >
				<Button themeType='primary' onClick={onClick}>Primary</Button>
				<Button disabled themeType='primary' onClick={onClick}>Primary</Button>
				<Button outline themeType='primary' onClick={onClick}>Primary Outline</Button>
				<Button outline disabled themeType='primary' onClick={onClick}>Primary Outline</Button>
			</div>

			<div className={styles['button-group']} >
				<Button themeType='secondary' onClick={onClick}>Secondary</Button>
				<Button disabled themeType='secondary' onClick={onClick}>Secondary</Button>
				<Button outline themeType='secondary' onClick={onClick}>Secondary Outline</Button>
				<Button outline disabled themeType='secondary' onClick={onClick}>Secondary Outline</Button>
			</div>

			<div className={styles['button-group']} >
				<Button themeType='tertiary' onClick={onClick}>Tertiary</Button>
				<Button disabled themeType='tertiary' onClick={onClick}>Tertiary</Button>
				<Button outline themeType='tertiary' onClick={onClick}>Tertiary Outline</Button>
				<Button outline disabled themeType='tertiary' onClick={onClick}>Tertiary Outline</Button>
			</div>
			
			<div className={styles['button-group']} >
				<Button themeType='success' onClick={onClick}>Success</Button>
				<Button disabled themeType='success' onClick={onClick}>Success</Button>
				<Button outline themeType='success' onClick={onClick}>Success Outline</Button>
				<Button outline disabled themeType='success' onClick={onClick}>Success Outline</Button>
			</div>

			<div className={styles['button-group']} >
				<Button themeType='danger' onClick={onClick}>Danger</Button>
				<Button disabled themeType='danger' onClick={onClick}>Danger</Button>
				<Button outline themeType='danger' onClick={onClick}>Danger Outline</Button>
				<Button outline disabled themeType='danger' onClick={onClick}>Danger Outline</Button>
			</div>

			<div className={styles['button-group']} >
				<Button themeType='warn' onClick={onClick}>Warn</Button>
				<Button disabled themeType='warn' onClick={onClick}>Warn</Button>
				<Button outline themeType='warn' onClick={onClick}>Warn Outline</Button>
				<Button outline disabled themeType='warn' onClick={onClick}>Warn Outline</Button>
			</div>
		</main>
	)
}
