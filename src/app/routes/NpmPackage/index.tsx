import * as React from "react";

import { CodeWrapper } from '../../../exports'
import { getCombinedClass } from "../../../utils/getCombinedClass";

import styles from './styles.module.css';
import tutorialSteps from './tutorialSteps.json';

interface tutorialStep {
	title: string;
	subText?: string;
	code?: string;
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

		<ol>
			<li>Repo init with the help of here</li>
			<li>git init</li>
			<li>Setup React in project, add react & react-dom to your peerDependencies</li>
			<li>Create a react usable component</li>
			<li>Create one common entry point for all your modules to access</li>
			<li>Create .npmignore file, add directories & files which should not be exposed to the build</li>
			<li>Global declaration files, one for styles.module.css files</li>
			<li>Create a script, that cleans up the dist folder</li>
			<li>Update build-dev script to run clean script before running actual build script</li>
			<li>Add type declaration files to generate automatically in build</li>
			<li>Add compatibility versions</li>
			<li>npm install eslint --save-dev to install eslint, 
				then generate a new eslint config file by npx eslint --init</li>
			<li>Now the basic eslint config file is generated.</li>
			<li>Add ignorePattern property, to ignore files from eslint</li>
			<li>Apply eslint custom rules, add files to npmignore</li>
		</ol>

		{tutorialSteps.map((step: tutorialStep) => <InstructionWrapper {...step} />)}
	</main>
}
