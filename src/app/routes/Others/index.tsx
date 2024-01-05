import React from 'react';

import { BorderAnimatedContainer, Button } from "../../../exports";
import { StickyHeader } from '../../common/StickyHeader';

export function OthersPage(){
	return (
        <main>
            <StickyHeader heading='Animated Border Container' />
            
            <BorderAnimatedContainer>
                <Button themeType='secondary'>Inset</Button>
            </BorderAnimatedContainer>

            <br />

            <BorderAnimatedContainer
                borderPositioning='outset'
                animationDelay='1s'
            >
                <Button themeType='tertiary'>Outset 1s delay</Button>
            </BorderAnimatedContainer>
        </main>
	)
}
