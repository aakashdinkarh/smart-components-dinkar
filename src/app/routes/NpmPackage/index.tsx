import React from 'react';

import { CodeWrapper } from '../../../exports'
import { getCombinedClass } from "../../../utils/getCombinedClass";

import styles from './styles.module.css';
import tutorialSteps from './tutorialSteps.json';

interface tutorialStep {
	title: string;
	subText?: string;
	code?: string;
	key: string;
	nestedSteps?: tutorialStep[];
}

function InstructionWrapper({ title, subText, code, nestedSteps }: tutorialStep){
	return (
		<div className={getCombinedClass(styles.instruction_wrapper)} >
			<h3 dangerouslySetInnerHTML={{ __html: title }} />

			{subText != null ? (
				<p dangerouslySetInnerHTML={{ __html: subText }} />
			) : null}

			{nestedSteps ? (
				nestedSteps.map((step) => (<InstructionWrapper {...step} />))
			) : (
				<CodeWrapper>{code}</CodeWrapper>
			)}
		</div>
	)
}

export function NpmPackagePage(){
	return <main>
		<h1>NPM Package Tutorial</h1>
		{tutorialSteps.map((step: tutorialStep) => <InstructionWrapper {...step} />)}
	</main>
}
