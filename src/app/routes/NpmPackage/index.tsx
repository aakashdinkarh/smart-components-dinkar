import React, { useEffect, useState } from 'react';

import { CodeWrapper } from '../../../exports'
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

export function NpmPackagePage(){
	const [isCodeHighlighted, setIsCodeHighlighted] = useState(false);

	useEffect(() => {
		highlightCode()
			.then((res) => { setIsCodeHighlighted(res); })
			.catch(() => { setIsCodeHighlighted(false); })
	}, [])

	return <main>
		<h1>NPM Package Tutorial</h1>
		{tutorialSteps.map(
			(step: tutorialStep) => (
				<InstructionWrapper isCodeHighlighted={isCodeHighlighted} {...step} />
			)
		)}
	</main>
}
