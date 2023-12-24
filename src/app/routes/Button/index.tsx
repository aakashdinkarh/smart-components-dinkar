import * as React from 'react'

import { Button, toast } from '../../../exports';

import styles from './styles.module.css';

const onClick = () => { toast(`I'm a toast`); };

export function ButtonPage() {
	return (
		<section>
			<h1 className='text-xl'>Button</h1>
			<div className={styles.button_group} >
				<Button themeType='primary' onClick={onClick}>Primary</Button>
				<Button disabled themeType='primary' onClick={onClick}>Primary</Button>
				<Button outline themeType='primary' onClick={onClick}>Primary Outline</Button>
				<Button outline disabled themeType='primary' onClick={onClick}>Primary Outline</Button>
			</div>

			<div className={styles.button_group} >
				<Button themeType='secondary' onClick={onClick}>Secondary</Button>
				<Button disabled themeType='secondary' onClick={onClick}>Secondary</Button>
				<Button outline themeType='secondary' onClick={onClick}>Secondary Outline</Button>
				<Button outline disabled themeType='secondary' onClick={onClick}>Secondary Outline</Button>
			</div>

			<div className={styles.button_group} >
				<Button themeType='tertiary' onClick={onClick}>Tertiary</Button>
				<Button disabled themeType='tertiary' onClick={onClick}>Tertiary</Button>
				<Button outline themeType='tertiary' onClick={onClick}>Tertiary Outline</Button>
				<Button outline disabled themeType='tertiary' onClick={onClick}>Tertiary Outline</Button>
			</div>
			
			<div className={styles.button_group} >
				<Button themeType='success' onClick={onClick}>Tertiary</Button>
				<Button disabled themeType='success' onClick={onClick}>Tertiary</Button>
				<Button outline themeType='success' onClick={onClick}>Tertiary Outline</Button>
				<Button outline disabled themeType='success' onClick={onClick}>Tertiary Outline</Button>
			</div>

			<div className={styles.button_group} >
				<Button themeType='danger' onClick={onClick}>Tertiary</Button>
				<Button disabled themeType='danger' onClick={onClick}>Tertiary</Button>
				<Button outline themeType='danger' onClick={onClick}>Tertiary Outline</Button>
				<Button outline disabled themeType='danger' onClick={onClick}>Tertiary Outline</Button>
			</div>

			<div className={styles.button_group} >
				<Button themeType='warn' onClick={onClick}>Tertiary</Button>
				<Button disabled themeType='warn' onClick={onClick}>Tertiary</Button>
				<Button outline themeType='warn' onClick={onClick}>Tertiary Outline</Button>
				<Button outline disabled themeType='warn' onClick={onClick}>Tertiary Outline</Button>
			</div>
		</section>
	)
}
