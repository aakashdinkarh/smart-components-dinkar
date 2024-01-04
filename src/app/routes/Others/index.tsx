import React from 'react';

import { BorderAnimatedContainer, Button } from "../../../exports";

export function OthersPage(){
	return (
        <section>
            <div>
                <h2>Animated Border Container</h2>

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
            </div>
        </section>
	)
}
