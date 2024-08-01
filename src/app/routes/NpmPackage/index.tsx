import React from 'react';

import { Loader } from '../../../exports';
import { getCombinedClass } from '../../../utils/getCombinedClass';
import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { useHighlightCode } from '../../hooks/useHighlightCode';

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

function InstructionWrapper({ title, subText, code, nestedSteps, isCodeHighlighted = false }: tutorialStep) {
	return (
		<div className={getCombinedClass(styles['instruction-wrapper'])}>
			<h3 dangerouslySetInnerHTML={{ __html: title }} />

			{subText != null ? <p dangerouslySetInnerHTML={{ __html: subText }} /> : null}

			{nestedSteps ? (
				nestedSteps.map((step) => <InstructionWrapper isCodeHighlighted={isCodeHighlighted} {...step} />)
			) : (
				<AppCodeWrapper isCodeHighlighted={isCodeHighlighted}>{code}</AppCodeWrapper>
			)}
		</div>
	);
}

export function NpmPackagePage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<StickyHeader heading='NPM Package Tutorial' withThemeSelector />

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
		</main>
	);
}
