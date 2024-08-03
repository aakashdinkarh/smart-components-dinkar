import React from 'react';

import { Switch } from '../../../exports';
import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';
import { HelmetComponent } from '../HelmetComponent';

export function SwitchPage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<HelmetComponent />

			<StickyHeader heading='Switch' withThemeSelector />
			<p>
				Sometimes rendering logic for the components become complex and we end up writing something which is not
				readable, also it can cause several unintended bugs.
                So to handle that situation we use Switch case as
			</p>

			<h3>First true case: </h3>
			<Switch>
				<Switch.Case condition={false}>Case 1</Switch.Case>
				<Switch.Case condition={true}>Case 2</Switch.Case>
				<Switch.Case condition={true}>Case 3</Switch.Case>
				<Switch.Default>Default</Switch.Default>
			</Switch>

			<div>
				<AppCodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
					{`<Switch>
    <Switch.Case condition={false}>Case 1</Switch.Case>
    <Switch.Case condition={true}>Case 2</Switch.Case>
    <Switch.Case condition={true}>Case 3</Switch.Case>
    <Switch.Default>Default</Switch.Default>
</Switch>
`}
				</AppCodeWrapper>
			</div>

			<hr />

			<h3>Default case:</h3>
			<Switch>
				<Switch.Case condition={false}>Case 1</Switch.Case>
				<Switch.Case condition={false}>Case 2</Switch.Case>
				<Switch.Case condition={false}>Case 3</Switch.Case>
				<Switch.Default>Default</Switch.Default>
			</Switch>

			<div>
				<AppCodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
					{`<Switch>
    <Switch.Case condition={false}>Case 1</Switch.Case>
    <Switch.Case condition={false}>Case 2</Switch.Case>
    <Switch.Case condition={false}>Case 3</Switch.Case>
    <Switch.Default>Default</Switch.Default>
</Switch>
`}
				</AppCodeWrapper>
			</div>
		</main>
	);
}
