import React from 'react';

import { CodeWrapper, Switch } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';

export function SwitchPage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<StickyHeader heading='Switch' withThemeSelector />

            <h3>First true case: </h3>
            <Switch>
                <Switch.Case condition={false}>Case 1</Switch.Case>
                <Switch.Case condition={true}>Case 2</Switch.Case>
                <Switch.Case condition={true}>Case 3</Switch.Case>
                <Switch.Default>Default</Switch.Default>
            </Switch>

            <div>
                <CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
                    {`<Switch>
    <Switch.Case condition={false}>Case 1</Switch.Case>
    <Switch.Case condition={true}>Case 2</Switch.Case>
    <Switch.Case condition={false}>Case 3</Switch.Case>
    <Switch.Default>Default</Switch.Default>
</Switch>
`}
                </CodeWrapper>
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
                <CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
                    {`<Switch>
    <Switch.Case condition={false}>Case 1</Switch.Case>
    <Switch.Case condition={false}>Case 2</Switch.Case>
    <Switch.Case condition={false}>Case 3</Switch.Case>
    <Switch.Default>Default</Switch.Default>
</Switch>
`}
                </CodeWrapper>
            </div>

        </main>
	);
}
