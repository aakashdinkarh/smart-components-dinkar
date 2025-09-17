import React from "react";

import { BorderAnimatedContainer, Button } from "smart-components-dinkar";
import { AppCodeWrapper } from "../../common/AppCodeWrapper";
import { StickyHeader } from "../../common/StickyHeader";
import { codeHighlightClassHTML } from "../../constants";
import { useHighlightCode } from "../../hooks/useHighlightCode";
import { HelmetComponent } from "../HelmetComponent";

export function OthersPage() {
  const { isCodeHighlighted } = useHighlightCode();

  return (
    <main>
      <HelmetComponent />

      <StickyHeader heading="Animated Border Container" withThemeSelector />

      <BorderAnimatedContainer>
        <Button themeType="secondary">Inset</Button>
      </BorderAnimatedContainer>

      <div className="my-1 mb-4">
        <AppCodeWrapper
          isCodeHighlighted={Boolean(isCodeHighlighted)}
          languageClass={codeHighlightClassHTML}
        >
          {`<BorderAnimatedContainer>
    <Button themeType='secondary'>Inset</Button>
</BorderAnimatedContainer>
`}
        </AppCodeWrapper>
      </div>

      <BorderAnimatedContainer borderPositioning="outset" animationDelay="1s">
        <Button themeType="tertiary">Outset 1s delay</Button>
      </BorderAnimatedContainer>

      <div className="my-1 mb-4">
        <AppCodeWrapper
          isCodeHighlighted={Boolean(isCodeHighlighted)}
          languageClass={codeHighlightClassHTML}
        >
          {`<BorderAnimatedContainer
    borderPositioning='outset'
    animationDelay='1s'
>
    <Button themeType='tertiary'>Outset 1s delay</Button>
</BorderAnimatedContainer>
`}
        </AppCodeWrapper>
      </div>
    </main>
  );
}
