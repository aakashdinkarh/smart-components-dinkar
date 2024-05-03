import React from 'react';

import { BorderAnimatedContainer, Button, CodeWrapper } from "../../../exports";
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';

export function OthersPage(){
	const { isCodeHighlighted } = useHighlightCode();

	return (
        <main>
            <StickyHeader heading='Animated Border Container' withThemeSelector />
            
            <BorderAnimatedContainer>
                <Button themeType='secondary'>Inset</Button>
            </BorderAnimatedContainer>

            <div className='my-1 mb-4'>
                <CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
                    {`<BorderAnimatedContainer>
    <Button themeType='secondary'>Inset</Button>
</BorderAnimatedContainer>
`}
                </CodeWrapper>
            </div>


            <BorderAnimatedContainer
                borderPositioning='outset'
                animationDelay='1s'
            >
                <Button themeType='tertiary'>Outset 1s delay</Button>
            </BorderAnimatedContainer>

            <div className='my-1 mb-4'>
                <CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
                    {`<BorderAnimatedContainer
    borderPositioning='outset'
    animationDelay='1s'
>
    <Button themeType='tertiary'>Outset 1s delay</Button>
</BorderAnimatedContainer>
`}
                </CodeWrapper>
            </div>
        </main>
	)
}
