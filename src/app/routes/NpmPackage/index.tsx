import React, { useEffect, useState } from 'react';

import { CodeWrapper, Select } from '../../../exports'
import { getCombinedClass } from "../../../utils/getCombinedClass";
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

function InstructionWrapper({ title, subText, code, nestedSteps, isCodeHighlighted = false }: tutorialStep){
	return (
		<div className={getCombinedClass(styles['instruction-wrapper'])} >
			<h3 dangerouslySetInnerHTML={{ __html: title }} />

			{subText != null ? (
				<p dangerouslySetInnerHTML={{ __html: subText }} />
			) : null}

			{nestedSteps ? (
				nestedSteps.map((step) => (
					<InstructionWrapper isCodeHighlighted={isCodeHighlighted} {...step} />
				))
			) : (
				<CodeWrapper isCodeHighlighted={isCodeHighlighted}>{code}</CodeWrapper>
			)}
		</div>
	)
}

const themeOptions = [
	{ label: "Github dark", value: "github-dark-min" },
	{ label: "Darcula", value: "base16-darcula-min" },
	{ label: "Sublime", value: "monokai-sublime-min" },
	{ label: "Atom one dark", value: "atom-one-dark" },
	{ label: "Hardcore", value: "base16-hardcore-min" },
	{ label: "Material", value: "base16-material-min" },
];

function StickyWrapper({ children }){
	return (
		<div className='sticky border-b bg-white z1 width-full-section' style={{ top: '-1rem' }} >
			{children}
		</div>
	);
}

export function NpmPackagePage(){
	const [isCodeHighlighted, setIsCodeHighlighted] = useState(false);
	const [codeStyleTheme, setCodeStyleTheme] = useState(themeOptions[0].value);

	useEffect(() => {
		highlightCode()
			.then((res) => { setIsCodeHighlighted(res); })
			.catch(() => { setIsCodeHighlighted(false); })
	}, [])

	return <main>
		<StickyWrapper>
			<div className='flex align-items-center justify-content-between' >
				<h1>NPM Package Tutorial</h1>

				
				<div className='flex align-items-center' >
				Code Theme: &nbsp;
				<Select
					options={themeOptions}
					value={codeStyleTheme}
					onChange={setCodeStyleTheme}
				/>
				</div>
			</div>
		</StickyWrapper>

		{tutorialSteps.map(
			(step: tutorialStep) => (
				<InstructionWrapper isCodeHighlighted={isCodeHighlighted} {...step} />
			)
		)}
		<link rel='stylesheet' href={`/codeHighlighterThemes/${codeStyleTheme}.css`}></link>
	</main>
}
