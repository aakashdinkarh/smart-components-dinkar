import * as React from 'react'

import type { themeType } from '../../../components/Button';
import { Button, toast } from '../../../exports';
import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';

import styles from './styles.module.css';
import usageData from './usage.json';

interface usageDataItem {
	id: number;
	title: string;
	themeType: themeType;
	outline?: boolean;
	disabled?: boolean;
}

type usageDataGroup = usageDataItem[];

const onClick = () => { toast(`I'm a toast`); };

export function ButtonPage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<StickyHeader heading='Button' withThemeSelector />

			{(usageData as usageDataGroup[]).map((dataGroup, index) => {
				return <React.Fragment key={index}>
					<div className={styles['button-group']} >
						{(dataGroup as usageDataItem[]).map((data) => {
							const { id, title, ...restParams } = data;
							return (
								<Button key={id} {...restParams} onClick={onClick}>{title}</Button>
							)})}
					</div>
				</React.Fragment>
			})}

			<AppCodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
				{`<Button themeType="primary" onClick={onClick}>Primary</Button>

Group Usage -->
				
interface usageDataItem {
	id: number;
	title: string;
	themeType: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warn';
	outline?: boolean;
	disabled?: boolean;
}

type usageDataGroup = usageDataItem[];

{(usageData as usageDataGroup[]).map((dataGroup, index) => {
	return <React.Fragment key={index}>
		<div className={styles['button-group']} >
			{(dataGroup as usageDataItem[]).map((data) => {
				const { id, title, ...restParams } = data;
				return (
					<Button key={id} {...restParams} onClick={onClick}>{title}</Button>
				)})}
		</div>
	</React.Fragment>
})}
`}
			</AppCodeWrapper>
		</main>
	)
}
