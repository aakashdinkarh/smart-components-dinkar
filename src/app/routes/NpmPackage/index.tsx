import React, { useEffect, useState } from 'react';

import { CodeWrapper, Select, Loader } from '../../../exports';
import { getCombinedClass } from '../../../utils/getCombinedClass';
import { StickyHeader } from '../../common/StickyHeader';
import { highlightCode } from '../../helpers/highlightCode';

import styles from './styles.module.css';
import tutorialSteps from './tutorialSteps.json';

interface tutorialStep {
	title: string;
	subText?: string;
	code?: string;
	key: string;
	nestedSteps?: tutorialStep[];
	isCodeHighlighted?: boolean;
}

const THEME_OPTIONS = [
	{ label: 'Github dark', value: 'github-dark-min' },
	{ label: 'Darcula', value: 'base16-darcula-min' },
	{ label: 'Sublime', value: 'monokai-sublime-min' },
	{ label: 'Atom one dark', value: 'atom-one-dark' },
	{ label: 'Hardcore', value: 'base16-hardcore-min' },
	{ label: 'Material', value: 'base16-material-min' },
];

function InstructionWrapper({ title, subText, code, nestedSteps, isCodeHighlighted = false }: tutorialStep) {
	return (
		<div className={getCombinedClass(styles['instruction-wrapper'])}>
			<h3 dangerouslySetInnerHTML={{ __html: title }} />

			{subText != null ? <p dangerouslySetInnerHTML={{ __html: subText }} /> : null}

			{nestedSteps ? (
				nestedSteps.map((step) => <InstructionWrapper isCodeHighlighted={isCodeHighlighted} {...step} />)
			) : (
				<CodeWrapper isCodeHighlighted={isCodeHighlighted}>{code}</CodeWrapper>
			)}
		</div>
	);
}

export function NpmPackagePage() {
	const [isCodeHighlighted, setIsCodeHighlighted] = useState<boolean | null>(null);
	const [codeStyleTheme, setCodeStyleTheme] = useState(THEME_OPTIONS[0].value);

	useEffect(() => {
		highlightCode()
			.then((res) => { setIsCodeHighlighted(res); })
			.catch(() => { setIsCodeHighlighted(false); });
	}, []);

	return (
		<main>
			<StickyHeader heading='NPM Package Tutorial' className='justify-space-between'>
				<div className='flex align-items-center'>
					Code Theme: &nbsp;
					<Select options={THEME_OPTIONS} value={codeStyleTheme} onChange={setCodeStyleTheme} />
				</div>
			</StickyHeader>

			<p>
				In this tutorial we will learn to create a simple basic react library, which will provide simple basic
				reusable components.
			</p>

			{isCodeHighlighted == null ? (
				<div className='flex-center'>
					<Loader variant='spin' color='#ff5733' size='40px' />
				</div>
			) : null}

			<div style={{ display: isCodeHighlighted == null ? 'none' : 'block' }}>
				{tutorialSteps.map((step: tutorialStep) => (
					<InstructionWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} {...step} />
				))}
			</div>

			<link rel='stylesheet' href={`/codeHighlighterThemes/${codeStyleTheme}.css`}></link>
		</main>
	);
}
